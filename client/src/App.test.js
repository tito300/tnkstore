import React from 'react';
import { shallow } from 'enzyme'
import App from './App';
import Header from './common/pageHeader';


it('renders without crashing', () => {
   const wrapped = shallow(<App/>);

   expect(wrapped).toMatchSnapshot();
});
