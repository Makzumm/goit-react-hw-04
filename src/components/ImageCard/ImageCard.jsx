import css from "./ImageCard.module.css"

function ImageCard({ galleryData, onClick }) {
    const handleClick = () => {
        onClick(galleryData.urls.regular);
    };

    return (
        <div>
            <img className={css.photo} src={galleryData.urls.small} alt={galleryData.urls.slug} onClick={handleClick} />
        </div>
    )
}

export default ImageCard;