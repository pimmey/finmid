import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { AuthService } from '~/data/__generated__';
import SignIn from '~/screens/SignIn';
import { setToken } from '~/utils/token';

jest.mock('react-hot-toast');
jest.mock('~/utils/token');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock('~/data/__generated__', () => ({
  AuthService: {
    postLogin: jest.fn(),
  },
}));

describe('SignIn Screen', () => {
  const mockNavigate = jest.fn();
  const queryClient = new QueryClient();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    jest.clearAllMocks();
  });

  const renderWithClient = (ui: ReactNode) => {
    return render(
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
    );
  };

  it('renders all fields and elements correctly', () => {
    renderWithClient(<SignIn />);

    expect(screen.getByText('Welcome back!')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('sign-in-button')).toBeInTheDocument();
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
  });

  it('displays validation errors when form fields are invalid and form is submitted', async () => {
    renderWithClient(<SignIn />);

    const button = screen.getByTestId('sign-in-button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('email-error-message')).toBeInTheDocument();
      expect(screen.getByTestId('email-error-message')).toHaveTextContent(
        'email is a required field',
      );
      expect(screen.getByTestId('password-error-message')).toBeInTheDocument();
      expect(screen.getByTestId('password-error-message')).toHaveTextContent(
        'password is a required field',
      );
    });
  });

  it('displays a loading spinner when the form is submitting', async () => {
    (AuthService.postLogin as jest.Mock).mockImplementation(
      () => new Promise(() => {}),
    );

    renderWithClient(<SignIn />);

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'ValidPassword123' },
    });

    fireEvent.click(screen.getByTestId('sign-in-button'));

    await waitFor(() => {
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  it('disables the button when the form is submitting', async () => {
    renderWithClient(<SignIn />);

    (AuthService.postLogin as jest.Mock).mockImplementation(
      () => new Promise(() => {}),
    );

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'ValidPassword123' },
    });
    fireEvent.click(screen.getByTestId('sign-in-button'));

    await waitFor(() => {
      expect(screen.getByTestId('sign-in-button')).toBeDisabled();
    });
  });

  it('handles successful login and navigation', async () => {
    const mockToken = 'test-token';

    (AuthService.postLogin as jest.Mock).mockResolvedValue({
      token: mockToken,
    });

    renderWithClient(<SignIn />);

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'ValidPassword123' },
    });

    fireEvent.click(screen.getByTestId('sign-in-button'));

    await waitFor(() => {
      expect(setToken).toHaveBeenCalledWith(mockToken);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('displays an error message when login fails', async () => {
    const mockErrorData = {
      body: { error: 'Unauthorized', message: 'Incorrect login or password' },
    };

    (AuthService.postLogin as jest.Mock).mockRejectedValue(mockErrorData);

    renderWithClient(<SignIn />);

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'invalid@example.com' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'InvalidPassword' },
    });

    fireEvent.click(screen.getByTestId('sign-in-button'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Unauthorized: Incorrect login or password.',
      );
    });
  });
});
