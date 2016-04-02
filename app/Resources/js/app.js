import React from 'react';
import ReactDOM from 'react-dom';
import App from 'pages/App';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import myHistory from 'router/myHistory';
import store from 'store/store';
import CreateBoardPage from 'pages/CreateBoardPage';
import ViewBoardPage from 'pages/ViewBoardPage';

global.fetch = fetch;

ReactDOM.render(
  <Provider store={store}>
    <Router history={myHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={CreateBoardPage} />
        <Route path="board/:id" component={ViewBoardPage} />
        <Redirect from="*" to="/" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
