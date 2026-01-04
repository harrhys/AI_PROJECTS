# Agentic Interview — Full Local Open-Source Version

This is a fully working end-to-end open-source project to run AI agentic interviews locally.

## Features
- FastAPI backend
- React frontend
- Whisper ASR (small model recommended)
- Local LLaMA (GGUF) via llama-cpp-python (or mock mode)
- Sentence Transformers embeddings
- Milvus Lite vector DB
- Pluggable and modular design

## Instructions

1. Extract this ZIP anywhere.
2. Backend setup:
```
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```
3. Place your models in `backend/models/` (Whisper, LLaMA GGUF). For development/testing, you can set `LLM_MOCK=true`.
4. Start backend:
```
uvicorn app.main:app --reload --port 8000
```
5. Frontend setup:
```
cd frontend
npm install
npm run dev
```
6. Open browser at `http://localhost:5173`

## Notes
- All components are local, no paid API needed.
- Pluggable architecture allows swapping in commercial models later.
