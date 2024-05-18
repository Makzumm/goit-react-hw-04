import ImageCard from "../ImageCard/ImageCard";
import { useState } from 'react'
import ImageModal from '../ImageModal/ImageModal.jsx';
import css from "./ImageGallery.module.css";

function ImageGallery({ galleryData }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };
    return (
        <ul className={css.galleryList}>
            {galleryData.map((item) => {
                return <li className={css.galleryListItem} key={item.id} onClick={() => openModal(item.urls.regular)}>
                    <ImageCard galleryData={item} />
                </li>
            })
            }
            <ImageModal imageUrl={selectedImage} isOpen={!!selectedImage} closeModal={closeModal} imageDescription={galleryData.alt_description} />
        </ul>
    )
}

export default ImageGallery