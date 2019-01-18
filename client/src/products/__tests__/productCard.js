import { shallow } from 'enzyme';
import React from 'react';
import { ProductCard } from '../productCard';
import { createMemoryHistory } from 'history';

let wrapper;

describe('Products components', ()=>{
    beforeAll(()=>{
        let item = {
            title: "random",
            id: '23442',
            discreption: 'sdsdsdsd',
            photo: './img/ssdsdq.jpg'
        }
        let history = createMemoryHistory();

        // they generate on spot and cause problems with snapshot
        delete history.location.key;
        delete history.entries[0].key;

        wrapper = shallow(<ProductCard item={item} i='random' history={history} />);
    })

    it('should render productCard', ()=>{
    
        expect(wrapper).toMatchSnapshot();
    });

    it('should push history when clicked', ()=>{
        wrapper.find('.products__card__img-cont').simulate('click');
        
        expect(wrapper.instance().props.history.action).toBe('PUSH');
    })
})


