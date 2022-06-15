import { configureStore } from '@reduxjs/toolkit';

import { TMDBApi } from '../services/TMDB';

export default configureStore({
  reducer: {
    [TMDBApi.reducerPath]: TMDBApi.reducer,
  },
});
