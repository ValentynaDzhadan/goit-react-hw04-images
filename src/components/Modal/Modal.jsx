import css from './Modal.module.css';

import { createPortal } from 'react-dom';
import { Component } from 'react';
const modalRoot = document.querySelector('#modal_root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModalByEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalByEscape);
  }

  closeModalByEscape = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { dataModal, closeModal } = this.props;
    return createPortal(
      <div
        className={css.overlay}
        onClick={event => {
          event.currentTarget === event.target && closeModal();
        }}
      >
        <div className={css.modal}>
          <img src={dataModal.url} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

// return createPortal(
//   <div className="overlay" onClick={this.handleBackdropClick}>
//     <div className="modal">
//       <img src={url} alt="" />
//     </div>
//   </div>,
//   modalRoot
// );
