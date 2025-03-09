'use client';

import React, { ReactNode, useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store/store';
import { ThemeProvider } from '@/providers/theme-provider';
import { fetchCurrentUser } from '@/store/features/auth/authThunks';

/**
 * Providers is a client component that wraps children in the Redux <Provider>.
 * We can also add other global providers here (e.g. ThemeProvider, etc.)
 */
export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    store.dispatch(fetchCurrentUser())
  }, [])
  return (
    <ReduxProvider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
}
