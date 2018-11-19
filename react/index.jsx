import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Website from './website';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './reducers/rootReducer'

const store = createStore(rootReducer)

ReactDOM.render(<Provider store={store}><BrowserRouter><Website /></BrowserRouter></Provider>, document.getElementById('body'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
