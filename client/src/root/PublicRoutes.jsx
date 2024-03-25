import {
  Route,
  Routes,
} from 'react-router-dom';

import Login from 'auth/components/Login';

function Providers() {
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
    <Providers
      {...hookProps}
    />
  );
}

export default Model;
export { Providers };
