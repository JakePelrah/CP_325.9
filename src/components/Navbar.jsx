import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { useUser } from '../providers/UserProvider';

import './navbar.css'

export default function Navbar() {
  const { isLoggedIn, logout } = useUser()


    return (<nav class="d-flex justify-content-between align-items-center p-2">

        <span id="navbar-title">Music Landmarks</span>

        <div>
            {isLoggedIn._id
                ? <div class="dropdown">
                    <button id="profile-toggle" class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img id="profile-image" src={isLoggedIn?._json?.picture}></img>
                    </button>
                    <ul class="dropdown-menu">
                        <Link className="dropdown-item" to='create'>Create</Link>
                        <Link className="dropdown-item" to='profile'>Profile</Link>
                        <li><a class="dropdown-item" onClick={logout} >Logout</a></li>
                    </ul>
                </div>
                : <a id="signin-btn" href="http://localhost:3000/login/federated/google" className='btn d-flex align-items-center gap-3'>
                    <BsPersonCircle size={32} /> Sign in
                </a>
            }
        </div>
    </nav>)

}