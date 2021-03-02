// @ts-ignore
import React from 'react';
// @ts-ignore
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
// @ts-ignore
import { Provider } from 'react-redux';
// @ts-ignore
import { Router, Route } from 'react-router';
// @ts-ignore
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import './config';
// @ts-ignore
import Application from './modules/Application';
// @ts-ignore
import Admin from './modules/Admin';
// @ts-ignore
import Posts from './modules/Posts';
// @ts-ignore
import PostEditor from './modules/PostEditor';
// @ts-ignore
import Post from './modules/Post';
// @ts-ignore
import Categories from './modules/Categories';
// @ts-ignore
import CategoryEditor from './modules/CategoryEditor';
// @ts-ignore
import sagas from './sagas';
// @ts-ignore
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
          <Route exact path="/post/:postId" component={Post} />
          <Route exact path="/category" component={Categories} />
          <Route exact path="/category/:categoryId" component={Posts} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/admin/posts" render={() => <Posts isAdmin />} />
          <Route exact path="/admin/posts/new" component={PostEditor} />
          <Route exact path="/admin/posts/edit/:id?" component={PostEditor} />
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
    </Provider>,
    appContainer,
  );
}
