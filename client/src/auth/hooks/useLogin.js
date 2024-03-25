import { useMutation } from '@tanstack/react-query';
import ApiError from 'errors/ApiError';
import { toast } from 'react-toastify';
import { useSessionKey } from './useSessionKey';

const login = async ({
  username, password,
}) => fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
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

const useLogin = () => {
  const { setSessionKey } = useSessionKey();

  const mutation = useMutation({
    mutationFn: login,
    // eslint-disable-next-line no-unused-vars
    onError: (error, variables, context) => {
      toast.error('Account doesn\'t exist, please check your username and password and try again');
      setSessionKey(null);
    },
    // eslint-disable-next-line no-unused-vars
    onSuccess: (data, variables, context) => {
      toast.success(data.responseData.sessionKey);
      setSessionKey(data.responseData.sessionKey);
    },
  });

  return mutation.mutate;
};

export { useLogin };
