import { createRoot } from 'react-dom/client'
import Home from './components/HomePage.jsx';
import App from './MapPage.jsx'
import Create from './components/CreatePage.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import LMProvider from './components/LMProvider.jsx';
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
    element: <App />
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
