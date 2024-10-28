import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();
export const useUser = () => useContext(UserContext)

export default function UserProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState({})

    useEffect(() => {
        fetch('http://localhost:3000/isLoggedIn')
            .then(res => res.json())
            .then(setIsLoggedIn)
    }, [])

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
            isLoggedIn, logout
        }}>
            {children}
        </UserContext.Provider>
    );
};