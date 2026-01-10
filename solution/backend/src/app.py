from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from langserve import add_routes
from uuid import uuid4
from config import settings
from agent.chain import chat_chain
from redis_db.redis_history import get_redis_history

app = FastAPI(title="LangServe Chat API")
CORS_ORIGINS = settings.CORS_ORIGINS

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


add_routes(
    app,
    chat_chain,
    path="/chat",
)


@app.get("/history/{session_id}")
def get_history(session_id: str):
    history = get_redis_history(session_id)

    messages = history.messages  # LangChain BaseMessage[]
    return {
        "session_id": session_id,
        "messages": messages,
    }


@app.get("/")
def health():
    return {"status": "ok"}
