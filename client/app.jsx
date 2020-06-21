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
import PostEditor from './modules/PostEditor';
import Categories from './modules/Categories';
import CategoryEditor from './modules/CategoryEditor';
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
          <Route exact path="/admin/posts/new" component={PostEditor} />
          <Route exact path="/admin/posts/edit/:id?" component={PostEditor} />
          <Route exact path="/admin/categories" component={Categories} />
          <Route
            exact
            path="/admin/categories/new"
            component={CategoryEditor}
          />
          <Route
            exact
            path="/admin/categories/edit/:id?"
            component={CategoryEditor}
          />
        </Application>
      </Router>
    </Provider>,
    appContainer
  );
}
