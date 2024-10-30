import { Link, Outlet, useLocation } from "react-router-dom";
import { useUser } from '../../providers/UserProvider';
import { BsPersonCircle } from "react-icons/bs";
import './navbar.css'

export default function Navbar() {
    const { isLoggedIn, logout } = useUser()
    const location = useLocation()

    return (
        < >
            <nav class="d-flex justify-content-between align-items-center p-2">
                <a class="navbar-brand" href="/">Music Landmarks</a>

                {location.pathname === '/'
                    ? <Link className="btn" to='map' id="explore-btn">Explore</Link>
                    : <div>
                        {isLoggedIn._id
                            ? <div class="dropdown">
                                <button  class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img id="profile-image" src={isLoggedIn?._json?.picture}></img>
                                </button>
                                <ul class="dropdown-menu">
                                    <Link className="dropdown-item" to='create'>Create</Link>
                                    <Link className="dropdown-item" to='myLandmarks'>My Landmarks</Link>
                                    <li><a class="dropdown-item" onClick={logout} >Logout</a></li>
                                </ul>
                            </div>
                            : <a id="signin-btn" href="https://psfinal-5d163b773e42.herokuapp.com/login/federated/google" className='btn d-flex align-items-center gap-3'>
                                <BsPersonCircle size={32} /> Sign in
                            </a>
                        }
                    </div>
                }
            </nav>
            <Outlet />
        </>
    )
}