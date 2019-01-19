import { shallow } from 'enzyme';
import React from 'react';
import ProductImage from '../productImage';

let wrapper;

describe('ProductImage Component', ()=> {
    beforeAll(()=>{
        let props = {
            product: {secondaryPhotos: ['img/1.jpg', 'img/2.jpg']}, 
            activePicture: 'randompicture', 
            handleSelectPhoto: jest.fn(), 
        }
        wrapper = shallow(<ProductImage {...props} />);
    })
    it('should match snapshot', ()=>{
        expect(wrapper).toMatchSnapshot();
    })
    it('should display default photo if no secondary is available', ()=>{
        wrapper.setProps({
            product: {secondaryPhotos: []},
            activePicture: 'defaultphoto',
        })
        expect(wrapper.find('.galleryPhoto').prop('src')).toContain('defaultphoto')
    })
})