import React from 'react';

import ProductsFilter from 'src/components/products-filter';
import ProductsContent from 'src/components/products-content';

import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { ProductTypeList } from 'src/utils/types';
import { Provider } from 'react-redux';
import cartReducer from 'src/store/reducers/cart';
import userReducer from 'src/store/reducers/user';
import { configureStore } from '@reduxjs/toolkit';
import ProductItem from 'src/components/product-item';

const reducer = {
    cart: cartReducer,
    user: userReducer
}

describe('ProductsFilter Component', () => {
    it('display types products with correct enlist', () => {
        const { getByLabelText } = render(<ProductsFilter />);

        const productTypes = ['T-Shirts', 'Sweatshirts', 'Tank Tops', 'Dress shirts']; 
        productTypes.forEach((type) => {
          const checkbox = getByLabelText(type);
          expect(checkbox).toBeInTheDocument();
    
          expect(checkbox).not.toBeChecked();
    
          fireEvent.click(checkbox);
    
          expect(checkbox).toBeChecked();
        });
    });

    it('displays sizes checkboxes with correct labels', () => {
        const { getByLabelText } = render(<ProductsFilter />);
        
        const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    
        sizes.forEach(size => {
          const checkbox = getByLabelText(size);
          expect(checkbox).toBeInTheDocument();
        });
    });
});

describe('ProductsContent Component', () => {
  it('renders ProductsContent correctly', () => {
    const { getByText } = render(<ProductsContent />);
    expect(getByText("Women's divers")).toBeInTheDocument();
  });

});

describe('ProductItem component', () => {
    const mockProduct: ProductTypeList = {
      id: '1',
      name: 'Failed to load users',
      price: '1190.900',
      color: '#000',
      currentPrice: '80.000',
      images: ['/images/products/product-1.jpg'],
    };
  
    it('toggles favorite on button click', () => {

        let store = configureStore({ 
            reducer,
          });

        render(
            <Provider store={store}>
                <ProductItem
                    id={mockProduct.id}
                    name={mockProduct.name}
                    price={mockProduct.price}
                    color={mockProduct.color}
                    currentPrice={mockProduct.currentPrice}
                    key={mockProduct.id}
                    images={mockProduct.images}
                />
            </Provider>
        );
    
        expect(screen.getByRole('button')).not.toHaveClass('btn-heart--active');
        fireEvent.click(screen.getByRole('button'));
        expect(screen.getByRole('button')).toHaveClass('btn-heart--active');
      });
});