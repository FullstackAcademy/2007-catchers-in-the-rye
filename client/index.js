import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux';
import Routes from './components';

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('main'),
);
