import { createRoot } from 'react-dom/client'
import Home from './components/HomePage.jsx';
import MapPage from './components/MapPage.jsx'
import Create from './components/CreatePage.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import LMProvider from './providers/LMProvider.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "map",
    element: <MapPage />
  },
  {
    path: "create",
    element: <Create />
  },
]);

createRoot(document.getElementById('root')).render(
  <LMProvider>
    <RouterProvider router={router} />
  </LMProvider>
)
