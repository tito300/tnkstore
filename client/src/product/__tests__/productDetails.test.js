import { shallow } from 'enzyme';
import React from 'react';
import ProductDetails from '../productDetails';
let wrapper;

describe('ProductDetails component', ()=>{
    beforeAll(()=>{
        let props = { success: false, 
            failed: null, 
            addItemToCartSuccess: jest.fn(), 
            color: 'green', 
            size: 'l', 
            gender: 'male', 
            product: {
                title: 'random',
                brand: 'randombrand',
                discreption: 'randomdisc'
            } 
        }
        wrapper = shallow(<ProductDetails {...props} />);

    })

    it('should render ProductsContainer', () => {
        expect(wrapper).toMatchSnapshot();  
    });

    it('should render warning if color not selected', ()=>{
        wrapper.setProps({
            success: false,
            failed: true,
        })
        expect(wrapper.find('.addToCartWarning').exists()).toBeTruthy();
    })

    it('should show success when item is added to cart', ()=>{
        wrapper.setProps({
            success: true,
        })
        expect(wrapper.find('svg').exists()).toBeTruthy();
    });
    it('should display not available if brand is messing', ()=>{
        wrapper.setProps({
            product: {
                title: 'random',
                brand: '',
                discreption: 'randomdisc'
            }
        })
        expect(wrapper.find('.brand').prop('children')).toContainEqual(<span>Not available</span>);
    })
});