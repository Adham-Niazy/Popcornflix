import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbAPIKey = process.env.REACT_APP_TMDB_KEY;

export const TMDBApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    //* Get Movies by type
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // Get Movies by Search
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbAPIKey}`;
        }
        // Get movies by Category
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbAPIKey}`;
        }
        // Get Movies by type
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbAPIKey}`;
        }
        // Get Popular
        return `movie/popular?page=${page}&api_key=${tmdbAPIKey}`;
      },
    }),
    //* Get Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbAPIKey}`,
    }),
    //* Get Movie
    getMovie: builder.query({
      query: (id) => `movie/${id}?append_to_response=videos,credits&api_key=${tmdbAPIKey}`,
    }),
    //* Get User Specific Lists
    getRecommendations: builder.query({
      query: ({ movieId, list }) => `/movie/${movieId}/${list}?api_key=${tmdbAPIKey}`,
    }),
    //* Get Actor
    getActor: builder.query({
      query: (id) => `person/${id}?api_key=${tmdbAPIKey}`,
    }),
    //* Get Movies By Actor
    getMoviesByActor: builder.query({
      query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbAPIKey}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetMoviesByActorQuery,
} = TMDBApi;
