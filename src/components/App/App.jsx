import { useState, useEffect, useRef } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';

import css from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getSearchPicsAPI } from '../../utils/picsApi';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pics, setPic] = useState([]);
  //const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getSearchPics = async () => {
      setIsLoading(true);
      try {
        const data = await getSearchPicsAPI(query, page);
        console.log(data);
        if (!data.hits.length) {
          throw new Error('There are no images with this search query');
        }
        setPic(prev => (page === 1 ? data.hits : [...prev, ...data.hits]));
        setTotal(data.totalHits);
      } catch (error) {
        console.log('error');
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (query !== '') {
      getSearchPics();
    }
  }, [query, page]);

  const bottomRef = useRef(null);
  useEffect(() => {
    if (query === '') {
      return;
    }
    bottomRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  });

  const changeQuery = newQuery => {
    setQuery(newQuery);
    setPage(1);
  };

  const updatePage = () => {
    setPage(prev => prev + 1);
  };
  return (
    <div className={css.app}>
      <Searchbar onSubmit={changeQuery} />
      <ImageGallery
        pics={pics}
        isLoading={isLoading}
        total={total}
        updatePage={updatePage}
        bottomRef={bottomRef}
      />
      <ToastContainer />
    </div>
  );
};
