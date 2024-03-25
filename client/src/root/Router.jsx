import { useSessionKey } from 'auth/hooks/useSessionKey';
import PrivateRoutes from 'root/PrivateRoutes';
import PublicRoutes from 'root/PublicRoutes';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function Providers({ isAuthenticated }) {
  return (
    <>
      {isAuthenticated && (
        <PrivateRoutes />
      )}
      {!isAuthenticated && (
        <PublicRoutes />
      )}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </>
  );
}

function Model() {
  const { sessionKey } = useSessionKey();

  const hookProps = {
    isAuthenticated: Boolean(sessionKey),
  };

  return (
    <Providers
      {...hookProps}
    />
  );
}

export default Model;
export { Providers };
