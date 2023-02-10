import { useEffect, useState } from 'react';

import getImage from 'components/services/gallary-app';

import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const Gallery = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loader, setloader] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalImg, setModalImg] = useState('');

  useEffect(() => {
    if (query === '') {
      return;
    }
    const fetchImages = async () => {
      setloader(true);

      try {
        const data = await getImage({ q: query, page });
        if (!data.totalHits) {
          Notify.failure('We have nothing for this search');
        }

        if (data.hits.length) {
          setImages(prev => [...prev, ...data.hits]);
        }
      } catch (error) {
        console.log(error);
        Notify.failure('Error');
      } finally {
        setloader(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const onLoadMoreButton = () => {
    setPage(page + 1);
  };

  const handleSearch = e => {
    setQuery(e);
    setPage(1);
    setImages([]);
  };

  const toggleModal = imageURL => {
    setModal(!modal);
    setModalImg(imageURL);
  };

  return (
    <>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} onClick={toggleModal} />
      {images.length > 0 && <Button onClick={onLoadMoreButton} />}
      {loader && <Loader />}
      {modal && <Modal modalImg={modalImg} onClose={toggleModal} />}
    </>
  );
};
