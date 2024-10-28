import { createRoot } from 'react-dom/client'
// providers
import MapProvider from './providers/MapProvider.jsx';
import UserProvider from './providers/UserProvider.jsx';
// components

import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import MapPage from './components/MapPage.jsx'
import MyLandmarks from './components/MyLandmarks.jsx';
import ErrorPage from './components/ErrorPage.jsx';
// react router
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/map",
        element: <MapPage />,
      },
      {
        path: "myLandmarks",
        element: <MyLandmarks />
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <MapProvider>
      <RouterProvider router={router} />
    </MapProvider>
  </UserProvider>
)
