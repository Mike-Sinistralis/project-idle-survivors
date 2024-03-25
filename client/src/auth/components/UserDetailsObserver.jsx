import { useGetUserDetails } from 'auth/hooks/useGetUserDetails';

// All this component does is mounts a query to the top of the app and keeps our user details fresh, kinda like a daemon
function Model() {
  useGetUserDetails();

  return false;
}

export default Model;
