import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import App from './routes/App.jsx';
import {AuthProvider} from './context/AuthProvider.jsx';
import 'react-loader-spinner';
import reportWebVitals from './reportWebVitals.js';
import './styles/index/index.scss';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>,
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
