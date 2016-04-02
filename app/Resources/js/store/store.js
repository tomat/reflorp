import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import reducers from 'store/reducers';
import { reflorpSetStore, reflorpSetEntities, reflorpSetBaseUrl } from 'react-reflorp';
import apiUrl from 'helpers/apiUrl';
import myHistory from 'router/myHistory';

const middlewares = [];
if (__GLOBALS__.dev) {
  const createLogger = require('redux-logger');
  const logger = createLogger();
  middlewares.push(logger);
}

const storeEnhancers = [];
storeEnhancers.push(applyMiddleware(...middlewares));

const finalCreateStore = compose(...storeEnhancers)(createStore);

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});

const store = finalCreateStore(
  reducer
);

reflorpSetBaseUrl(apiUrl(''));
reflorpSetEntities({
  board: {
    onCreate: (board) => {
      myHistory.push(`/board/${board.id}`);
    },
  },
  note: {
    parent: 'board',
    count: 'notesCount',
  },
});
reflorpSetStore(store);

export default store;
