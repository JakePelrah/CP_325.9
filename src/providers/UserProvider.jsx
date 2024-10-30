import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();
export const useUser = () => useContext(UserContext)

export default function UserProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState({})

    // check if the user is logged in.
    useEffect(() => {
        fetch('https://psfinal-5d163b773e42.herokuapp.com/isLoggedIn')
            .then(res => res.json())
            .then(setIsLoggedIn)
    }, [])

    // logout user from passport session
    function logout() {
        fetch('https://psfinal-5d163b773e42.herokuapp.com/logout', { method: 'POST' })
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
            isLoggedIn, logout
        }}>
            {children}
        </UserContext.Provider>
    );
};