import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';
import { composeWithDevTools } from 'remote-redux-devtools';
import mySaga from '../sagas';

export const history = createBrowserHistory();

const reducer = createRootReducer(history);

// https://github.com/supasate/connected-react-router
export default function configureStore() {
  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware();


  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {

  } else {

  }
  const store = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? 
  createStore(
    reducer, // root reducer with router state
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        sagaMiddleware,
        // ... other middlewares ...
      ),
    ),
  ) :
  createStore(
    reducer, // root reducer with router state
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      sagaMiddleware,
      // ... other middlewares ...
    )
  );

  // then run the saga
  sagaMiddleware.run(mySaga)

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('../reducers', () => {
        store.replaceReducer(reducer);
      });
    }
  }

  return store
}
