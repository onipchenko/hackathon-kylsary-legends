# app/services/llm_service.py
import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Настройка Google Gemini
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

# Используем быструю и бесплатную модель
# Можно поменять на "gemini-2.0-flash-exp", если хотите самую новую
model = genai.GenerativeModel("gemini-2.5-pro")

async def generate_answer(user_query: str, context_chunks: list):
    """
    Генерация ответа через Google Gemini API (Напрямую)
    """
    
    # Собираем текстовый контекст
    context_text = "\n---\n".join([item['content'] for item in context_chunks])
    
    # Системный промпт интегрируем в сообщение, т.к. у Gemini 1.5 немного другая структура ролей,
    # но самый надежный способ - просто склеить всё в один текст.
    
    full_prompt = f"""
    ТЫ — ИНТЕЛЛЕКТУАЛЬНЫЙ АССИСТЕНТ DataHub ПО ВУЗАМ КАЗАХСТАНА.
    
    ТВОЯ ЗАДАЧА:
    1. Ответить на вопрос пользователя, используя ИСКЛЮЧИТЕЛЬНО предоставленный ниже контекст.
    2. Если пользователь спрашивает про подбор вуза, предложи варианты из контекста.
    3. В конце ответа ОБЯЗАТЕЛЬНО добавь JSON-блок с ID вузов.

    КОНТЕКСТ ИЗ БАЗЫ ЗНАНИЙ:
    {context_text}
    
    ВОПРОС ПОЛЬЗОВАТЕЛЯ:
    {user_query}
    
    ФОРМАТ ОТВЕТА (Строго соблюдай этот формат):
    [Твой вежливый и полезный ответ текстом здесь...]
    
    !!!JSON_START!!!
    {{
      "highlight_ids": [1, 5],
      "filters": {{"city": "Алматы"}} 
    }}
    !!!JSON_END!!!
    """

    try:
        # Вызов модели (асинхронный вызов через run_in_executor или использование sync метода, 
        # так как библиотека google-generativeai пока имеет ограниченную async поддержку, 
        # но работает очень быстро)
        response = model.generate_content(full_prompt)
        raw_content = response.text
        
    except Exception as e:
        print(f"ERROR: Ошибка Google Gemini: {e}")
        return {"text": "Произошла ошибка при обращении к нейросети. Попробуйте позже.", "action": {}}

    # Парсинг ответа (Текст + JSON)
    text_part = raw_content
    action_part = {}
    
    if "!!!JSON_START!!!" in raw_content:
        try:
            parts = raw_content.split("!!!JSON_START!!!")
            text_part = parts[0].strip()
            
            # Чистим хвост
            json_str = parts[1].split("!!!JSON_END!!!")[0].strip()
            # Иногда модель добавляет markdown ```json ... ```, уберем это
            json_str = json_str.replace("```json", "").replace("```", "")
            
            action_part = json.loads(json_str)
        except Exception as e:
            print(f"ERROR parsing JSON from LLM: {e}")
            pass
            
    return {"text": text_part, "action": action_part}