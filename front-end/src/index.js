import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'; // Import Provider
import store from "./store/store"; // Import your Redux store
import reportWebVitals from "./reportWebVitals"

ReactDOM.render(
  <Provider store={store}> {/* Wrap App with Provider */}
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
