// import
import React from 'react';

// react-toastify
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Hourglass} from 'react-loader-spinner';
import {useAuth} from '../hooks/useAuth.jsx';
// Navigation bar
import NavHeader from '../components/Navigation/Nav';
import '../styles/app/App.scss';

// Routes
import AppRoutes from './routes.jsx';


const App = () => {
  const {auth} = useAuth();
  return (
    <>
      <div className="app">
        {auth && auth.isLoading ? (
          <div className="loading-container">
            <Hourglass
              visible={true}
              height="80"
              width="80"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={['#306cce', '#72a1ed']}
            />
            <div>Loading data...</div>
          </div>
        ) : (
          <>
            <div className="app-header">
              <header>
                <NavHeader />
              </header>
            </div>

            <div className="app-container">
              <AppRoutes />
            </div>
          </>
        )}

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
};

export default App;
