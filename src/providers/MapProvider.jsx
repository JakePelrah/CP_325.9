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
    const [enableDefaultLabels, setEnableDefaultLabels] = useState(null)

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
        fetch('/deleteLandmark', {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': "application/json" }
        }).then(res => res.json())
            .then(({ deleted, message }) => {
                if (deleted) {
                    getLandmarksByUser()
                    getLandmarksByCategory()
                }
                else {
                    alert(message)
                }
            })
    }

    function patchLandmark(id, updatedLandmark) {
        fetch('/patchLandmark', {
            method: 'PATCH',
            body: JSON.stringify({ id, updatedLandmark }),
            headers: { 'Content-Type': "application/json" }
        }).then(res => res.json())
            .then(({ patched, message }) => {
                if (patched) {
                    window.location.href = '/map'
                }
                else {
                    alert('Patch failed:', message)
                }
            })
    }

    return (
        <MapContext.Provider value={{
            landmarksByUser,
            landmarksByCategory,
            loader,
            setCurrentLandmark,
            currentLandmark,
            removeLandmark,
            patchLandmark,
            createLandmark,
            enableDefaultLabels,
            setEnableDefaultLabels,
        }}>
            {children}
        </MapContext.Provider>
    );
};