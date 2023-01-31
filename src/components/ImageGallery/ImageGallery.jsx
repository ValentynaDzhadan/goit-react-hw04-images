import css from './ImageGallery.module.css';

import { useState } from 'react';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';

export const ImageGallery = ({
  updatePage,
  pics,
  isLoading,
  total,
  bottomRef,
}) => {
  const [imgURL, setImgURL] = useState(null);
  const openModal = imgURL => {
    setImgURL(imgURL);
  };

  const closeModal = () => {
    setImgURL(null);
  };

  return (
    <>
      <ul className={css.imageGallery}>
        {pics.map((el, index, arr) => (
          <ImageGalleryItem
            key={`${el.id} ${Date.now()}`}
            el={el}
            openModal={openModal}
            ref={arr.length - 12 === index ? bottomRef : null}
          />
        ))}
      </ul>
      {isLoading && <Loader />}

      {pics.length > 0 && pics.length < total && !isLoading && (
        <>
          <Button onClick={updatePage} />
        </>
      )}
      {imgURL && <Modal dataModal={imgURL} closeModal={closeModal} />}
    </>
  );
};
