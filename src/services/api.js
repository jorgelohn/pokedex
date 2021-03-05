import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

if (__DEV__) {
  api.interceptors.request.use((request) => {
    console.log('Starting Request', request);
    return request;
  });

  api.interceptors.response.use((response) => {
    console.log('Response:', response);
    return response;
  });
}

export {api};
