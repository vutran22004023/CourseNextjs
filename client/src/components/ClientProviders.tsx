'use client'; // This directive ensures that the component is only rendered on the client

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { store } from '@/redux/store';
import queryClient from '@/lib/react-query-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { initializeUser } from '../utils/auth';
const ClientProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Initialize user and other side effects
    const dispatch = store.dispatch;
    initializeUser(dispatch);
  }, []);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
};

export default ClientProviders;
