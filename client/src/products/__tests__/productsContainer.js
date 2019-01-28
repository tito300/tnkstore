import { shallow } from 'enzyme';
import React from 'react';
import { Products } from '../productsContainer';
let wrapper;

describe('ProductsContainer component', ()=>{
    beforeAll(()=>{
        wrapper = shallow(<Products />, {
            disableLifecycleMethods: true
        });
    })

    it('should render ProductsContainer', () => {
        expect(wrapper).toMatchSnapshot();  
    })

    it('initial default state should be correct', ()=>{
        expect.assertions(9)

        expect(wrapper.state('page')).toBe(1);
        expect(wrapper.state('products').length).toBe(0);
        expect(wrapper.state('allProducts').length).toBe(0);
        expect(wrapper.state('numberOfPages')).toBeDefined();
        expect(wrapper.state('itemsPerPage')).toBeDefined();
        expect(wrapper.state('category')).toBeDefined();
        expect(wrapper.state('error')).toBeFalsy();
        expect(wrapper.state('errMsg')).toBe("");
        expect(wrapper.state('pending')).toBeFalsy();
        // console.log(wrapper.instance());
    })

    it('should show "no items available"', ()=> {
        expect(wrapper.find('.text-error').exists()).toBeTruthy();
    } )
    
    it('should show fetching', () => {
        expect.assertions(1);

        wrapper.setState({ pending: true });
        expect(wrapper.find('.fetching-items').exists()).toBeTruthy();
    })

    it('should show products when recieved', async (done) => {
        expect.assertions(1);
        
        wrapper.instance().getProducts = jest.fn().mockResolvedValue(products);
        wrapper.setProps({
            match: {
                params: { category: 'topsellers' }
            }
        })
        await wrapper.instance().componentDidMount();
        // expect(wrapper).toMatchSnapshot('temp snapshot');

        expect(wrapper.find('.products').children().length).toBe(6);
        done();
    })

    it('should update page count and class when page 2 is clicked', ()=>{
        expect.assertions(1);
        
        wrapper.instance().handlePageChange({
            target: { id: '2' },
        })
        expect(wrapper.state('page')).toBe(2);
        // expect(wrapper.find('li[id="2"]').hasClass('active')).toBeTruthy();
    })
})


var products = [
    {
        title: "random",
        id: '23442',
        discreption: 'sdsdsdsd',
        photo: './img/ssdsdq.jpg'
    },
    {
        title: "random",
        id: '23442',
        discreption: 'sdsdsdsd',
        photo: './img/ssdsdq.jpg'
    },
    {
        title: "random",
        id: '23442',
        discreption: 'sdsdsdsd',
        photo: './img/ssdsdq.jpg'
    },
    {
        title: "random",
        id: '23442',
        discreption: 'sdsdsdsd',
        photo: './img/ssdsdq.jpg'
    },
    {
        title: "random",
        id: '23442',
        discreption: 'sdsdsdsd',
        photo: './img/ssdsdq.jpg'
    },
    {
        title: "random",
        id: '23442',
        discreption: 'sdsdsdsd',
        photo: './img/ssdsdq.jpg'
    },
    {
        title: "random",
        id: '23442',
        discreption: 'sdsdsdsd',
        photo: './img/ssdsdq.jpg'
    },
]