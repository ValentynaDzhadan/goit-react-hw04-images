import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ pics, picsItemRef, openModal }) => {
  console.log(pics);
  return pics.map((el, index, arr) => {
    return (
      <li
        key={`${el.id} ${Date.now()}`}
        className={css.imageGalleryItem}
        ref={arr.length - 12 === index ? picsItemRef : null} // index el which we are looking for
        onClick={e => {
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
};
