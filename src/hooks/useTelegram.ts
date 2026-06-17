import { useEffect, useState } from 'react'
import WebApp from '@twa-dev/sdk'

export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
}

function readTelegramUser(): TelegramUser | null {
  const tgUser = WebApp.initDataUnsafe?.user
  if (!tgUser) return null
  return {
    id: tgUser.id,
    first_name: tgUser.first_name,
    last_name: tgUser.last_name,
    username: tgUser.username,
  }
}

function detectTelegram(): boolean {
  return (
    WebApp.platform !== 'unknown' ||
    Boolean(WebApp.initData && WebApp.initData.length > 0)
  )
}

export function useTelegram() {
  const [isTelegram] = useState(detectTelegram)
  const [user, setUser] = useState<TelegramUser | null>(() =>
    detectTelegram() ? readTelegramUser() : null,
  )

  useEffect(() => {
    if (!isTelegram) return

    WebApp.ready()
    WebApp.expand()
    WebApp.disableVerticalSwipes()
    WebApp.setHeaderColor('#0a0a0a')
    WebApp.setBackgroundColor('#0a0a0a')

    setUser(readTelegramUser())
  }, [isTelegram])

  return { isTelegram, user }
}
