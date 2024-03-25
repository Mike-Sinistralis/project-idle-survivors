import { useMutation } from '@tanstack/react-query';

import ApiError from 'errors/ApiError';
import { useSessionKey } from 'auth/hooks/useSessionKey';

const logout = async ({
  username, password,
}) => fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username,
    password,
  }),
}).then(async (res) => {
  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(res, data);
  }

  return {
    response: res,
    responseData: data,
  };
});

const useLogout = () => {
  const { setSessionKey } = useSessionKey();

  const mutation = useMutation({
    mutationFn: logout,
    // eslint-disable-next-line no-unused-vars
    onError: (error, variables, context) => {
      setSessionKey(null);
    },
    // eslint-disable-next-line no-unused-vars
    onSuccess: (data, variables, context) => {
      setSessionKey(null);
    },
  });

  return mutation.mutate;
};

export { useLogout };
