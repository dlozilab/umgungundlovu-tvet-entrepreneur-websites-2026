import Button from "./Button";
import styles from './SaveBar.module.css'

interface SaveBarProps {
  onSave: ()=>void;
  saving: boolean;
  dirty?: boolean
}

export default function SaveBar({ onSave, saving, dirty = true}: SaveBarProps){
  return (
    <div className={styles.bar}>
      <Button variant="solid" onClick={onSave} disabled={saving || !dirty}>
        {saving ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  )
}