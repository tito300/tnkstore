import product from './product.json';

export default {
    get: jest.fn((url)=>{
        switch (url) {
            case '/api/products/1234':
            return Promise.resolve({ 
                data: product,
            });
            
            default: return Promise.resolve({
                response: {
                    status: 404,
                }
            });
        }
    })
}