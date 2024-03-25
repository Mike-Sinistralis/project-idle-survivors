import {
  Route,
  Routes,
} from 'react-router-dom';

import Game from 'game/index';
import UserDetailsObserver from 'auth/components/UserDetailsObserver';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function Providers() {
  return (
    <>
      <UserDetailsObserver />
      <Routes>
        <Route path="/" element={<Game />} />
      </Routes>
    </>
  );
}

function Model() {
  const hookProps = {

  };

  return (
    <Providers
      {...hookProps}
    />
  );
}

export default Model;
export { Providers };
