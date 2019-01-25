import { shallow } from 'enzyme';
import React from 'react';
import ProductImage from '../productImage';

let wrapper;

describe('ProductImage Component', ()=> {
    beforeAll(()=>{
        let props = {
            product: { secondaryPhotos: [
                {link: 'img/1.jpg', color: 'red'}, 
                {link: 'img/2.jpg', color: 'grey'}
            ],
        }, 
            activePicture: 'randompicture',  
        }
        wrapper = shallow(<ProductImage {...props} />);
    })
    it('should match snapshot', ()=>{
        expect(wrapper).toMatchSnapshot();
    })
    
    it('should display next picture in line when next is clicked', ()=>{
        wrapper.find('.next-pic').simulate('click', { 
            target: {
                className: 'next-pic'
            }
         });
        expect(wrapper.find('#mainPhoto').prop('src')).toBe('/img/1.jpg');

        wrapper.find('.next-pic').simulate('click', { 
            target: {
                className: 'next-pic'
            }
         });
        expect(wrapper.find('#mainPhoto').prop('src')).toBe('/img/2.jpg');
    })
    it('should display previous picture in line when prev-pic is clicked', ()=>{
        wrapper.setState({
            mainPhoto: {
                currentIndex: 0,
                error: false,
                link: 'randompicture',
                originalPhoto: 'randompicture'
            }
        })

        wrapper.find('.prev-pic').simulate('click', { 
            target: {
                className: 'prev-pic'
            }
         });

        expect(wrapper.find('#mainPhoto').prop('src')).toBe('/img/2.jpg');

        wrapper.find('.prev-pic').simulate('click', { 
            target: {
                className: 'prev-pic'
            }
         });

         expect(wrapper.find('#mainPhoto').prop('src')).toBe('/img/1.jpg');

    })

    it('should display default photo if no secondary is available', ()=>{
        wrapper.setState({
            photos: [],
        })
        expect(wrapper.find('.galleryPhoto').prop('src')).toContain('randompicture')
    })

    it('should display not available when img onError occure', ()=>{
        wrapper.find('#mainPhoto').prop('onError')({ 
            target: {
                id: 'mainPhoto',
            }
        })
        expect(wrapper.find('.photo-error').exists()).toBe(true);
    })
})