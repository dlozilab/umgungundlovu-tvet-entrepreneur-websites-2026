import { useRef, useState } from 'react';
import Button from './Button';
import Loader from './Loader';
import styles from './ImageSlot.module.css';

interface ImageSlotProps {
  label: string;
  note?: string;
  value: string; // resolved image URL, or '' when empty
  onPick: (file: File) => void;
  onClear?: () => void;
  allowClear?: boolean;
  busy?: boolean;
  busyLabel?: string;
  children?: React.ReactNode; 
}

export default function ImageSlot({
  label,
  note,
  busy = false,
  value,
  onPick,
  onClear,
  allowClear,
  busyLabel = 'Uploading image',
  children,
}: ImageSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loadedSrc, setLoadedSrc] = useState('');
  const [unavailableSrc, setUnavailableSrc] = useState('');
  const showImage = value !== '' && unavailableSrc !== value;
  const waiting = busy || (showImage && loadedSrc !== value);

  return (
    <div className={`${styles.slot} ${!value ? styles.empty : ''}`}>
      <div className={styles.thumbWrap}>
        {showImage ? (
          <img
            className={styles.thumb}
            src={value}
            alt={label}
            onLoad={() => setLoadedSrc(value)}
            onError={() => {
              setUnavailableSrc(value);
              setLoadedSrc(value);
            }}
          />
        ) : (
          <div className={styles.placeholder}>{value ? 'Preview unavailable' : 'Empty'}</div>
        )}

        {waiting && (
          <div className={styles.overlay}>
            <Loader size={24} label={busy ? busyLabel : 'Loading image'} />
          </div>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.label}>{label}</div>
        {note && <div className={styles.note}>{note}</div>}
        <div className={styles.actions}>
          <Button
            size="sm"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
          >
            Replace
          </Button>
          {allowClear && value && onClear && (
            <Button size="sm" variant="quiet" disabled={busy} onClick={onClear}>
              Remove
            </Button>
          )}
          {children}
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