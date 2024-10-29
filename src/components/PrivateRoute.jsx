import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';

// if user is not logged in, redirect to mapPage
export default function PrivateRoute() {
    const {isLoggedIn} = useUser()
   
    return isLoggedIn.id
        ? <Outlet />
        : <Navigate to="/map" />;
}