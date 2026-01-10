from langchain_core.runnables.history import RunnableWithMessageHistory
from agent.rag_chain import create_rag_chain
from redis_db.redis_history import get_redis_history
from langchain_core.runnables import RunnableLambda, RunnableConfig
from agent.model import get_llm


def create_dynamic_rag_chain(input_dict, config: RunnableConfig) -> dict:
    provider = config.get("configurable", {}).get("session_id").split("-")[0]
    print(f"Using provider: {provider}")

    llm = get_llm(provider)
    rag_chain = create_rag_chain(llm)
    return rag_chain.invoke(input_dict, config)


chat_chain = RunnableWithMessageHistory(
    RunnableLambda(create_dynamic_rag_chain),
    get_redis_history,
    input_messages_key="question",
    history_messages_key="chat_history",
)
