// React
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import App from './App';

// Redux
import { createStore } from 'redux';
import allReducers from './reducers';
import { Provider } from 'react-redux';

// Semantic-UI
import 'semantic-ui-less/semantic.less'

// Redux Store
const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));