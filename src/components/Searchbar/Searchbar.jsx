import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import css from '../../components/Searchbar/Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [searchName, setSearchName] = useState('');

  const handleNameChange = e => {
    setSearchName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchName.trim() === '') {
      alert('Введіть пошукове слово');
      return;
    }

    onSubmit(searchName);
    setSearchName('');
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchForm__button}>
          <span className={css.SearchForm__button__label}>Search</span>
          <ImSearch />
        </button>

        <input
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          type="text"
          name="searchName"
          className={css.SearchForm__input}
          value={searchName}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
