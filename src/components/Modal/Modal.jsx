import css from './Modal.module.css';

import { createPortal } from 'react-dom';
import { useEffect } from 'react';
const modalRoot = document.querySelector('#modal_root');

export const Modal = ({ dataModal, closeModal }) => {
  const onClickModal = event => {
    event.currentTarget === event.target && closeModal();
  };

  useEffect(() => {
    const closeModalByEscape = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', closeModalByEscape);
    return () => {
      window.removeEventListener('keydown', closeModalByEscape);
    };
  }, [closeModal]);

  return createPortal(
    <div className={css.overlay} onClick={onClickModal}>
      <div className={css.modal}>
        <img src={dataModal.url} alt="" />
      </div>
    </div>,
    modalRoot
  );
};
