import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App';
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux';
import Store from './redux/store';

ReactDOM.render(
    <Provider store={Store}>
      <App/>
    </Provider>,
    document.getElementById('reactHook'));
