import { createRoot } from 'react-dom/client'
import MapPage from './components/MapPage.jsx'
import Profile from './components/Profile.jsx';
import Create from './components/CreatePage.jsx';

import ErrorPage from './components/ErrorPage.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import MapProvider from './providers/MapProvider.jsx';
import UserProvider from './providers/UserProvider.jsx';
import RRProvider from './providers/RRProvider.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RRProvider />,
    children: [
      {
        path: "/",
        element: <MapPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "create",
        element: <Create />
      },
      {
        path: "profile",
        element: <Profile />
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
