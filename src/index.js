import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import rootSaga from './redux/sagas';
import configureStore from './redux/configureStore';

const store = configureStore();
store.runSaga(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);

reportWebVitals();
