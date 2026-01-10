import os
from dotenv import load_dotenv
from langchain_ollama import OllamaLLM
from langchain_openai import ChatOpenAI
from config import settings


def get_llm(provider: str):
    if provider == "openai":
        return ChatOpenAI(
            model=settings.OPENAI_MODEL,
            temperature=0,
            streaming=True,
        )

    if provider == "ollama":
        return OllamaLLM(
            model=settings.OLLAMA_MODEL,
            base_url=settings.OLLAMA_BASE_URL,
            temperature=0,
        )

    raise ValueError(f"Unknown LLM provider: {provider}")
