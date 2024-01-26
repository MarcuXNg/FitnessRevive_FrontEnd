import * as React from 'react'; // import * as React from 'react'; imports the entire 'react' library and assigns it to the variable React. The use of * as means that you are importing everything from the 'react' library.
import {createRoot} from 'react-dom/client'; // create a root element for the ReactDOM to render into or create a root element for rendering your React application.
import {BrowserRouter, Route, Routes} from 'react-router-dom'; // BrowserRouter: A component that provides the routing infrastructure for your application. Route: A component that renders a UI component when the path matches its path prop. Routes: A container for Route components that defines your application's routes.
import '@fortawesome/fontawesome-free/css/all.min.css'; // import fontawesome
import {Provider} from 'react-redux'; // redux
import store from './redux/store.js'; // redux store import
import 'react-calendar/dist/Calendar.css';

import App from './routes/App.jsx'; // import App.jsx
import {AuthProvider} from './context/AuthProvider.jsx'; // import AuthProvider
import 'react-loader-spinner'; // import react-loader-spinner library
import reportWebVitals from './reportWebVitals.js'; // import reportWebVitals
import './styles/index/index.scss'; // import index.scss
import 'font-awesome/css/font-awesome.min.css'; // import font-awesome
import 'react-horizontal-scrolling-menu/dist/styles.css';

const rootElement = document.getElementById('root'); // get the element with the id root, usually a div

createRoot(rootElement).render(
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
