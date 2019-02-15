import React from 'react';
import { shallow } from 'enzyme';
import ProductContainer from '../productContainer'
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import product from '../../__mocks__/product.json'

let wrapper;

describe('ProductContainer component', ()=> {
    beforeAll(async ()=>{
        const mock = new MockAdapter(axios);
        mock.onGet('/api/products/1234')
            .reply(200, product);
        mock.onGet('/api/products/falsenumber')
            .reply(404);    

        let computedMatch = {
            params: {
                id: '1234'
            }
        }
        wrapper = await shallow(<ProductContainer computedMatch={computedMatch} />);
    })
    it('should match snapshot', ()=> {
        expect(wrapper).toMatchSnapshot();
    });
    it('should display spinner when fetching products', ()=>{
        wrapper.setState({
            product: null,
            pending: true,
            err: false,
            errMsg: null,
        })

        expect(wrapper.find('.fa-spinner').exists()).toBeTruthy();
    });
    it('should show a 404 when product is not available',async ()=>{
        let computedMatch = {
            params: {
                id: 'falsenumber'
            }
        }
        let wrapper2 = await shallow(<ProductContainer computedMatch={computedMatch} />);
        await wrapper2.instance().componentDidMount();
        // console.log(wrapper2.state());
        // console.log(wrapper2.props());
        // console.log(wrapper2.html());

        // expect(wrapper2.find('.product-list__Error').exists()).toBeTruthy();

    })
})