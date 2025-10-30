import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Details from './pages/Details';
import Checkout from './pages/Checkout';
import Result from './pages/Result';

import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import Failure from './pages/Failure';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'search', element: <SearchResults /> },
      { path: 'details/:id', element: <Details /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'result', element: <Result /> },
      { path: 'failure', element: <Failure /> },
      { path: 'admin', element: <Admin /> },         // Open CRUD
      { path: 'admin-login', element: <AdminLogin /> } // Login-protected flow (token stored)
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

