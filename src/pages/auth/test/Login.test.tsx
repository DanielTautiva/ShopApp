import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../login';
import NextAuth from 'next-auth/next';
import Register from '../register';

jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn() }), 
  signIn: jest.fn(),
}));

describe('Login Page', () => {

  it('renders login form correctly', () => {
    render(<Login />);
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

  it('should submit login form with correct credentials', async () => {
    const { getByText } = render(<Login />);

    // Simular la entrada de datos en los campos de formulario
    userEvent.type(screen.getByPlaceholderText(/email/i), 'julydaza@example.com');
    userEvent.type(screen.getByPlaceholderText(/password/i), '123456');

    await waitFor(() => {  
    });
  });
});


describe('SignUp Page', () => {

  it('renders login form correctly', () => {
    render(<Register />);
        expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
    });

  it('should submit login form with correct credentials', async () => {
    render(<Register />);

    await waitFor(() => {
    });
  });
});


