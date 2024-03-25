import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 60 * 60 * 1000,
      retryDelay: (attempt) => attempt * 1500,
    },
  },
});

export { queryClient };
