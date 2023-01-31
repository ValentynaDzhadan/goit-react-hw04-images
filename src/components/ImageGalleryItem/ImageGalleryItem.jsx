import css from './ImageGalleryItem.module.css';
import { forwardRef } from 'react';

export const ImageGalleryItem = forwardRef(({ el, openModal }, ref) => {
  return (
    <li
      className={css.imageGalleryItem}
      ref={ref}
      onClick={() => {
        openModal({ url: el.largeImageURL });
      }}
    >
      <img
        className={css.imageGalleryItemImage}
        src={el.webformatURL}
        alt={el.tags}
      />
    </li>
  );
});
