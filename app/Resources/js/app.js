import React from 'react';
import ReactDOM from 'react-dom';
import App from 'pages/App';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import { Container as ReflorpContainer } from 'react-reflorp';
import myHistory from 'router/myHistory';
import store from 'store/store';
import apiUrl from 'helpers/apiUrl';
import CreateBoardPage from 'pages/CreateBoardPage';
import ViewBoardPage from 'pages/ViewBoardPage';

global.fetch = fetch;

const configuration = {
  entities: {
    board: {
      plural: 'boards',
    },
    note: {
      parent: 'board',
      count: 'notesCount',
      plural: 'notes',
    },
  },
  baseUrl: apiUrl(''),
};

ReactDOM.render(
  <Provider store={store}>
    <ReflorpContainer configuration={configuration}>
      <Router history={myHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={CreateBoardPage} />
          <Route path="board/:id" component={ViewBoardPage} />
          <Redirect from="*" to="/" />
        </Route>
      </Router>
    </ReflorpContainer>
  </Provider>,
  document.getElementById('app')
);
