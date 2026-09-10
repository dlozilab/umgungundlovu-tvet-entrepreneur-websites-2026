type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  variant?: "default" | "solid" | "quiet"
  size?: "normal" | "sm"
  block?: boolean
  disabled?: boolean
}

function Button({
  children,
  onClick,
  type = "button",
  variant = "default",
  size = "normal",
  block = false,
  disabled = false,
}: ButtonProps) {
  const classes = [
    "btn",
    variant === "solid" ? "btn-solid" : "",
    variant === "quiet" ? "btn-quiet" : "",
    size === "sm" ? "btn-sm" : "",
    block ? "btn-block" : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button