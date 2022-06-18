import axios from 'axios';

export const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
  },
});

export const fetchToken = async () => {
  try {
    const { data } = await moviesApi.get('/authentication/token/new');
    const REQUEST_TOKEN = data.request_token;
    if (data.success) {
      localStorage.setItem('request_token', REQUEST_TOKEN);
      window.location.href = `https://www.themoviedb.org/authenticate/${REQUEST_TOKEN}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (e) {
    // console.log("Sorry, your token couldn't be created!");
  }
};
// eslint-disable-next-line
export const createSessionId = async () => {
  const REQUEST_TOKEN = localStorage.getItem('request_token');
  if (REQUEST_TOKEN) {
    try {
      const { data } = await moviesApi.post('authentication/session/new', {
        request_token: REQUEST_TOKEN,
      });
      const SESSION_ID = data.session_id;
      localStorage.setItem('session_id', SESSION_ID);
      return SESSION_ID;
    } catch (error) {
      // console.log("Sorry, your session id couldn't be created!");
    }
  }
};
