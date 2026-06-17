import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Gold Planner error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] p-6 text-center">
          <div>
            <p className="mb-2 font-serif text-2xl text-gold-400">Gold Planner</p>
            <p className="text-zinc-400">Не удалось загрузить приложение.</p>
            <p className="mt-4 text-sm text-zinc-600">
              Закройте и откройте снова через кнопку меню бота.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
