import { shallow } from 'enzyme';
import React from 'react';
import ProductOptions from '../productOptions';

let wrapper;
let variants =  {
    male: [
        {
            color: 'red', sizes: [
                { size: 'l', price: 29.99 },
                { size: 'm', price: 25.99 },
            ]
        },
        {
            color: 'blue', sizes: [
                { size: 's', price: 29.99 },
                { size: 'xl', price: 25.99 },
            ]
        }
    ],
    female: [
        {
            color: 'green', sizes: [
                { size: 'xxl', price: 29.99 },
                { size: 'xs', price: 25.99 },
            ]
        },
        {
            color: 'blue', sizes: [
                { size: 'm', price: 29.99 },
                { size: 'l', price: 25.99 },
            ]
        }
    ],
}

describe('ProductImage Component', ()=> {
    beforeAll(()=>{
        let props = {
            variants, 
            handleOptions: jest.fn(), 
            color: null, 
            size: 'l', 
            gender: 'male',
        }
        wrapper = shallow(<ProductOptions {...props} />);
    })
    it('should match snapshot', ()=>{
        expect(wrapper).toMatchSnapshot();
    });
    it('should render "no variants" message', ()=>{
        wrapper.setProps({
            variants: {
                male: [],
                female: [],
            }
        })
        expect(wrapper.find('.optionsContainer').children().length).toBe(1);
    })
    it('should display size options when color is picked', () => {
        wrapper.setProps({
            variants,
            handleOptions: jest.fn(), 
            color: 'red', 
            size: 'l', 
            gender: 'male',
        })
        expect(wrapper.find('.selectSize').exists()).toBeTruthy();
    })
})