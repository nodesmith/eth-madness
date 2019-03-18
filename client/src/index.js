import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// import { AppContainer } from 'react-hot-loader';
import configureStore, { history } from './store/configureStore';
import App from './components/App'

const store = configureStore();
const rootEl = document.getElementById('root');

const doRender = Component => {
  render(
    <Provider store={store}>
      <Component history={history} />
    </Provider>,
    rootEl
  );
}

doRender(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    render(NextApp);
  });
}