import React from "react";
import { useSelector } from "react-redux";
import Icon, { type IconName } from "./Icon";
import { selectButtonInk } from "../../store/selectors";
import styles from './Button.module.css'


type Variant = 'solid' | 'outline' | 'quiet';
type Size = 'md' | 'sm'


interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  onClick?: () => void;
  disabled?: boolean;
  block?:boolean;
  type?: 'button' | 'submit'
}

export default function Button({
  children,
  variant = 'outline',
  size= 'md',
  icon,
  onClick,
  disabled,
  block,
  type = 'button',

}: ButtonProps){
  const ink = useSelector(selectButtonInk);
  const classNames = [
    styles.btn,
    variant === 'solid' && styles.solid,
    variant === 'quiet' && styles.quiet,
    size === 'sm' && styles.sm,
    block && styles.block
  ]

  .filter(Boolean)
  .join(' ');

  return(
    <button type={type} className={classNames} onClick={onClick} disabled={disabled} style={variant === 'solid' ? ({ '--btn-ink' : ink} as React.CSSProperties): undefined}>
      {icon && <Icon name={icon} size={size === 'sm' ? 16 : 18} />}
      {children}
    </button>
  )


}