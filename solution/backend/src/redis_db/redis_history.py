import os
from langchain_community.chat_message_histories import RedisChatMessageHistory
from config import settings


def get_redis_history(session_id: str):
    return RedisChatMessageHistory(
        session_id=session_id,
        url=settings.REDIS_URL,
    )
