import { shallow } from 'enzyme';
import React from 'react';
import { Products } from '../productsContainer';
let wrapper;

describe('ProductsContainer component', ()=>{
    beforeAll(()=>{
        wrapper = shallow(<Products match={{params: {category: 'topsellers'}}} />, {
            disableLifecycleMethods: false,
        });
    })

    it('should render ProductsContainer', () => {
        expect(wrapper).toMatchSnapshot();  
    })

    it('initial default state should be correct', ()=>{
        expect.assertions(9)

        expect(wrapper.state('page')).toBe(1);
        expect(wrapper.state('currentPageProducts').length).toBe(0);
        expect(wrapper.state('allProducts').length).toBe(0);
        expect(wrapper.state('numberOfPages')).toBeDefined();
        expect(wrapper.state('itemsPerPage')).toBeDefined();
        expect(wrapper.state('category')).toBeDefined();
        expect(wrapper.state('error')).toBeFalsy();
        expect(wrapper.state('errMsg')).toBe("");
        expect(wrapper.state('pending')).toBeTruthy();
        // console.log(wrapper.instance());
    })

    it('should show fetching', () => {
        expect.assertions(1);

        expect(wrapper.find('.fa-spinner').exists()).toBeTruthy();
    })

    it('should show products when recieved', async (done) => {
        expect.assertions(1);

        wrapper.setState({
            currentPageProducts: products,
            page: 1,
            error: false,
            errMsg: "",
            pending: false,
        })
        
        // wrapper.instance().getProducts = jest.fn().mockResolvedValue(products);
        // wrapper.setProps({
        //     match: {
        //         params: { category: 'topsellers' }
        //     }
        // })
        // await wrapper.instance().componentDidMount();
        // expect(wrapper).toMatchSnapshot('temp snapshot');

        console.info('');
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
]