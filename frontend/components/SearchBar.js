import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ posts, setSearchResults }) => {
    const handleSubmit = (e) => e.preventDefault();

    const handleSearchChange = (e) => {
        if(!e.target.value) return setSearchResults(posts);

        const resultsArray = posts.filter(posts => posts.title.includes(e.target.value) || posts.body.includes(e.target.value));
        setSearchResults(resultsArray);
    }

  return (
    <form className="search" onSubmit={handleSubmit}>
        <input
            className="search__input"
            type="text"
            id="search"
            onChange={handleSearchChange}
        />
        <button className="search__button">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
    </form>
  )
}

export default SearchBar;
