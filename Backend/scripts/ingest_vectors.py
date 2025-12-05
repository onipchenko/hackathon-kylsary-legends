# backend/scripts/ingest_vectors.py
import os
import sys

# Добавляем путь к корню проекта, чтобы импорты работали
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..'))

from app.core.config import supabase
from sentence_transformers import SentenceTransformer

def main():
    print("⏳ Загрузка модели SentenceTransformer...")
    model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')
    
    # 1. Получаем записи без векторов
    print("🔍 Поиск записей без векторов...")
    response = supabase.table('rag_knowledge_base').select('id, content_chunk').is_('embedding', 'null').execute()
    records = response.data
    
    if not records:
        print("✅ Все записи уже имеют векторы! (Или база пуста)")
        return

    print(f"🚀 Найдено {len(records)} записей. Начинаем генерацию...")

    for i, record in enumerate(records):
        content = record['content_chunk']
        doc_id = record['id']
        
        # Генерация вектора
        vector = model.encode(content).tolist()
        
        # Обновление записи
        supabase.table('rag_knowledge_base').update({'embedding': vector}).eq('id', doc_id).execute()
        
        print(f"[{i+1}/{len(records)}] Обновлен ID {doc_id}")

    print("🎉 Готово! Теперь поиск должен работать.")

if __name__ == "__main__":
    main()