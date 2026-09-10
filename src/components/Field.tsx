type FieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  hint?: string
  type?: "text" | "email" | "tel" | "password"
  required?: boolean
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  hint,
  type = "text",
  required = false,
}: FieldProps) {
  return (
    <div className="field">
      <label htmlFor={label}>
        {label}
      </label>

      {hint && (
        <div className="hint">
          {hint}
        </div>
      )}

      <input
        id={label}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) =>
          onChange(event.target.value)
        }
      />
    </div>
  )
}

export default Field