import { Outlet } from 'react-router-dom';
import MapProvider from './MapProvider';
import UserProvider from './UserProvider';


export default function RRProvider() {
    return (
        <UserProvider>
            <MapProvider>
                <Outlet />
            </MapProvider>
        </UserProvider>
    )
}