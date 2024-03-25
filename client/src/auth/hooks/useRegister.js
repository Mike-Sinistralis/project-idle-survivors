import { useMutation } from '@tanstack/react-query';
import ApiError from 'errors/ApiError';
import { toast } from 'react-toastify';

const register = async ({
  username, password,
}) => fetch(`${import.meta.env.VITE_API_URL}/game/register`, {
  method: 'POST',
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

const useRegister = () => {
  // const { mutation: getUserDetails } = useUserDetails();

  const mutation = useMutation({
    mutationFn: register,
    // eslint-disable-next-line no-unused-vars
    onError: (error, variables, context) => {
      toast.error(error.responseData.error || 'Unable to create account');
    },
    // eslint-disable-next-line no-unused-vars
    onSuccess: (data, variables, context) => {
      toast.success(`Created account ${variables.username} successfully. You can now log in.`);
      // execute getUserDetails
    },
  });

  return mutation;
};

export { useRegister };
