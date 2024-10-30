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
    const [landmarksByUser, setLandmarksByUser] = useState([])
    const [currentLandmark, setCurrentLandmark] = useState(initialLandmark)
    const [enableDefaultLabels, setEnableDefaultLabels]= useState(null)

    useEffect(() => {
        getLandmarksByCategory()
        getLandmarksByUser()
    }, [])

    function getLandmarksByCategory() {
        fetch('/getLandmarksByCategory')
            .then(res => res.json())
            .then(setLandmarksByCategory)
    }

    function getLandmarksByUser() {
        fetch('/getLandmarksByUser')
            .then(res => res.json())
            .then(setLandmarksByUser)
    }

    function createLandmark(formData) {
        fetch('/createLandmark', {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(({ inserted, message }) => {
                if (inserted) {
                    getLandmarksByCategory()
                    getLandmarksByUser()
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
            landmarksByUser,
            landmarksByCategory,
            loader,
            setCurrentLandmark,
            currentLandmark,
            removeLandmark,
            updateLandmark,
            createLandmark,
            enableDefaultLabels,
            setEnableDefaultLabels
        }}>
            {children}
        </MapContext.Provider>
    );
};