import { useRef } from 'react';
import Button from './Button';
import styles from './ImageSlot.module.css';

interface ImageSlotProps {
  label: string;
  note?: string;
  value: string; // resolved image URL, or '' when empty
  onPick: (file: File) => void;
  onClear?: () => void;
  allowClear?: boolean;
}

export default function ImageSlot({ label, note, value, onPick, onClear, allowClear }: ImageSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`${styles.slot} ${!value ? styles.empty : ''}`}>
      {value ? (
        <img className={styles.thumb} src={value} alt={label} />
      ) : (
        <div className={styles.placeholder}>Empty</div>
      )}

      <div className={styles.body}>
        <div className={styles.label}>{label}</div>
        {note && <div className={styles.note}>{note}</div>}
        <div className={styles.actions}>
          <Button
            size="sm"
            onClick={() => inputRef.current?.click()}
          >
            Replace
          </Button>
          {allowClear && value && onClear && (
            <Button size="sm" variant="quiet" onClick={onClear}>
              Remove
            </Button>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onPick(file);
          e.target.value = '';
        }}
      />
    </div>
  );
}