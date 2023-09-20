import Image from 'next/image';
import React from 'react';

const Modal = ({ isOpen, onClose, images, alts }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black">
      <div className="modal-container">
        <div className="modal-content">
          <button onClick={onClose} className="modal-close">
            Close Modal
          </button>
          <div className="modal-body">
            <Image width={250} height={250} src={ images } alt= { alts }/>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;