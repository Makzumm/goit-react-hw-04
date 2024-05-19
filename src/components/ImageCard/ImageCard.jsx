import css from "./ImageCard.module.css"

function ImageCard({ galleryData, handleImageClick }) {
    const handleClick = () => {
        handleImageClick(galleryData.urls.regular);
    };

    return (
        <div>
            <img className={css.photo} src={galleryData.urls.small} alt={galleryData.urls.slug} onClick={handleClick} />
        </div>
    )
}

export default ImageCard;