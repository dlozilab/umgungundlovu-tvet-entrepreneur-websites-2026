import SectionHeading from "../shared/SectionHeading";
import GalleryTile from "./GalleryTile";
import { selectGallery } from "../../store/selectors";
import styles from './GallerySection.module.css'
import { useSelector } from "react-redux";

export default function GallerySection(){
    const rows = useSelector(selectGallery)

    if (rows.length === 0) return null;
    return (
        <section className="section" id="gallery">
            <div className="wrap">
                <SectionHeading eyebrow="Gallery" title="Our Work"/>
                <div className={styles.grid}>
                    {rows.map((row)=> (
                        <GalleryTile key={row.slot} row={row}/>
                    ))}
                </div>

            </div>
        </section>
    )
}