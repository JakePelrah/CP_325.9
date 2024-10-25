import { createContext, useContext, useState, useEffect } from "react";

const LMContext = createContext();
export const useLM = () => useContext(LMContext)

export default function LMProvider({ children }) {
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
        <LMContext.Provider value={{
            isLoggedIn, logout
        }}>
            {children}
        </LMContext.Provider>
    );
};