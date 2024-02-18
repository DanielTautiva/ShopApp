import { render, screen, fireEvent, act, } from '@testing-library/react';
import Login from '../login';
import Register from '../register';
import { signIn } from 'next-auth/react';

jest.mock('next/router', () => ({
  useRouter: () => ({ 
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    prefetch: jest.fn(),
  }), 
  signIn: jest.fn(),
}));

jest.mock('next-auth', () => ({
  ...jest.requireActual('next-auth'),
  getSession: jest.fn(),
  useSession: jest.fn(),
  json: () => Promise.resolve({}),
}));

jest.mock('next-auth/react', () => ({
  signIn: jest.fn().mockResolvedValueOnce({ ok: true, url: '/product/products' }),
}));

global.fetch = jest.fn(() =>
Promise.resolve({
  json: () => Promise.resolve({}),
}),
) as jest.Mock;


describe('Login Page', () => {

  it('renders login form correctly', () => {
    render(<Login />);
      expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

  it('should submit login form with correct credentials', async () => {
    render(<Login/>) 

    await act( async () => {
        fireEvent.change(screen.getByTestId('email-user'), { target: { value: 'julydaza@example.com' } });
        fireEvent.change(screen.getByTestId('password-user'), { target: { value: '123456' } });
     
        // Submit the form
        fireEvent.click( screen.getByTestId('login-button'));
      }); 
      
      
    expect(await screen.findByText('Sign Up')).toBeInTheDocument();

 
  });
});


describe('SignUp Page', () => {

  it('renders login form correctly', () => {
    render(<Register />);
        expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
    });

  it('should submit Register form with correct credentials', async () => {
    render(<Register />);  

    await act( async () => {
        fireEvent.change(screen.getByTestId('name-user'), { target: { value: 'julydaza' } });
        fireEvent.change(screen.getByTestId('address-user'), { target: { value: 'direccion principal' } });
        fireEvent.change(screen.getByTestId('phone-user'), { target: { value: '57 0013210011' } });
        fireEvent.change(screen.getByTestId('email-user'), { target: { value: 'julydaza2@example2.com' } });
        fireEvent.change(screen.getByTestId('password-user'), { target: { value: '1234567' } });
        fireEvent.change(screen.getByTestId('passwordconfirm-user'), { target: { value: '1234567' } });

        // Submit the form
        fireEvent.click(screen.getByTestId('signup-button'));
    }); 
    expect(await screen.findByText('Sign In')).toBeInTheDocument();
  });
});


