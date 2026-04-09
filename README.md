# 🍆 Dr. Brinjal (BegunBondhu)
### AI-Powered Agri-Diagnostic & Plant Health Ecosystem

> **Official Project of Dr. Brinjal Tech Labs**

Dr. Brinjal is a state-of-the-art agricultural diagnostic platform designed specifically for Brinjal (eggplant) crops. By combining deep learning computer vision with high-throughput natural language processing, the system provides farmers and researchers with instant, high-fidelity insights into crop health.

---

## 🚀 Key Features

*   **Dual-Tier Hybrid AI**: Uses a fast "Surface Scan" (Text) and an on-demand "Deep Audit" (Multimodal Vision) for comprehensive diagnostics.
*   **50+ Disease Predictions**: Trained on thousands of high-resolution agricultural datasets.
*   **Interactive History**: Track your diagnostic journey with cloud-synced results and confidence scores.
*   **High-End UI/UX**: Built with a "Sea-Glass" glassmorphism aesthetic for a premium user experience.
*   **Clinical Action Plans**: Provides actionable, AI-generated treatment steps for every detected condition.

---

## 🛠️ Technology Stack

*   **Frontend**: React.js, Vite, TailwindCSS, Framer Motion
*   **Backend**: FastAPI (Python), Uvicorn
*   **AI Models**: TensorFlow/Keras (DenseNet, ResNet, MobileNet), Google Gemini 2.5
*   **Database/Storage**: LocalStorage API, Brinjal History Engine

---

## 🧬 Diagnostic Architecture

The system uses a unique **Dual-Tier** approach:

1.  **Tier 1 (Surface Scan)**: Initial category detection and symptom mapping.
2.  **Tier 2 (Deep Audit)**: Multi-model vision failover system that analyzes images for precise environmental requirements (pH, Photoperiod, Humidity).

---

## 🧠 AI Model Setup (Manual)

Due to file size limitations, the trained `.h5` model files must be added manually:

1.  Download the required models from the provided Cloud Storage link.
2.  Place the following files in the root project directory:
    *   `DenseNet_PRO_Brinjal_Engine_Best.h5`
    *   `MobileNetV2_Brinjal_Engine_FINETUNED_Best.h5`
    *   `ResNet50_Brinjal_Engine_FINETUNED_Best.h5`

---

## 👥 The Development Team

This project was brought to life by the dedicated developers at **Dr. Brinjal Tech Labs**:

*   **Asmita Mishra** - Lead Developer
*   **Anisha Dan** - Lead Developer
*   **Soyuz Paul** - Lead Developer
*   **Srijit Paul** - Lead Developer

---

## 📖 Installation

### Backend
1. `cd backend`
2. `pip install -r requirements.txt`
3. `python main.py`

### Frontend
1. `cd Dr. Brinjal_Vite`
2. `npm install`
3. `npm run dev`

---
*© 2026 Dr. Brinjal Tech Labs. All Rights Reserved.*
