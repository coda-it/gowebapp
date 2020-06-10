// @flow
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import Application from './modules/Application';
import Admin from './modules/Admin';
import Posts from './modules/Posts';
import NewPost from './modules/NewPost';
import sagas from './sagas';
import reducers from './reducers';

const appContainer = document.querySelector('.js-app');
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

if (appContainer) {
  render(
    <Provider store={store}>
      <Router history={createBrowserHistory({})}>
        <Application>
          <Route exact path="/" component={Posts} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/admin/posts" render={() => <Posts isAdmin />} />
          <Route exact path="/admin/new-post" component={NewPost} />
        </Application>
      </Router>
    </Provider>,
    appContainer
  );
}
