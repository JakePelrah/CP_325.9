import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();
export const useUser = () => useContext(UserContext)

export default function UserProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState({})

    // check if the user is logged in.
    useEffect(() => {
        fetch('/isLoggedIn')
            .then(res => res.json())
            .then(setIsLoggedIn)
    }, [])

    // logout user from passport session
    function logout() {
        fetch('/logout', { method: 'POST' })
            .then(res => res.json())
            .then(({ redirect }) => {
                // If logged out, clear state and redirect
                if (redirect) {
                    setIsLoggedIn({})
                    redirect ? window.location.href = '/' : null
                }
            })
    }

    return (
        <UserContext.Provider value={{
            isLoggedIn, logout
        }}>
            {children}
        </UserContext.Provider>
    );
};