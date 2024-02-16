import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { ProductStoreType, ProductType, ProductTypeList } from 'src/utils/types';
import { Provider } from 'react-redux';
import cartReducer from 'src/store/reducers/cart';
import userReducer from 'src/store/reducers/user';
import { configureStore } from '@reduxjs/toolkit';
import Content from 'src/components/product-single/content';  
import ShoppingCart from 'src/components/shopping-cart';
import Layout from 'src/layout/Main';

const reducer = {
    cart: cartReducer,
    user: userReducer
}

describe('Content Component', () => {

    it('should add product to cart on button click', () => {

        const mockProduct: ProductType = {
            id: '1',
            name: 'Winter Sweater',
            thumb: '80.000',
            price: '1190.900',
            count: 3,
            color: '#000',
            size: 'XL' ,
            currentPrice: '80.000',
            images: ['/images/products/product-1.jpg'], 
            punctuation: {
                countOpinions: 0,
                punctuation: 0,
                votes: []
            },
            reviews: [{
                name: "",
                avatar: "",
                description: "",
                punctuation: 0
            }]
        };
        
        let store = configureStore({ 
            reducer,
        });

        const { getByText } = render(
            <Provider store={store}>
                <Content product={mockProduct} />
            </Provider>
        );
  
        // Simulate clicking Add to cart
        fireEvent.click(getByText('Add to cart'));    
        expect(screen.getByRole('button', { name: 'Add to cart' })).toBeInTheDocument();

    });
}); 


describe('Content Billing and Payment Page', () => {

    it('should router to page billing and payment', () => {

        let store = configureStore({ 
            reducer,
        });

        const { getByText } = render(
            <Provider store={store}>
                <ShoppingCart />
            </Provider>
        );
            
        expect(getByText('Shopping Cart')).toBeInTheDocument();

        // Simulate clicking Add to cart
        fireEvent.click(getByText('Checkout'));    

        expect(getByText('Total cost')).toBeInTheDocument();

    });
});