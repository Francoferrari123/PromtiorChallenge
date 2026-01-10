import os
from pathlib import Path
from dotenv import load_dotenv

# --------------------------------------------------
# Load .env EARLY and EXPLICITLY
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent
ENV_PATH = BASE_DIR / ".env"

load_dotenv(dotenv_path=ENV_PATH)


# --------------------------------------------------
# Helper functions
# --------------------------------------------------


def require(name: str) -> str:
    value = os.getenv(name)
    if value is None or value == "":
        raise RuntimeError(f"Environment variable '{name}' is required but not set")
    return value


def to_int(name: str) -> int:
    try:
        return int(os.getenv(name))
    except ValueError:
        raise RuntimeError(f"Environment variable '{name}' must be an integer")


def to_list(name: str) -> list[str]:
    raw = os.getenv(name)
    return [item.strip() for item in raw.split(",") if item.strip()]


class Settings:
    # ---------- Connection ----------
    OLLAMA_BASE_URL: str = require("OLLAMA_BASE_URL")
    OLLAMA_MODEL: str = require("OLLAMA_MODEL")
    REDIS_URL: str = require("REDIS_URL")
    OPENAI_MODEL: str = require("OPENAI_MODEL")

    # ---------- Embeddings / RAG ----------
    CHUNK_SIZE: int = to_int("CHUNK_SIZE")
    CHUNK_OVERLAP: int = to_int("CHUNK_OVERLAP")
    NUMBER_OF_DOCUMENTS_FOR_RAG_SEARCH: int = to_int(
        "NUMBER_OF_DOCUMENTS_FOR_RAG_SEARCH"
    )

    # ---------- Vectorstore ----------
    VECTORSTORE_PATH: Path = require("VECTORSTORE_PATH")

    # ---------- Resources ----------
    SOURCE_URL: str = require("SOURCE_URL")
    PDF_PATH: Path = Path(require("PDF_PATH"))

    # ---------- API ----------
    CORS_ORIGINS: list[str] = to_list("CORS_ORIGINS")
    AGENT_PROMPT: str = require("AGENT_PROMPT")


settings = Settings()
