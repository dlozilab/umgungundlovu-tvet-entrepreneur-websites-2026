import Icon, { type IconName } from "./Icon";
import styles from "./Badge.module.css"
import FlagZA from "./FlagZA";


type BadgeProps = {
  label: string;
  icon: IconName;
  flag?: boolean;
}

export default function Badge({ label, icon, flag }: BadgeProps) {
  return (
    <span className={styles.badge}>
      {flag && <FlagZA />}
      {icon && !flag && <Icon name={icon} size={14}/>}
      {label}
    </span>
  )
}

function FlagZASlot() {
  return <FlagZA size={18}/>;
}