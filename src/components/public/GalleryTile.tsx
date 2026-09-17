import type { GalleryRow } from "../../types/site";
import { getPublicUrl } from "../../utils/storage";
import styles from './GalleryTile.module.css'

interface GalleryTileProps {
    row: GalleryRow;
}

export default function GalleryTile({row}: GalleryTileProps) {
    return (
        <figure className={styles.tile}>
            <img src={getPublicUrl(row.imagePath)} alt={row.alt || ''} />
            {row.label && <figcaption>{row.label}</figcaption>}
        </figure>
    )
}