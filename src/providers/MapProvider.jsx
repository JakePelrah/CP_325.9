import { createContext, useContext, useState, useEffect, useRef } from "react";
import initialLandmark from './inititalLocation.json'
import { Loader } from '@googlemaps/js-api-loader';
const GOOGLE_MAP_KEY = import.meta.env.VITE_MAP_KEY;

// Initialize Google Maps loader
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

    // Get landmarks when component mounts
    useEffect(() => {
        getLandmarksByCategory()
        getLandmarksByUser()
    }, [])

    // Get landmarks by category
    function getLandmarksByCategory() {
        fetch('/getLandmarksByCategory')
            .then(res => res.json())
            .then(setLandmarksByCategory)
    }

    // Get landmarks by Google id
    function getLandmarksByUser() {
        fetch('/getLandmarksByUser')
            .then(res => res.json())
            .then(setLandmarksByUser)
    }

    // Create a new landmark
    function createLandmark(formData) {
        fetch('/createLandmark', {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(({ inserted, message }) => {
                // If inserted, update landmarks and redirect
                if (inserted) {
                    getLandmarksByCategory()
                    getLandmarksByUser()
                    window.location.href = '/map'
                }
                // Inserted failed, show error
                else {
                    alert("Insertion error", message)
                }
            })
    }

    // Delete landmark
    function removeLandmark(id) {
        fetch('/deleteLandmark', {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': "application/json" }
        }).then(res => res.json())
            .then(({ deleted, message }) => {
                // If deleted, update landmarks
                if (deleted) {
                    getLandmarksByUser()
                    getLandmarksByCategory()
                }
                // If delete failed, show error
                else {
                    alert(message)
                }
            })
    }

    // Patch landmark
    function patchLandmark(id, updatedLandmark) {
        fetch('/patchLandmark', {
            method: 'PATCH',
            body: JSON.stringify({ id, updatedLandmark }),
            headers: { 'Content-Type': "application/json" }
        }).then(res => res.json())
            .then(({ patched, message }) => {
                // If patched, redirect
                if (patched) {
                    console.log(patched)
                    getLandmarksByUser()
                    getLandmarksByCategory()
                    window.location.href = '/map'
                }
                // If patch failed, show error
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