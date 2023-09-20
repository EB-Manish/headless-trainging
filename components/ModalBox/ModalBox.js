import React,{ useState } from 'react';
import Modal from 'components/Modal/Modal';

export const ModalBox = ({data}) =>{
    const title = data.modal_text;
    const image = data.image.url;
    const altName = data.image.title;
    console.log(altName);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
    return(<div className="modaltext flex justify-center">
    <button onClick={openModal} className="btn text-black">
        {title}
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} images={ image } alts={ altName } />
    </div>)
}
