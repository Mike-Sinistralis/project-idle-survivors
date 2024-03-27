import {
  Route,
  Routes,
} from 'react-router-dom';

import Game from 'game/index';
import UserDetailsObserver from 'auth/components/UserDetailsObserver';
import { useGetUserDetails } from 'auth/hooks/useGetUserDetails';
import { connectSocket, disconnectSocket } from 'websocket';
import { useEffect } from 'react';

function PrivateRoutes({ isIdentified }) {
  return (
    <>
      <UserDetailsObserver />
      <Routes>
        {isIdentified && (
          <Route path="/" element={<Game />} />
        )}
      </Routes>
    </>
  );
}

function Model() {
  const { userID } = useGetUserDetails();

  useEffect(() => {
    if (userID) {
      connectSocket();
    }

    return () => {
      disconnectSocket();
    };
  }, [userID]);

  const hookProps = {
    isIdentified: !!userID,
  };

  return (
    <PrivateRoutes
      {...hookProps}
    />
  );
}

export default Model;
export { PrivateRoutes };
