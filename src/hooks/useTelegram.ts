import { useEffect, useState } from 'react'
import WebApp from '@twa-dev/sdk'

export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
}

function readTelegramUser(): TelegramUser | null {
  try {
    const tgUser = WebApp.initDataUnsafe?.user
    if (!tgUser) return null
    return {
      id: tgUser.id,
      first_name: tgUser.first_name,
      last_name: tgUser.last_name,
      username: tgUser.username,
    }
  } catch {
    return null
  }
}

function detectTelegram(): boolean {
  try {
    return (
      WebApp.platform !== 'unknown' ||
      Boolean(WebApp.initData && WebApp.initData.length > 0)
    )
  } catch {
    return false
  }
}

function initTelegramWebApp() {
  try {
    WebApp.ready()
    WebApp.expand()

    if (typeof WebApp.disableVerticalSwipes === 'function') {
      WebApp.disableVerticalSwipes()
    }
    if (typeof WebApp.setHeaderColor === 'function') {
      WebApp.setHeaderColor('#0a0a0a')
    }
    if (typeof WebApp.setBackgroundColor === 'function') {
      WebApp.setBackgroundColor('#0a0a0a')
    }
  } catch (error) {
    console.warn('Telegram WebApp init failed:', error)
  }
}

export function useTelegram() {
  const [isTelegram] = useState(detectTelegram)
  const [user, setUser] = useState<TelegramUser | null>(() =>
    detectTelegram() ? readTelegramUser() : null,
  )

  useEffect(() => {
    if (!isTelegram) return
    initTelegramWebApp()
    setUser(readTelegramUser())
  }, [isTelegram])

  return { isTelegram, user }
}
