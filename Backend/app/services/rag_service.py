from sentence_transformers import SentenceTransformer
from app.core.config import supabase

# Загружаем легкую и быструю модель (работает локально на CPU)
model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')

def get_embedding(text: str) -> list[float]:
    """Генерация вектора из текста"""
    return model.encode(text).tolist()

def search_context(query: str, threshold=0.3, limit=5):
    """Поиск контекста в базе данных"""
    query_vector = get_embedding(query)
    
    # Вызов RPC функции в Supabase
    response = supabase.rpc(
        'match_rag_context',
        {
            'query_embedding': query_vector,
            'match_threshold': threshold,
            'match_count': limit
        }
    ).execute()
    
    return response.data