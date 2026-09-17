import React from 'react';
import styles from './Field.module.css';

type FieldType = 'text' | 'email' | 'password' | 'tel' | 'textarea' | 'select';

interface Option {
  value: string;
  label: string;
}

interface FieldProps {
  label: string;
  hint?: string;
  type?: FieldType;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: Option[]; // required when type === 'select'
  id?: string;
}

export default function Field({
  label,
  hint,
  type = 'text',
  value,
  onChange,
  placeholder,
  options,
  id,
}: FieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={styles.field}>
      <label htmlFor={fieldId}>{label}</label>
      {hint && <p className={styles.hint}>{hint}</p>}

      {type === 'textarea' ? (
        <textarea
          id={fieldId}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : type === 'select' ? (
        <select id={fieldId} value={value} onChange={(e) => onChange(e.target.value)}>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={fieldId}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}