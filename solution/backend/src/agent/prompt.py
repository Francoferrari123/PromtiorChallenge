import os
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from config import settings

AGENT_PROMPT = settings.AGENT_PROMPT
prompt = ChatPromptTemplate.from_messages(
    [
        ("system", AGENT_PROMPT),
        MessagesPlaceholder("chat_history"),
        ("human", "{question}"),
    ]
)
