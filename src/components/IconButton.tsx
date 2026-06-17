import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  variant?: 'gold' | 'danger' | 'neutral'
  children: ReactNode
}

const variants = {
  gold: 'border-gold-500/25 bg-black/40 text-gold-400 hover:border-gold-500/50 active:bg-gold-500/15',
  danger: 'border-red-500/25 bg-black/40 text-red-400 hover:border-red-500/50 active:bg-red-500/10',
  neutral: 'border-gold-500/15 bg-black/30 text-zinc-400 hover:border-gold-500/30 active:bg-black/50',
}

export function IconButton({
  label,
  variant = 'gold',
  children,
  className = '',
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`touch-manipulation relative z-20 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border text-base transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
