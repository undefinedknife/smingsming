import React from "react";
import ReactDOM from "react-dom";
import ReduxThunk from 'redux-thunk'
import ReduxPromise from 'redux-promise';
import { createLogger } from 'redux-logger'
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import '../assets/style/style.css';

import reducers from "./reducers";
import App from './components/App';

const middlewareList = [ ReduxThunk, ReduxPromise ];

if (process.env.NODE_ENV !== 'production') {
    middlewareList.push(createLogger())
}

const store = createStore(reducers, applyMiddleware(...middlewareList));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.querySelector('.container-fluid')
);

