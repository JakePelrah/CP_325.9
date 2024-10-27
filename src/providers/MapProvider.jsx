import { createContext, useContext, useState, useEffect, useRef } from "react";
import initialLandmark from './inititalLocation.json'
import { Loader } from '@googlemaps/js-api-loader';
const GOOGLE_MAP_KEY = import.meta.env.VITE_MAP_KEY;


const loader = new Loader({
    apiKey: GOOGLE_MAP_KEY,
    version: "alpha",
    libraries: ["maps3d", "places"]
});


const MapContext = createContext();
export const useMap = () => useContext(MapContext)

export default function MapProvider({ children }) {
    const [landmarks, setLandmarks] = useState({})
    const [currentLandmark, setCurrentLandmark] = useState(initialLandmark)

    useEffect(() => {
        getLandmarks()
    }, [])


    function getLandmarks() {
        fetch('/getLandmarks')
            .then(res => res.json())
            .then(setLandmarks)
    }

    return (
        <MapContext.Provider value={{
            landmarks,
            loader,
            setCurrentLandmark,
            currentLandmark
        }}>
            {children}
        </MapContext.Provider>
    );
};