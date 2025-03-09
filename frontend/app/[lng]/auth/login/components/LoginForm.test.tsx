import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { useRouter } from 'next/navigation';
import { store } from '@/store/store';
import { LoginForm } from './LoginForm';
import * as authThunks from '@/store/features/auth/authThunks';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/app/i18n/client', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('@/store/features/auth/authThunks', () => ({
    loginUser: Object.assign(jest.fn(), {
      pending: 'auth/loginUser/pending',
      fulfilled: 'auth/loginUser/fulfilled',
      rejected: 'auth/loginUser/rejected',
    }),
    registerUser: Object.assign(jest.fn(), {
      pending: 'auth/registerUser/pending',
      fulfilled: 'auth/registerUser/fulfilled',
      rejected: 'auth/registerUser/rejected',
    }),
    logoutUser: Object.assign(jest.fn(), {
      pending: 'auth/logoutUser/pending',
      fulfilled: 'auth/logoutUser/fulfilled',
      rejected: 'auth/logoutUser/rejected',
    }),
    fetchCurrentUser: Object.assign(jest.fn(), {
      pending: 'auth/fetchCurrentUser/pending',
      fulfilled: 'auth/fetchCurrentUser/fulfilled',
      rejected: 'auth/fetchCurrentUser/rejected',
    }),
  }));
  

describe('LoginForm', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (authThunks.loginUser as unknown as jest.Mock).mockImplementation(() =>
      () => Promise.resolve({ type: 'auth/loginUser/fulfilled', payload: {} })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <LoginForm lng="en" />
      </Provider>
    );

  test('renders the login form correctly', () => {
    renderComponent();

    expect(screen.getByPlaceholderText('name@transact.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('********')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('validates email input and shows error message', async () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText('name@transact.com'), {
      target: { value: 'invalid-email' },
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('pages.login.form.errors.email')).toBeInTheDocument();
    });
  });

  test('calls loginUser with correct credentials and redirects on success', async () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText('name@transact.com'), {
      target: { value: 'user@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('********'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(authThunks.loginUser).toHaveBeenCalledWith({
        email: 'user@test.com',
        password: 'password123',
      });
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/en/dashboard');
    });
  });
});
