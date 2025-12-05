import os
import json
import re
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

# Используем модель (flash-latest быстрая и поддерживает большие контексты)
model = genai.GenerativeModel("gemini-2.5-pro")

async def generate_answer(user_query: str, context_chunks: list):
    """
    Генерация ответа через Google Gemini API
    """
    
    # Формируем контекст с ID вузов
    formatted_chunks = []
    for item in context_chunks:
        # Теперь, после обновления SQL, item['university_id'] будет числом
        u_id = item.get('university_id')
        uni_tag = f"[ID ВУЗА: {u_id}]" if u_id else ""
        formatted_chunks.append(f"{item['content']} {uni_tag}")

    context_text = "\n---\n".join(formatted_chunks)
    
    # Для отладки в консоли
    print(f"DEBUG: Context IDs found: {[item.get('university_id') for item in context_chunks]}")
    
    full_prompt = f"""
    ТЫ — АССИСТЕНТ DataHub. 
    
    ТВОЯ ЗАДАЧА:
    1. Ответь на вопрос пользователя, используя контекст.
    2. Если рекомендуешь вуз, посмотри, какой [ID ВУЗА: X] написан рядом с ним в тексте контекста.
    3. Добавь эти ID в список highlight_ids.

    КОНТЕКСТ:
    {context_text}
    
    ВОПРОС:
    {user_query}
    
    ФОРМАТ ОТВЕТА (СТРОГО):
    [Твой текст ответа]
    
    ```json
    {{
      "highlight_ids": [1, 5],
      "filters": {{"city": "Алматы"}} 
    }}
    ```
    """

    try:
        response = model.generate_content(full_prompt)
        raw_content = response.text
        print(f"DEBUG: Raw LLM response prefix: {raw_content[:100]}...")
    except Exception as e:
        print(f"ERROR: Google Gemini error: {e}")
        return {"text": "Ошибка нейросети.", "action": {}}

    # --- ПУЛЕНЕПРОБИВАЕМЫЙ ПАРСИНГ ---
    text_part = raw_content
    action_part = {}

    try:
        # 1. Ищем JSON блок с помощью регулярного выражения
        # Ищем текст между первой { и последней }
        json_match = re.search(r'\{.*\}', raw_content, re.DOTALL)
        
        if json_match:
            json_str = json_match.group(0)
            # Пытаемся распарсить
            action_part = json.loads(json_str)
            
            # Текстом считаем всё, что было ДО JSON
            text_part = raw_content[:json_match.start()].strip()
            # Убираем возможные остатки маркдауна в конце текста
            text_part = text_part.replace("```json", "").replace("```", "").strip()
        else:
            print("WARN: JSON блок не найден в ответе")

    except json.JSONDecodeError as e:
        print(f"ERROR: Failed to parse extracted JSON: {e}")
    except Exception as e:
        print(f"ERROR: General parsing error: {e}")

    return {"text": text_part, "action": action_part}