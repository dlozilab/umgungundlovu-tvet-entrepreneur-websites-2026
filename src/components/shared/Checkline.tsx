import styles from './Checkline.module.css'

interface ChecklineProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function Checkline({
  label,
  checked,
  onChange,
}: ChecklineProps) {
  return (
    <label className={styles.checkline}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) =>onChange(e.target.checked)}/>
        {label}
    </label>
  )
}

