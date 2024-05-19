import Modal from 'react-modal';
import css from './ImageModal.module.css';

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(1, 1, 1, 0.7)',
        border: 'none',
        overflowY: 'hidden',
    },

    content: {
        maxWidth: '90%',
        maxHeight: '90%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        overflowY: 'hidden',
        backgroundColor: 'transparent',
    },
};

function ImageModal({ isOpen, closeModal, imageUrl, imageDescription, openModal }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel=''
            shouldCloseOnOverlayClick={true}
        >
            <div className={css.modalContainer}>
                <img src={imageUrl} alt="Modal Image" onClick={() => openModal(item.urls.regular)} />
                <p>{imageDescription}</p>
            </div>
        </Modal>
    );
}

export default ImageModal;