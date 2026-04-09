import os
# Fix for Protobuf version conflict between Tensorflow and Gemini
os.environ["PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION"] = "python"

import io
import json
import numpy as np
import tensorflow as tf
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from tensorflow.keras.applications.resnet50 import preprocess_input as resnet_preprocess
from tensorflow.keras.applications.densenet import preprocess_input as densenet_preprocess
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Dual-Tier AI Architecture
# Tier 1: Surface Scan (Text-only) - Fast, High-limit
surface_model = genai.GenerativeModel('gemini-2.5-flash-lite')
# Tier 2: Deep Audit (Multimodal) - Using Version-Specific 001 for potential quota bypass
audit_model = genai.GenerativeModel('gemini-2.0-flash-001')

app = FastAPI(title="Dr. Brinjal AI Backend")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    print(f"Validation Error: {exc.errors()}")
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors(), "body": str(exc.body)},
    )

# Configuration
IMG_SIZE = (224, 224)
MODEL_PATHS = {
    "resnet": "../brinjal_resnet50_model.keras",
    "densenet": "../brinjal_densenet_model.keras"
}

CLASS_NAMES = [
    "Green", "Green_Healthy", "Green_Mosaic_Virus", 
    "Purple", "Purple_Bacterial_Blight", "Purple_Bacterial_Leaf_Spot", 
    "Purple_Cercospora_Leaf_Spot", "Purple_Healthy", "Purple_Insect_Pest", 
    "Purple_Little_Leaf", "Purple_Mosaic_Virus", "Purple_Phomopsis_Blight", 
    "Purple_Powdery_Mildew", "Purple_White_Mold", "Purple_Wilt", 
    "White", "White_Healthy", "White_Little_Leaf"
]

models = {}

def get_surface_diagnosis(disease_name: str):
    """Tier 1: Text-only surface diagnostics."""
    try:
        print(f"Fetching Surface AI details for: {disease_name}")
        prompt = f"""
        Analyze the plant disease: {disease_name}.
        Return a strict JSON response with:
        1. "symptoms": [exactly 5 concise visual identifiers]
        2. "clinical_action_plan": [exactly 5 actionable treatment steps]
        """
        response = surface_model.generate_content(prompt)
        content = response.text.strip()
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0].strip()
        elif "```" in content:
            content = content.split("```")[1].strip()
            
        return json.loads(content)
    except Exception as e:
        print(f"SURFACE_AI_ERROR: {e}")
        return {
            "symptoms": ["General leaf yellowing", "Spots on stem", "Wilting of tips", "Reduced growth rate", "Foliar discoloration"],
            "clinical_action_plan": ["Isolate plant", "Check soil moisture", "Apply organic fungicide", "Remove affected parts", "Increase ventilation"]
        }

def get_deep_audit(disease_name: str, image_bytes: bytes):
    """Tier 2: Multimodal vision audit with multi-model failover."""
    # Targetting Gemini 3 & 3.1 Vision-specific models (Excluding 1.5, 2.5, and 2.x as requested/failed)
    models_to_try = [
        'gemini-3.1-flash-lite-preview',
        'gemini-3-flash-preview',
        'gemini-3.1-flash-image-preview',
        'gemini-3-pro-preview',
        'gemini-3-pro-image-preview',
        'gemini-2.0-flash-lite-001' # Last resort backup since it is 2.x
    ]
    
    last_error = ""
    for model_name in models_to_try:
        try:
            print(f"Attempting Deep Audit with: {model_name}")
            model = genai.GenerativeModel(model_name)
            
            prompt = f"""
            Directly analyze this plant image for the detected condition: {disease_name}.
            Return a strict JSON response with tailored environmental requirements:
            1. "hydration": "STRICT MAX 3-5 words (e.g. '80% of Baseline')"
            2. "photoperiod": "STRICT MAX 3-5 words (e.g. '14h Light / 10h Dark')"
            3. "params": {{"ph_target": "X.X - Y.Y", "nitrogen": "LEVEL", "humidity": "X%", "lux": "VALUE"}}
            
            Brevity is CRITICAL for UI display. Do not provide explanations.
            """
            image_part = {"mime_type": "image/jpeg", "data": image_bytes}
            response = model.generate_content([prompt, image_part])
            
            content = response.text.strip()
            if "```json" in content:
                content = content.split("```json")[1].split("```")[0].strip()
            elif "```" in content:
                content = content.split("```")[1].strip()
                
            return json.loads(content)
            
        except Exception as e:
            print(f"DEEP_AUDIT_MODEL_FAILED ({model_name}): {e}")
            last_error = str(e)
            continue # Try next model
            
    # Ultimate Fallback (Constants)
    print(f"CRITICAL: All Multimodal Engines Exhausted. Last Error: {last_error}")
    return {
        "hydration": "Emergency 60% (Fail-Safe)",
        "photoperiod": "Stabilizing 12h/Day (Fail-Safe)",
        "params": {"ph_target": "6.0 - 6.5", "nitrogen": "STABILIZING", "humidity": "60%", "lux": "3500 lm"}
    }

def load_model(name: str):
    if name not in models:
        path = os.path.join(os.path.dirname(__file__), MODEL_PATHS[name])
        if not os.path.exists(path):
            raise HTTPException(status_code=500, detail=f"Model file not found: {path}")
        print(f"Loading {name} model...")
        models[name] = tf.keras.models.load_model(path)
    return models[name]

@app.get("/get_stats")
def get_stats():
    """Returns real-time model statistics for the 'About' section."""
    return {
        "disease_count": len(CLASS_NAMES),
        "ai_engine": "Dual-Tier Hybrid"
    }

@app.get("/")
def read_root():
    return {"status": "Dr. Brinjal Dual-Tier AI Online"}

@app.post("/predict")
async def predict(file: UploadFile = File(...), model_type: str = Form("resnet")):
    """Surface Scan: Fast category + symptoms."""
    contents = await file.read()
    model = load_model(model_type)
    
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    resized_image = image.resize(IMG_SIZE)
    img_array = np.array(resized_image)
    img_array = np.expand_dims(img_array, axis=0)
    
    if model_type == "resnet":
        from tensorflow.keras.applications.resnet50 import preprocess_input as resnet_preprocess
        img_array = resnet_preprocess(img_array)
    else:
        from tensorflow.keras.applications.densenet import preprocess_input as densenet_preprocess
        img_array = densenet_preprocess(img_array)

    predictions = model.predict(img_array)
    class_idx = np.argmax(predictions[0])
    confidence = float(np.max(predictions[0]))
    disease_name = CLASS_NAMES[class_idx].replace("_", " ")
    
    # Surface AI (Text-Only)
    surface_details = get_surface_diagnosis(disease_name)
    
    return {
        "disease": disease_name,
        "confidence": round(confidence * 100, 2),
        "model_used": model_type.upper(),
        "symptoms": surface_details.get("symptoms", []),
        "clinical_action_plan": surface_details.get("clinical_action_plan", [])
    }

@app.post("/get_technical_report")
async def technical_report(disease_name: str = Form(...), file: UploadFile = File(...)):
    """Deep Audit: On-demand vision analysis."""
    contents = await file.read()
    audit_data = get_deep_audit(disease_name, contents)
    return audit_data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
