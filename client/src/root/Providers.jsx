import { QueryClientProvider } from '@tanstack/react-query';
import {
  BrowserRouter,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import StyleRoot from 'common/theme/root';
import Router from 'root/Router';
import { queryClient } from 'const/queryClient';

import 'react-toastify/dist/ReactToastify.css';

// This should route to layouts based on the URL path or other app factors. The Layout folder will contain the sub-routing structure for individual layouts.
function Providers() {
  return (
    <>
      <StyleRoot />
      <ToastContainer
        hideProgressBar
      />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </QueryClientProvider>
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
