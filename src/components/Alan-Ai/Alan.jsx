import { useContext, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ColorModeContext } from '../../utils/ToggleColorMode';
import { fetchToken } from '../../utils';
import { selectGenreOrCategory, searchMovie } from '../../features/currentGenreOrCategory';

function useAlan() {
  const { setMode } = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALAN_AI_KEY,
      onCommand: ({ command, mode, genreOrCategory: genre, genres, query }) => {
        switch (command) {
          case 'chooseGenre': {
            const foundGenre = genres.find((el) => el.name.toLowerCase() === genre.toLowerCase());
            if (foundGenre) {
              navigate('/');
              dispatch(selectGenreOrCategory(foundGenre.id));
            } else {
              const category = genre.startsWith('top') ? 'top_rated' : genre;
              navigate('/');
              dispatch(selectGenreOrCategory(category));
            }
            break;
          }
          case 'search': {
            dispatch(searchMovie(query));
            break;
          }
          case 'changeMode':
            setMode(mode);
            break;
          case 'login':
            fetchToken();
            break;
          case 'logout':
            localStorage.clear();
            window.location.href = '/';
            break;
          default: break;
        }
      },
    });
  }, []);
}

export default useAlan;
