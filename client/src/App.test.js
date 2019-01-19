import React from 'react';
import { shallow } from 'enzyme'
import App from './App';
// import Header fro './common/pageHeader';


it('renders without crashing', () => {
   const wrapped = shallow(<App/>);

   expect(wrapped).toMatchSnapshot();
});
