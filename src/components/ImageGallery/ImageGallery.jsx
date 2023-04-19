import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import { LoadMoreBtn } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import css from '../../components/ImageGallery/ImageGallery.module.css';

export default function ImageGallery({ searchName }) {
  const [img, setImg] = useState([]);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImgURL, setLargeImgURL] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (searchName === '') {
      return;
    }
    if (pageNumber !== 1) {
      return;
    }

    setStatus('pending');
    setImg([]);
    setPageNumber(1);

    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '33829392-49d1eab567acddcf43bdfe9f1';

    fetch(
      `${BASE_URL}?q=${searchName}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())

      .then(({ hits, totalHits }) => {
        if (totalHits === 0) {
          setImg([]);
          setPageNumber(1);
          setStatus('resolved');
          return toast.error(`No found image ${searchName}`);
        }
        if (hits.length < 12) {
          setStatus('resolved');
          toast.info('No more image');
        }
        const arr = hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
          id,
          tags,
          webformatURL,
          largeImageURL,
        }));

        setImg(arr);
        setStatus('resolved');
      })
      .catch(error => {
        setImg([]);
        setStatus('rejected');
        console.log(error);
      });
  }, [searchName, pageNumber]);

  useEffect(() => {
    if (searchName === '') {
      return;
    }
    if (pageNumber === 1) {
      return;
    }

    setStatus('pending');

    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '33829392-49d1eab567acddcf43bdfe9f1';

    fetch(
      `${BASE_URL}?q=${searchName}&page=${pageNumber}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())

      .then(({ hits, totalHits }) => {
        if (totalHits === 0) {
          setImg([]);
          setPageNumber(1);
          setStatus('resolved');
          return toast.error(`No found image ${searchName}`);
        }
        if (hits.length < 12) {
          setStatus('resolved');
          toast.info('No more image');
        }
        const arr = hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
          id,
          tags,
          webformatURL,
          largeImageURL,
        }));

        if (pageNumber !== 1) {
          setImg(prev => [...prev, ...arr]);
          setStatus('resolved');
        } else {
          setImg(arr);
          setStatus('resolved');
        }
      })
      .catch(error => {
        setImg([]);
        setStatus('rejected');
        console.log(error);
      });
  }, [searchName, pageNumber]);

  const handleIncrement = () => {
    setPageNumber(prev => prev + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onImgClick = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    const index = img.findIndex(img => Number(img.id) === Number(e.target.id));
    setLargeImgURL(img[index].largeImageURL);
    setShowModal(true);
  };

  return (
    <>
      {img.length > 0 && (
        <>
          <ul className={css.ImageGallery} onClick={e => onImgClick(e)}>
            {img.map(img => (
              <ImageGalleryItem
                key={img.id}
                webformatURL={img.webformatURL}
                id={img.id}
                tags={img.tags}
              />
            ))}
          </ul>
          {status === 'pending' && <Loader />}
          {status === 'rejected' && <div>Error</div>}
        </>
      )}
      {showModal && <Modal largeImg={largeImgURL} onClose={toggleModal} />}
      {img.length - pageNumber * 12 === 0 && (
        <LoadMoreBtn loadMore={handleIncrement} />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  searchName: PropTypes.string.isRequired,
};
