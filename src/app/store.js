import { configureStore } from '@reduxjs/toolkit';

import { TMDBApi } from '../services/TMDB';
import genreOrCategoryReducer from '../features/currentGenreOrCategory';
import authReducer from '../features/auth';

export default configureStore({
  reducer: {
    [TMDBApi.reducerPath]: TMDBApi.reducer,
    currentGenreOrCategory: genreOrCategoryReducer,
    user: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(TMDBApi.middleware),
});
