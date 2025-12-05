from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Any

from app.core.config import supabase
from app.services.rag_service import search_context
from app.services.llm_service import generate_answer

app = FastAPI(title="DataHub Backend")

# Разрешаем запросы с фронтенда (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Схемы данных ---
class ChatRequest(BaseModel):
    message: str
    history: List[Any] = []

class ProgramStat(BaseModel):
    year: Optional[int] = None
    bachelor_places: Optional[int] = None
    master_places: Optional[int] = None
    tuition_fee: Optional[int] = None
    passing_score: Optional[int] = None

class Program(BaseModel):
    id: int
    name: str
    code: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = []
    description: Optional[str] = None
    program_stats: List[ProgramStat] = []

class UniversityDetails(BaseModel):
    id: int
    name_ru: str
    name_en: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    description: Optional[str] = None
    hero_image_url: Optional[str] = None
    logo_url: Optional[str] = None
    website: Optional[str] = None
    slug: str
    programs: List[Program] = []

# --- Эндпоинты ---

@app.get("/api/universities")
def get_catalog():
    """
    Эндпоинт для левой панели (Каталог).
    """
    # ИСПРАВЛЕНИЕ: Мы запрашиваем program_stats ВНУТРИ programs
    response = supabase.table("universities").select(
        "id, name_ru, city, hero_image_url, logo_url, slug, programs(category, tags, program_stats(tuition_fee))"
    ).execute()
    
    raw_data = response.data
    result = []
    
    for uni in raw_data:
        # 1. Ищем минимальную цену
        # Теперь нам нужно пробежаться по всем программам вуза и достать цены оттуда
        all_prices = []
        
        programs = uni.get('programs', [])
        if programs:
            for prog in programs:
                # program_stats может быть списком (т.к. стат может быть за разные годы)
                stats = prog.get('program_stats', [])
                
                # Supabase возвращает связанные данные как список
                if isinstance(stats, list):
                    for stat in stats:
                        if stat.get('tuition_fee'):
                            all_prices.append(stat['tuition_fee'])
                # Или как словарь, если связь 1-к-1 (на всякий случай обработаем)
                elif isinstance(stats, dict):
                     if stats.get('tuition_fee'):
                            all_prices.append(stats['tuition_fee'])

        min_price = min(all_prices) if all_prices else 0
        
        # 2. Собираем уникальные теги
        tags = set()
        for prog in programs:
            if prog.get('category'): 
                tags.add(prog['category'])
            if prog.get('tags'): 
                for t in prog['tags']: 
                    tags.add(t)
        
        result.append({
            "id": uni['id'],
            "name": uni['name_ru'],
            "city": uni['city'],
            "image": uni['hero_image_url'],
            "logo": uni['logo_url'],
            "slug": uni['slug'],
            "min_price": min_price,
            "tags": list(tags)[:4] # Берем первые 4 тега
        })
        
    return result

# @app.get("/api/universities/{slug}", response_model=UniversityDetails)
@app.get("/api/universities/{slug}")
def get_university_details(slug: str):
    """
    Эндпоинт для страницы одного университета.
    """
    response = supabase.table("universities").select(
        "*, programs(*, program_stats(*))"
    ).eq("slug", slug).single().execute()

    if not response.data:
        raise HTTPException(status_code=404, detail="University not found")

    return response.data

@app.post("/api/chat")
async def chat(request: ChatRequest):
    """
    Эндпоинт для правой панели (Чат).
    """
    try:
        # 1. Ищем контекст в базе знаний
        context = search_context(request.message)
        
        # 2. Генерируем ответ с помощью LLM
        answer = await generate_answer(request.message, context)
        
        return answer
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Запуск: uvicorn app.main:app --reload