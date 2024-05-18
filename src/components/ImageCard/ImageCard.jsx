import css from "./ImageCard.module.css"

function ImageCard({ galleryData }) {
    return (
        <div>
            <img className={css.photo} src={galleryData.urls.small} alt={galleryData.urls.slug} />
        </div>
    )
}

export default ImageCard;