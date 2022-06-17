import { configureStore } from '@reduxjs/toolkit';

import { TMDBApi } from '../services/TMDB';
import genreOrCategoryReducer from '../features/currentGenreOrCategory';

export default configureStore({
  reducer: {
    [TMDBApi.reducerPath]: TMDBApi.reducer,
    currentGenreOrCategory: genreOrCategoryReducer,
  },
});
