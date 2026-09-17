import { useSelector } from "react-redux";
import { selectToast } from "../../store/slices/uiSlice";
import styles from './Toast.module.css'

export default function Toast() {
  const toast = useSelector(selectToast);

  if (!toast) return null;
  return (
    <div className={styles.toast} role='status' aria-live="polite">
      {toast}
    </div>
  )
}