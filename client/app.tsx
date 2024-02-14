import React from 'react';
import { createRoot } from 'react-dom/client';
import { configureStore, Tuple } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import config from './config';
import Application from './modules/Application';
import Admin from './modules/Admin';
import Posts from './modules/Posts';
import PostEditor from './modules/PostEditor';
import Post from './modules/Post';
import Categories from './modules/Categories';
import Helpdesk from './modules/Helpdesk';
import CategoryEditor from './modules/CategoryEditor';
import PlatformEditor from './modules/PlatformEditor';
import sagas from './sagas';
import reducers from './reducers';

const appContainer = document.querySelector('.js-app');
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: reducers,
  middleware: () => new Tuple(sagaMiddleware),
});

sagaMiddleware.run(sagas);

const moduleRegistry = {
  post: Posts,
  category: Categories,
  helpdesk: Helpdesk,
};

if (appContainer) {
  createRoot(appContainer).render(
    <Provider store={store}>
      <Router history={createBrowserHistory({})}>
        <Application>
          <Route
            exact
            path="/"
            component={moduleRegistry[config.landingModule]}
          />
          <Route exact path="/post" component={Posts} />
          <Route exact path="/post/:postId" component={Post} />
          <Route exact path="/category" component={Categories} />
          <Route exact path="/category/:categoryId" component={Posts} />
          <Route exact path="/helpdesk/:id?" component={Helpdesk} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/admin/posts" render={() => <Posts isAdmin />} />
          <Route exact path="/admin/posts/new" component={PostEditor} />
          <Route exact path="/admin/posts/edit/:id?" component={PostEditor} />
          <Route exact path="/admin/platform/edit" component={PlatformEditor} />
          <Route
            exact
            path="/admin/categories"
            render={() => <Categories isAdmin />}
          />
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
    </Provider>
  );
}
