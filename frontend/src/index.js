// React
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import App from './App';

// Redux
import { createStore } from 'redux';
import reducers from './reducers/reducers';
import { Provider } from 'react-redux';

// Semantic-UI
import 'semantic-ui-less/semantic.less'

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));