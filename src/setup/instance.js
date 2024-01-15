import axios from 'axios';
import {useRefreshToken} from '../services/authService.js';
import {useEffect} from 'react'; // React's useEffect hook
import {useSelector} from 'react-redux';
// import {toast} from 'react-toastify';

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v1' || process.env.REACT_APP_BACKEND_URL,
});

instance.defaults.withCredentials = true;

// // Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;
instance.defaults.headers.common['Content-Type'] = 'application/json';

// Define the custom hook for handling private Axios requests
const useInstance = () => {
  // Obtain the authentication state from the auth hook
  const auth = useSelector((state) => state.auth);
  // console.log(auth);
  // Create an AbortController for handling the request
  const controller = new AbortController();
  // Obtain the refresh function from the useRefreshToken hook
  const refresh = useRefreshToken();

  // Setup interceptors when the component mounts or dependencies change
  useEffect(() => {
    // Setup request interceptor
    const requestIntercept = instance.interceptors.request.use(
        (config) => {
          // If Authorization header is not present, add the access token
          if (!config.headers['Authorization']) {
            config.headers['Authorization'] = `Bearer ${auth?.access_token}`;
          }
          // Associate the AbortController's signal with the request
          config.signal = controller.signal;
          // Do something before request is sent
          return config;
        },
        // Handle request error
        // (error) => Promise.reject(error),
        (error) => {
          return error.response.data;
        },
    );

    // Setup response interceptor
    const responseIntercept = instance.interceptors.response.use(
        // Handle successful responses
        (response) => response,
        // Handle response errors
        async (error) => {
          const prevRequest = error?.config;

          // If response status is 403 (forbidden) and the request hasn't been retried
          if (error?.response?.status === 403 && !prevRequest?.sent) {
            prevRequest.sent = true;
            // Only proceed if a refresh request is not already in progress
            try {
              // Refresh the access token
              const newAccessToken = await refresh();

              // Update the Authorization header with the new access token
              prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
              // instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

              // Retry the original request with the updated token
              const retryResponse = await instance(prevRequest);

              return retryResponse;
            } catch (error) {
              // Handle refresh error, e.g., log or dispatch an action
              console.error('Error refreshing token:', error);
            }
          }

          // Reject the promise with the error for other cases
          return Promise.reject(error);
        },
    );

    // Cleanup function to eject interceptors when the component unmounts or dependencies change
    return () => {
      instance.interceptors.request.eject(requestIntercept);
      instance.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]); // Dependencies for useEffect

  // Return the private Axios instance with configured interceptors
  return {instance, controller};
};

export default useInstance;
