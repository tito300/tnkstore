import React from 'react';
import { shallow } from 'enzyme'
import App from './App';
import Header from './common/pageHeader';
// import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom'
// import thunk from 'redux-thunk';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import rootReducer from './reducers/root'

it('renders without crashing', () => {
   const wrapped = shallow(<App/>);

   expect(wrapped.find(Header).length).toEqual(1);
});
