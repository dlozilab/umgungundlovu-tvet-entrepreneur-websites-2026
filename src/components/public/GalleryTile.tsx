import styles from './GalleryTile.module.css'

interface GalleryTileProps {
    title: string;
    imageUrl: string;
    imageCount: number;
    onClick: () => void;
}

export default function GalleryTile({ title, imageUrl, imageCount, onClick }: GalleryTileProps) {
    return (
        <button className={styles.tile} type="button" onClick={onClick} aria-label={`View ${title} gallery, ${imageCount} ${imageCount === 1 ? 'image' : 'images'}`}>
            <img src={imageUrl} alt="" />
            <span className={styles.caption}>
                <span className={styles.title}>{title}</span>
                <span className={styles.count}>{imageCount} {imageCount === 1 ? 'photo' : 'photos'} · View gallery</span>
            </span>
        </button>
    )
}