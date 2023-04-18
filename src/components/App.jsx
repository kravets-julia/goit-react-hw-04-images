import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import css from './App.module.css';

export function App() {
  const [searchName, setSearchName] = useState('');

  const handleFormSubmit = searchName => {
    setSearchName(searchName);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery searchName={searchName} />
      <ToastContainer autoClose={2000} />
    </div>
  );
}
