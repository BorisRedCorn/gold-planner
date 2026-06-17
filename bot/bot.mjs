import 'dotenv/config'

const BOT_TOKEN = process.env.BOT_TOKEN
const WEBAPP_URL = process.env.WEBAPP_URL

if (!BOT_TOKEN || !WEBAPP_URL) {
  console.error('❌ Создайте файл .env с BOT_TOKEN и WEBAPP_URL')
  console.error('   Пример: см. .env.example')
  process.exit(1)
}

const API = `https://api.telegram.org/bot${BOT_TOKEN}`

async function api(method, body) {
  const res = await fetch(`${API}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!data.ok) {
    console.error(`Telegram API error (${method}):`, data.description)
  }
  return data
}

function webAppKeyboard() {
  return {
    inline_keyboard: [
      [
        {
          text: '✦ Открыть Gold Planner',
          web_app: { url: WEBAPP_URL },
        },
      ],
    ],
  }
}

async function sendWelcome(chatId, firstName) {
  await api('sendMessage', {
    chat_id: chatId,
    text: `Привет, ${firstName}! 👋\n\nGold Planner — ваш личный таск-трекер.\n\n✦ Задачи сохраняются только у вас\n✦ Другие пользователи видят свои задачи\n\nНажмите кнопку ниже:`,
    reply_markup: webAppKeyboard(),
  })
}

async function handleUpdate(update) {
  const message = update.message
  if (!message) return

  const chatId = message.chat.id
  const text = message.text?.trim() ?? ''
  const firstName = message.from?.first_name ?? 'друг'

  if (text === '/start' || text === '/app') {
    await sendWelcome(chatId, firstName)
    return
  }

  if (text === '/help') {
    await api('sendMessage', {
      chat_id: chatId,
      text: 'Команды:\n/start — открыть Gold Planner\n/app — открыть приложение\n/help — справка',
      reply_markup: webAppKeyboard(),
    })
    return
  }

  await api('sendMessage', {
    chat_id: chatId,
    text: 'Используйте /start чтобы открыть Gold Planner ✦',
    reply_markup: webAppKeyboard(),
  })
}

async function poll(offset = 0) {
  const data = await api('getUpdates', {
    offset,
    timeout: 30,
    allowed_updates: ['message'],
  })

  if (!data.ok) {
    await new Promise((r) => setTimeout(r, 3000))
    return poll(offset)
  }

  let nextOffset = offset

  for (const update of data.result) {
    nextOffset = update.update_id + 1
    await handleUpdate(update)
  }

  return poll(nextOffset)
}

async function setMenuButton() {
  await api('setChatMenuButton', {
    menu_button: {
      type: 'web_app',
      text: 'Gold Planner',
      web_app: { url: WEBAPP_URL },
    },
  })
}

console.log('🤖 Gold Planner Bot запущен')
console.log(`📱 Web App URL: ${WEBAPP_URL}`)

await setMenuButton()
await poll()
