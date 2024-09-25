// OkumaReaderModal.tsx
import React from 'react';
import ReactDOM from 'react-dom';

import './OkumaReaderModal.scss'; // Ensure you have appropriate styles for the modal

interface OkumaReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OkumaReaderModal: React.FC<OkumaReaderModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
         <iframe
            src="http://localhost:8000/bookwriter/"
            style={{
             width: '100%',
             height: '80vh',
             transform: 'scale(1)',
             WebkitTransform: 'scale(1)',  // Chrome/Safari
             msTransform: 'scale(1)',      // IE
             transformOrigin: '0 0',
             zoom: 1,                      // Add this for IE
             border: 'none'
           }}
           sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
           allow="microphone; fullscreen"
           allowFullScreen
           title="KFZ BookWriter"

         />

      </div>
    </div>,
    document.getElementById('root')!
  );
};

export default OkumaReaderModal;
