import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

function ImageGallery({ galleryData, openModal }) {
    const handleImageClick = (imageUrl) => {
        openModal(imageUrl);
    };

    return (
        <ul className={css.galleryList}>
            {galleryData.map((item) => {
                return (
                    <li className={css.galleryListItem} key={item.id}>
                        <ImageCard galleryData={item} onClick={handleImageClick} />
                    </li>
                );
            })}
        </ul>
    );
}

export default ImageGallery;