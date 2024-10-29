import { createRoot } from 'react-dom/client'

// providers
import MapProvider from './providers/MapProvider.jsx';
import UserProvider from './providers/UserProvider.jsx';

// components
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/HomePage/Home.jsx';
import MapPage from './components/MapPage/MapPage.jsx'
import CreatePage from './components/CreatePage/CreatePage.jsx';
import MyLandmarks from './components/MyLandmarksPage/MyLandmarks.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
// react router
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './main.css'


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
        path: "map",
        element: <MapPage />,
      },
      {
        element:<PrivateRoute/>,
        children:[
          {
            path: "create",
            element: <CreatePage />
          },
          {
            path: "myLandmarks",
            element: <MyLandmarks />
          },
        ]
      }
      
     
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
