import { motion } from 'framer-motion'

interface GoldCheckboxProps {
  checked: boolean
  onChange: () => void
  id: string
}

export function GoldCheckbox({ checked, onChange, id }: GoldCheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      id={id}
      onClick={onChange}
      className="group relative flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-gold-500/40 bg-black/40 transition-colors duration-300 hover:border-gold-400/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/60"
    >
      <motion.div
        className="absolute inset-0 rounded-sm bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700"
        initial={false}
        animate={{
          scale: checked ? 1 : 0,
          opacity: checked ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
      />
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        className="relative z-10 h-3.5 w-3.5"
        initial={false}
        animate={{
          opacity: checked ? 1 : 0,
          scale: checked ? 1 : 0.5,
        }}
        transition={{ duration: 0.25, delay: checked ? 0.1 : 0 }}
      >
        <motion.path
          d="M5 13l4 4L19 7"
          stroke="#0a0a0a"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{ pathLength: checked ? 1 : 0 }}
          transition={{ duration: 0.3, delay: checked ? 0.15 : 0 }}
        />
      </motion.svg>
      {!checked && (
        <div className="absolute inset-0 rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_12px_rgba(212,175,55,0.4)]" />
      )}
    </button>
  )
}
