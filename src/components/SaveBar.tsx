type SaveBarProps = {
  onSave: () => void
  saving?: boolean
}

function SaveBar({
  onSave,
  saving = false,
}: SaveBarProps) {
  return (
    <div className="save-bar">
      <span>
        {saving
          ? "Saving changes..."
          : "You have unsaved changes"}
      </span>

      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="btn btn-primary"
      >
        {saving ? "Saving..." : "Save changes"}
      </button>
    </div>
  )
}

export default SaveBar