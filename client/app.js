import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import './config';
import Application from './modules/Application';
import Admin from './modules/Admin';
import Posts from './modules/Posts';
import PostEditor from './modules/PostEditor';
import Post from './modules/Post';
import Categories from './modules/Categories';
import CategoryEditor from './modules/CategoryEditor';
import sagas from './sagas';
import reducers from './reducers';
const appContainer = document.querySelector('.js-app');
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);
if (appContainer) {
    render(React.createElement(Provider, { store: store },
        React.createElement(Router, { history: createBrowserHistory({}) },
            React.createElement(Application, null,
                React.createElement(Route, { exact: true, path: "/", component: Posts }),
                React.createElement(Route, { exact: true, path: "/post/:postId", component: Post }),
                React.createElement(Route, { exact: true, path: "/category", component: Categories }),
                React.createElement(Route, { exact: true, path: "/category/:categoryId", component: Posts }),
                React.createElement(Route, { exact: true, path: "/admin", component: Admin }),
                React.createElement(Route, { exact: true, path: "/admin/posts", render: () => React.createElement(Posts, { isAdmin: true }) }),
                React.createElement(Route, { exact: true, path: "/admin/posts/new", component: PostEditor }),
                React.createElement(Route, { exact: true, path: "/admin/posts/edit/:id?", component: PostEditor }),
                React.createElement(Route, { exact: true, path: "/admin/categories", render: () => React.createElement(Categories, { isAdmin: true }) }),
                React.createElement(Route, { exact: true, path: "/admin/categories/new", component: CategoryEditor }),
                React.createElement(Route, { exact: true, path: "/admin/categories/edit/:id?", component: CategoryEditor })))), appContainer);
}
//# sourceMappingURL=app.js.map