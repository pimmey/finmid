import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';

import client from './data/client';
import router from './router';

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
