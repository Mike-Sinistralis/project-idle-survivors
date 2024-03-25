/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import ApiError from 'errors/ApiError';
import { useMemo } from 'react';
import { useSessionKey } from './useSessionKey';

const getUserDetails = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/getUserDetails`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(response, data);
  }

  return { response, responseData: data };
};

export const getQueryKey = () => ['currentUser'];

export function useGetUserDetails() {
  const {
    sessionKey,
  } = useSessionKey();

  const key = useMemo(() => getQueryKey(), []);

  const query = useQuery({
    queryKey: key,
    queryFn: getUserDetails,
    enabled: !!sessionKey,
  });

  return query?.data?.responseData.user || { ids: [], data: {} };
}
