import React from 'react';
import ReactDOM from 'react-dom';

import {
    HashRouter as Router
} from 'react-router-dom';

import App from './App';

import * as serviceWorker from './serviceWorker';

import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './css/styles.css';

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <App />
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
