import styles from './SharePreviewCard.module.css';

interface SharePreviewCardProps {
  image: string;
  title: string;
  description: string;
}

export default function SharePreviewCard({ image, title, description }: SharePreviewCardProps) {
  return (
    <div className={styles.card}>
      {image ? <img src={image} alt="" /> : <div className={styles.placeholder} />}
      <div className={styles.body}>
        <div className={styles.title}>{title}</div>
        <div className={styles.desc}>{description}</div>
        <div className={styles.host}>businessname.co.za</div>
      </div>
    </div>
  );
}