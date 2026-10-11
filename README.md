BhoomiLens AI

AI-Powered Land Recommendation & Document Screening

BhoomiLens AI is an intelligent land discovery platform that leverages Machine Learning, Conversational AI, and OCR to provide personalized land recommendations and identify inconsistencies in land-related documents.

Key Features-

- Personalized Recommendations: Ranks land listings based on budget, location, land type, area, and buyer preferences.
- OCR-Based Document Screening: Extracts information from scanned documents and flags missing or inconsistent fields.
- Conversational AI Assistant: Understands natural-language queries and helps users discover and compare properties.
- Interactive Land Discovery: Enables users to search, filter, compare, and explore land listings on a map.

Tech Stack-

Component| Technologies
Frontend| React.js, Vite, Tailwind CSS
Backend| Node.js, Express.js
Database| MongoDB
ML Service| Python, FastAPI, Pandas, NumPy, Scikit-learn
Recommendation Model| Random Forest, XGBoost
OCR & Image Processing| OpenCV, Tesseract OCR
Conversational AI| Gemini API or another LLM API
Maps| Leaflet, OpenStreetMap
Explainability| SHAP, where appropriate

AI Workflow-

1. Preference Understanding: Extracts buyer requirements from forms or conversational queries.
2. Personalized Ranking: Uses buyer–land compatibility features to rank relevant properties.
3. Document Analysis: Applies image preprocessing, OCR, field extraction, and consistency checks.
4. AI-Assisted Insights: Explains recommendations using listing data and highlights information requiring further verification.

System Architecture-

React Frontend
      |
      v
Node.js + Express
      |
      v
MongoDB <--> Python + FastAPI
                    |
                    ├── Recommendation Engine
                    ├── OCR Processing
                    └── LLM Integration

Project Status-

In Development

Artificial Intelligence · Machine Learning · Real Estate Technology

Contributors-

Developed as an AI/ML project focused on intelligent land discovery, personalized recommendations, and document screening.
