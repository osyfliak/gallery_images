import { Overlay, OverlayContent } from './Modal.styled';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Modal = ({ onClose, modalImg }) => {
  useEffect(() => {
    const handleKeyEscape = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyEscape);

    return () => {
      window.removeEventListener('keydown', handleKeyEscape);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay className="overlay" onClick={handleBackdropClick}>
      <OverlayContent className="modal">
        <img src={modalImg} alt="12" />
      </OverlayContent>
    </Overlay>
  );
};

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  modalImg: PropTypes.string.isRequired,
};
export default Modal;
