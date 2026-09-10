type ChecklineProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function Checkline({
  label,
  checked,
  onChange,
}: ChecklineProps) {
  return (
    <label className="checkline">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange(event.target.checked)
        }
      />

      <span>{label}</span>
    </label>
  )
}

export default Checkline