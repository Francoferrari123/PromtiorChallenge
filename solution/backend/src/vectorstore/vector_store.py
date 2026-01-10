import os
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface.embeddings import HuggingFaceEmbeddings
from loaders.web_loader import load_web
from loaders.pdf_loader import load_pdf
from config import settings

_embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/paraphrase-MiniLM-L3-v2"
)


def get_vectorstore():
    VECTORSTORE_PATH = settings.VECTORSTORE_PATH
    if os.path.exists(VECTORSTORE_PATH) and os.listdir(VECTORSTORE_PATH):
        return FAISS.load_local(
            VECTORSTORE_PATH,
            _embeddings,
            allow_dangerous_deserialization=True,
        )

    SOURCE_URL = settings.SOURCE_URL
    PDF_PATH = settings.PDF_PATH

    docs = []
    docs += load_web(SOURCE_URL)
    docs += load_pdf(PDF_PATH)
    CHUNK_SIZE = settings.CHUNK_SIZE
    CHUNK_OVERLAP = settings.CHUNK_OVERLAP

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
    )
    chunks = splitter.split_documents(docs)
    vectorstore = FAISS.from_documents(chunks, _embeddings)
    os.makedirs(VECTORSTORE_PATH, exist_ok=True)
    vectorstore.save_local(VECTORSTORE_PATH)

    return vectorstore
