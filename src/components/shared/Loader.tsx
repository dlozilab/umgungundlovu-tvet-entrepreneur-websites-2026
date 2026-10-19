import styles from './Loader.module.css'

interface LoaderProps {
  size?: number
  label?: string
  fullPage?: boolean
}

export default function Loader({ size = 40, label = 'Loading', fullPage = false }: LoaderProps) {
  const spinner = (
    <div className={styles.loader} role="status" aria-live="polite">
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        width={size}
        height={size}
        aria-hidden="true"
      >
        <circle className={styles.track} cx="12" cy="12" r="9" />
        <path className={styles.arc} d="M21 12a9 9 0 0 0-9-9" />
      </svg>
      <span className={styles.label}>{label}</span>
    </div>
  )

  return fullPage ? <div className={styles.fullPage}>{spinner}</div> : spinner
}
