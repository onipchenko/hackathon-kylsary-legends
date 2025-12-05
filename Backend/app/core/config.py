import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY") # Используйте SERVICE_ROLE key
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Не найдены ключи Supabase в .env")

# Инициализация клиента
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)