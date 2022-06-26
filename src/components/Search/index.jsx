import React, { useState } from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { SearchComponent, SearchIconWrapper, StyledInputBase } from './styles';
import { searchMovie } from '../../features/currentGenreOrCategory';

function Search() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && query !== '') {
      if (location.pathname !== '/') navigate('/');
      dispatch(searchMovie(query));
    }
  };

  if (location.pathname !== '/' && location.pathname !== '/approved') return null;

  return (
    <SearchComponent>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={query}
        onChange={(e) => {
          if (e.target.value === '') dispatch(searchMovie(''));
          setQuery(e.target.value);
        }}
        onKeyDown={handleKeyPress}
        placeholder="Search Movies"
        inputProps={{ 'aria-label': 'search' }}
      />
    </SearchComponent>
  );
}

export default Search;
