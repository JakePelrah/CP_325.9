import { createRoot } from 'react-dom/client'
import MapPage from './components/MapPage.jsx'
import Create from './components/CreatePage.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import MapProvider from './providers/MapProvider.jsx';
import UserProvider from './providers/UserProvider.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MapPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "create",
    element: <Create />
  },
]);

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <MapProvider>
      <RouterProvider router={router} />
    </MapProvider>
  </UserProvider>
)
