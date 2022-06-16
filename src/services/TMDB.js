import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbAPIKey = process.env.REACT_APP_TMDB_KEY;
const page = 1;

export const TMDBApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    //* Get Movies by type
    getMovies: builder.query({
      query: () => `movie/popular?page=${page}&api_key=${tmdbAPIKey}`,
    }),
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbAPIKey}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
} = TMDBApi;
