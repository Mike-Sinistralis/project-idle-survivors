import {
  Route,
  Routes,
} from 'react-router-dom';

import Login from 'auth/components/Login';

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

function Model() {
  const hookProps = {

  };

  return (
    <PublicRoutes
      {...hookProps}
    />
  );
}

export default Model;
export { PublicRoutes };
