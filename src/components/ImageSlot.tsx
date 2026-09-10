type ImageSlotProps = {
    src?: string;
    alt?: string;
    label?: string;
    onClick?: ()  => void
}
function ImageSlot({
    src, alt, label, onClick,
}: ImageSlotProps) {
    return(
        <button className="image-slots" type="button" onClick={onClick}>
            {src ? (
                <img src={src} alt={alt} />): (
                    <span>{label}</span>
                )

                }
        </button>
    )
}


export default ImageSlot;