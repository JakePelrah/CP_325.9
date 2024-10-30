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
    const [landmarksByCategory, setLandmarksByCategory] = useState({})
    const [landmarks, setLandmarks] = useState([])
    const [currentLandmark, setCurrentLandmark] = useState(initialLandmark)

    useEffect(() => {
        getLandmarksByCategory()
        getLandmarks()
    }, [])

    function getLandmarksByCategory() {
        fetch('/getLandmarksByCategory')
            .then(res => res.json())
            .then(setLandmarksByCategory)
    }

    function getLandmarks() {
        fetch('/getLandmarks')
            .then(res => res.json())
            .then(setLandmarks)
    }

    function createLandmark(formData) {
        fetch('/createLandmark', {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(({ inserted, message }) => {
                if (inserted) {
                    getLandmarksByCategory()
                    window.location.href = '/map'
                }
                else {
                    alert("Insertion error", message)
                }
            })
    }

    function removeLandmark(id) {
        console.log(id)
    }

    function updateLandmark(id, update) {
        console.log(id, update)
    }

    return (
        <MapContext.Provider value={{
            landmarks,
            landmarksByCategory,
            loader,
            setCurrentLandmark,
            currentLandmark,
            removeLandmark,
            updateLandmark,
            createLandmark
        }}>
            {children}
        </MapContext.Provider>
    );
};