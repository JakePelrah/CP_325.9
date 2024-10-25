import { createContext, useContext, useState, useEffect } from "react";

const LMContext = createContext();
export const useLM = () => useContext(LMContext)

export default function LMProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState({})
    const [landmarks, setLandmarks] = useState({})
    const [location, setLocation] = useState({
        "_id": "671c0c22e1d881679cf2ad2b",
        "title": "Red Rocks Amphitheatre",
        "description": "Red Rocks Amphitheatre, located just outside Denver, Colorado, is a breathtaking outdoor concert venue renowned for its stunning natural acoustics and dramatic red sandstone formations. Nestled in a picturesque setting, the amphitheater offers a unique blend of natural beauty and artistic performance, attracting world-class musicians and enthusiastic audiences alike. With a seating capacity of approximately 9,500, it provides an intimate experience while showcasing the beauty of the surrounding foothills. Known for its vibrant history, Red Rocks has hosted legendary acts from The Beatles to U2, making it a cherished landmark in the music world and a must-visit destination for music lovers and outdoor enthusiasts.",
        "category": "venue",
        "coords": {
            "view": {
                "latitude": 39.66515803,
                "longitude": -105.20664675
            },
            "marker": {
                "latitude": 39.665542801567476,
                "longitude": -105.20513606834602
            }
        },
        "created": "2024-10-24T12:34:56-04:00",
        "websites": {
            "wikipedia": "https://en.wikipedia.org/wiki/Red_Rocks_Amphitheatre",
            "default": "https://www.redrocksonline.com/",
            "youtube": "https://www.youtube.com/channel/UCK36AQt-u4CLisfkFtkIxYw"
        },
        "image_url": "red_rocks.png"
    })


    useEffect(() => {
        fetch('http://localhost:3000/isLoggedIn')
            .then(res => res.json())
            .then(setIsLoggedIn)

        getLandmarks()

    }, [])


    function getLandmarks() {
        fetch('/getLandmarks')
            .then(res => res.json())
            .then(setLandmarks)
    }


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
            isLoggedIn, landmarks, setLocation, location, logout
        }}>
            {children}
        </LMContext.Provider>
    );
};