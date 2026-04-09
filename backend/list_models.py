import os
import google.generativeai as genai
from dotenv import load_dotenv

# 1. Load your API key from the local .env file
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("❌ ERROR: GEMINI_API_KEY not found in backend/.env")
    exit(1)

genai.configure(api_key=api_key)

print(f"🔍 Scanning Gemini Models for API Key: {api_key[:5]}...{api_key[-5:]}")
print("=" * 60)

try:
    models = list(genai.list_models())
    if not models:
        print("No models found. Check your API key permissions.")
    
    for m in models:
        # Check if it supports Multimodal (Vision)
        # Usually 1.5, 2.0, and 2.5 models support generateContent with images
        is_multimodal = any(v in m.name for v in ["1.5", "2.0", "vision", "pro", "flash"])
        
        type_label = "📸 MULTIMODAL" if is_multimodal else "📝 TEXT-ONLY"
        
        if 'generateContent' in m.supported_generation_methods:
            print(f"{type_label.ljust(15)} | {m.name}")

except Exception as e:
    print(f"❌ Error fetching models: {e}")

print("=" * 60)
print("TIP: Use 'gemini-1.5-flash' for the best Free Tier stability (15 RPM).")
