type SectionHeadingProps = {
  eyebrow?: string
  title: string
}

function SectionHeading({
  eyebrow,
  title,
}: SectionHeadingProps) {
  return (
    <>
      {eyebrow && (
        <div className="eyebrow">
          {eyebrow}
        </div>
      )}

      <h2>{title}</h2>
    </>
  )
}

export default SectionHeading