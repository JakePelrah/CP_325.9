import { createRoot } from 'react-dom/client'
// providers
import MapProvider from './providers/MapProvider.jsx';
import UserProvider from './providers/UserProvider.jsx';
// components
import Navbar from './components/Navbar.jsx';
import MapPage from './components/MapPage.jsx'
import MyLandmarks from './components/MyLandmarks.jsx';
import Create from './components/CreatePage.jsx';
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
        element: <MapPage />,
      },
      {
        path: "create",
        element: <Create />
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
