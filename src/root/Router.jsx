import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import Game from 'game/index';

// This should route to layouts based on the URL path or other app factors. The Layout folder will contain the sub-routing structure for individual layouts.
function Providers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Providers;
