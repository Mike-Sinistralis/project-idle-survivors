import { useSessionKey } from 'auth/hooks/useSessionKey';
import { queryClient } from 'const/queryClient';
import { toast } from 'react-toastify';
import { disconnectSocket } from 'websocket';
import { debounce } from 'util/debounce';

const notifyLogout = () => {
  toast.error('You have been logged out due to your session having expired. Please log in again.');
};

const debouncedNotify = debounce(notifyLogout, 350);

const clientLogout = () => {
  const { setSessionKey } = useSessionKey.getState();

  setSessionKey(null);
  disconnectSocket();
  queryClient.invalidateQueries('currentUser');

  debouncedNotify();
};

export default clientLogout;
