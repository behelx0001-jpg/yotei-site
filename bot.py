from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from aiogram.types import KeyboardButton, ReplyKeyboardMarkup
import sqlite3
import os

API_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN', '8547962943:AAGMi-FWSSEqYfsjIBtBAMqYWi0z89Vo9W0')
ADMIN_ID = int(os.getenv('ADMIN_ID', '123456789'))  # Telegram ID Антона Мурашкіна

bot = Bot(token=API_TOKEN)
dp = Dispatcher()

# --- Подключение к базе ---
conn = sqlite3.connect("db.sqlite3")
cursor = conn.cursor()
cursor.execute("""CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    role TEXT
)""")
conn.commit()

# --- Главное меню ---
def main_menu():
    kb = ReplyKeyboardMarkup(keyboard=[
        [KeyboardButton(text="Я покупець")],
        [KeyboardButton(text="Я продавець")],
        [KeyboardButton(text="Я орендодавець")],
        [KeyboardButton(text="Я орендар")]
    ], resize_keyboard=True)
    return kb

# --- Команда старт ---
@dp.message(Command("start"))
async def start(message: types.Message):
    await message.answer(
        f"Привіт! Я бот компанії Yotei.\nБудь ласка, оберіть вашу роль:",
        reply_markup=main_menu()
    )

# --- Адмін-панель ---
@dp.message(Command("admin"))
async def admin_panel(message: types.Message):
    if message.from_user.id == ADMIN_ID:
        await message.answer("Привіт, Антоне! Ви в адмін-панелі.\nМожете додавати об'єкти нерухомості через панель.")
        # Тут можно сделать интеграцию с mini_app/admin_panel


# --- Выбор роли ---
@dp.message()
async def choose_role(message: types.Message):
    # Игнорируем команды, чтобы не перехватывать /admin и другие команды
    if not message.text or message.text.startswith("/"):
        return

    role = message.text
    if role in ["Я покупець", "Я продавець", "Я орендодавець", "Я орендар"]:
        cursor.execute("INSERT OR REPLACE INTO users(user_id, role) VALUES(?, ?)", 
                       (message.from_user.id, role))
        conn.commit()
        await message.answer(f"Ваша роль '{role}' збережена!\nВи можете відкрити міні-додаток:", 
                             reply_markup=None)
        await message.answer("Відкрити міні-додаток: https://ВАШ_ХОСТИНГ/mini_app/index.html")
    else:
        await message.answer("Будь ласка, оберіть одну з кнопок.")

if __name__ == "__main__":
    import asyncio

    async def main():
        try:
            await dp.start_polling(bot)
        finally:
            try:
                await bot.session.close()
            except Exception:
                await bot.close()
            conn.close()

    asyncio.run(main())