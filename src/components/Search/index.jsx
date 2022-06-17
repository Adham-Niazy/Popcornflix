import React, { useState } from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
// import { useLocation } from 'react-router-dom';

import { SearchComponent, SearchIconWrapper, StyledInputBase } from './styles';
import { searchMovie } from '../../features/currentGenreOrCategory';

function Search() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      dispatch(searchMovie(query));
    }
  };

  return (
    <SearchComponent>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search Movies"
        inputProps={{ 'aria-label': 'search' }}
      />
    </SearchComponent>
  );
}

export default Search;
