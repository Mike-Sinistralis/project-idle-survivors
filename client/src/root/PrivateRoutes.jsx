import {
  Route,
  Routes,
} from 'react-router-dom';

import Game from 'game/index';
import UserDetailsObserver from 'auth/components/UserDetailsObserver';
import { useGetUserDetails } from 'auth/hooks/useGetUserDetails';

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
