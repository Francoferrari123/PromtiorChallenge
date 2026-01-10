import os
from langchain_core.runnables import RunnableLambda
from agent.prompt import prompt
from vectorstore.vector_store import get_vectorstore
from config import settings


def format_docs(docs: list) -> str:
    text = "\n\n".join(doc.page_content for doc in docs)
    return text


def create_rag_chain(llm):
    NUMBER_OF_DOCUMENTS_FOR_RAG_SEARCH = settings.NUMBER_OF_DOCUMENTS_FOR_RAG_SEARCH
    retriever = get_vectorstore().as_retriever(
        search_kwargs={"k": NUMBER_OF_DOCUMENTS_FOR_RAG_SEARCH}
    )
    return (
        {
            "context": RunnableLambda(lambda x: x["question"][0].content)
            | retriever
            | RunnableLambda(format_docs),
            "question": RunnableLambda(lambda x: x["question"][0].content),
            "chat_history": RunnableLambda(lambda x: x["chat_history"]),
        }
        | prompt
        | llm
    )
