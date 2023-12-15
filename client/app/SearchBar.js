import React, { useState } from 'react';
import './SearchBar.css';
import { BsSearch } from 'react-icons/bs';


function SearchBar() {
    const [search, setSearch] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearch('');
      };

  return (
    <div className="searchbar_container">
        <form onSubmit={handleSubmit} className='searchbar' >
            <textarea placeholder='Rechercher...' value={search} onChange={(event) => setSearch(event.target.value)} maxLength= '30'/>
            <button type='submit' className='search_logo'> <BsSearch/></button>
        </form>
    </div>
  );
}

export default SearchBar;
