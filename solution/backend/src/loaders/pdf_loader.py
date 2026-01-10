from langchain_community.document_loaders import PyPDFLoader


def load_pdf(path: str):
    return PyPDFLoader(path).load()
