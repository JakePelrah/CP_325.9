import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();
export const useUser = () => useContext(UserContext)

export default function UserProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState({})
    const [userLandmarks, setUserLandmarks] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/isLoggedIn')
            .then(res => res.json())
            .then(setIsLoggedIn)
    }, [])

    useEffect(() => {
        if (isLoggedIn.id) {
            fetch(`/getLandmarksByUserId/${isLoggedIn.id}`)
                .then(res => res.json())
                .then(setUserLandmarks)
        }
    }, [isLoggedIn])

    function logout() {
        fetch('http://localhost:3000/logout', { method: 'POST' })
            .then(res => res.json())
            .then(({ redirect }) => {
                if (redirect) {
                    setIsLoggedIn({})
                    redirect ? window.location.href = '/' : null
                }
            })
    }

    return (
        <UserContext.Provider value={{
            isLoggedIn, logout, userLandmarks
        }}>
            {children}
        </UserContext.Provider>
    );
};