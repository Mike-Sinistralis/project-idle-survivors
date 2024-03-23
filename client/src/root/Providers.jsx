import StyleRoot from 'common/theme/root';
import Router from 'root/Router';

// This should route to layouts based on the URL path or other app factors. The Layout folder will contain the sub-routing structure for individual layouts.
function Providers() {
  return (
    <>
      <StyleRoot />
      <Router />
    </>
  );
}

export default Providers;
