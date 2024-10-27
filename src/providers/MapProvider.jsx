import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import initialLandmark from './inititalLocation.json'
import { initMap, initPlaces, updateMap, updateMarker } from "../js/initGoogleMaps";


// https://maps.googleapis.com/maps/api/staticmap?center=40.712776,-74.005974&zoom=19&size=600x300&maptype=satellite&markers=color:red%7Clabel:C%7C40.712776,-74.005974&key=AIzaSyDNJmTSCAiHR0XX9XkW_fSmjk7J6-lJOog
const MapContext = createContext();
export const useMap = () => useContext(MapContext)

export default function MapProvider({ children }) {
    const location = useLocation()
    const [currentLandmark, setCurrentLandmark] = useState(initialLandmark)
    const [landmarks, setLandmarks] = useState({})
    const mapRef = useRef(null)
    const markerRef = useRef(null)
    const mapElemRef = useRef(null)
    const searchRef = useRef(null)
    const autocompleteRef = useRef(null)

    useEffect(() => {
        initMap(mapRef, mapElemRef, markerRef, currentLandmark)
        getLandmarks()
    }, [])

    useEffect(() => {

        mapElemRef?.current?.append(mapRef.current)
        if (location.pathname === '/create') {
            initPlaces(autocompleteRef, searchRef, mapRef)
        } else {
            mapRef?.current?.append(markerRef.current)
        }

    }, [location])

    useEffect(() => {
        if (currentLandmark._id && markerRef.current) {
            updateMap(mapRef, currentLandmark)
            updateMarker(markerRef, currentLandmark)
        }
    }, [currentLandmark])

    function getLandmarks() {
        fetch('/getLandmarks')
            .then(res => res.json())
            .then(setLandmarks)
    }

    return (
        <MapContext.Provider value={{
            currentLandmark,
            setCurrentLandmark,
            mapElemRef,
            landmarks,
            searchRef,
        }}>
            {children}
        </MapContext.Provider>
    );
};