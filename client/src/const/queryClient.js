import { QueryCache, QueryClient } from '@tanstack/react-query';

import ApiError from 'errors/ApiError';
import { useSessionKey } from 'auth/hooks/useSessionKey';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 60 * 60 * 1000,
      retryDelay: (attempt) => attempt * 1500,
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.status === 401) {
          return false;
        }

        return failureCount < 3;
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (!(error instanceof ApiError)) return;

      if (error.status === 401) {
        if (query.queryKey[0] === 'currentUser') {
          const { setSessionKey } = useSessionKey.getState();

          queryClient.invalidateQueries('currentUser');
          setSessionKey(null);
        }
      }
    },
  }),
});

export { queryClient };
