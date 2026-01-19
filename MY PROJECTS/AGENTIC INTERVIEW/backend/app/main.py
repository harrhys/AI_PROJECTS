from fastapi import FastAPI, UploadFile, File
from app.adapters.asr_whisper import ASRWhisper
from app.adapters.llm_local import LocalLLM
from app.adapters.embed_sentence_transformers import Embedder
from app.adapters.vector_milvus import VectorDB
from app.engine.agent import InterviewAgent
from app.engine.scoring import score_answer
import os

app = FastAPI()

ASR = ASRWhisper()
LLM = LocalLLM(model_path=os.getenv('LLM_PATH','models/llama.gguf'))
EMB = Embedder()
VDB = VectorDB()
AGENT = InterviewAgent(LLM)

@app.post('/interview/start')
def start():
    q = AGENT.get_opening_question()
    return {"question": q}

@app.post('/interview/audio')
async def upload_audio(audio_file: UploadFile = File(...)):
    audio_bytes = await audio_file.read()
    transcript = ASR.transcribe(audio_bytes)
    vec = EMB.embed_one(transcript)
    VDB.upsert('candidate-1', vec)
    next_q = AGENT.next_question(transcript)
    score = score_answer(transcript)
    return {"transcript": transcript, "score": score, "next_question": next_q}
