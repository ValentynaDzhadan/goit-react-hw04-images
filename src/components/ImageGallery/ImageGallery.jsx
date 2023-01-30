import css from './ImageGallery.module.css';
import { Component, createRef } from 'react';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';

import { getSearchPicsAPI } from '../../utils/picsApi';

export class ImageGallery extends Component {
  state = {
    pics: [],
    page: 1,
    query: '',
    error: null,
    isLoading: false,
    imgURL: null,
  };

  static getDerivedStateFromProps(newProps, state) {
    if (newProps.query !== state.query) {
      return { page: 1, query: newProps.query };
    }
    return null;
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.getSearchPics();
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.getSearchPics();
    }

    if (this.state.pics !== prevState.pics) {
      //scroll
      this.picsItemRef.current.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  }

  picsItemRef = createRef();

  getSearchPics = async () => {
    this.setState({ isLoading: true });
    try {
      const data = await getSearchPicsAPI(this.props.query, this.state.page);
      this.setState(prev => ({
        pics: this.state.page === 1 ? data.hits : [...prev.pics, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  updatePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  openModal = imgURL => {
    this.setState({ imgURL: imgURL });
  };

  closeModal = () => {
    this.setState({ imgURL: null });
  };

  render() {
    // if (this.state.error && <h1>Error</h1>)
    const { pics, isLoading, imgURL } = this.state;
    return (
      <>
        <ul className={css.imageGallery}>
          <ImageGalleryItem
            pics={pics}
            picsItemRef={this.picsItemRef}
            openModal={this.openModal}
          />
        </ul>
        {isLoading && <Loader />}
        {pics.length > 0 && <Button onClick={this.updatePage} />}
        {/* {imgURL && <Modal />} */}
        {imgURL && <Modal dataModal={imgURL} closeModal={this.closeModal} />}
      </>
    );
  }
}
