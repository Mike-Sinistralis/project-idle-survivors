import { useSessionKey } from 'auth/hooks/useSessionKey';
import Private from 'root/PrivateRoutes';
import Public from 'root/PublicRoutes';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function Providers({ isAuthenticated }) {
  return (
    <>
      {isAuthenticated && (
        <Private />
      )}
      {!isAuthenticated && (
        <Public />
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
