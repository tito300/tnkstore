import { shallow } from 'enzyme';
import React from 'react';
import Product from '../product';

let wrapper;

describe('Product component', ()=>{
    beforeAll(()=>{
        let props = {
            product: {photo: 'img/random.jpg'}
        }
        wrapper = shallow(<Product {...props}/>);
    })
    it('should match Product snapshot', ()=>{
        expect(wrapper).toMatchSnapshot();
    }) 
})