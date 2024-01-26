import axios from 'axios';
// import {toast} from 'react-toastify';

const rapidAPIKey = process.env.REACT_APP_youtubeAPIKey;

// Create an Axios instance with default configuration
const instance = axios.create({
  baseURL: 'https://youtube-search-and-download.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': rapidAPIKey,
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
  },
});

// Add a request interceptor
instance.interceptors.request.use(
    (config) => {
    // Do something before request is sent
      return config;
    },
    (error) => {
    // Do something with request error
      return error.response.data;
    },
);

// Add a response interceptor
instance.interceptors.response.use(
    (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
      return response.data;
    },
    (err) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
      const status = (err && err.response && err.response.status) || 500;
      switch (status) {
      // Unauthorized
        case 401:
        // toast.error('(401) Unauthorized. Please check your credentials.');
          break;

          // Forbidden
        case 403:
        // toast.error('(403) Forbidden. You do not have permission to access this resource.');
          break;

          // Bad Request
        case 400:
        // toast.error('(400) Bad Request. Please check your request.');
          break;

          // Not Found
        case 404:
        // toast.error('(404) Not Found. The requested resource could not be found.');
          break;

          // Conflict
        case 409:
        // toast.error('(409) Conflict. There is a conflict with the current state of the target resource.');
          break;

          // Unprocessable
        case 422:
        // toast.error('(422) Unprocessable Entity. The server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions.');
          break;

          // Generic API error (server related) unexpected
        default:
        // toast.error(`(${status}) An unexpected error occurred. Please try again.`);
          break;
      }

      return err.response.data;
    },
);

export default instance;
