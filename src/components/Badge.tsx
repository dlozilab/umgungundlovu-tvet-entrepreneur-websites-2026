type BadgeProps = {
  children: React.ReactNode
}

function Badge({ children }: BadgeProps) {
  return (
    <span className="badge">
      {children}
    </span>
  )
}

export default Badge