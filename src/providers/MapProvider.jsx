import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import initialLandmark from './inititalLocation.json'
import { initMap, initPlaces, updateMap, updateMarker } from "../js/initGoogleMaps";


const MapContext = createContext();
export const useMap = () => useContext(MapContext)

export default function MapProvider({ children }) {
    const location = useLocation()
    const [currentLandmark, setCurrentLandmark] = useState(initialLandmark)
    const [landmarks, setLandmarks] = useState({})
    const [place, setPlace] = useState(null)
    const [clickLocation, setClickLocation] = useState(null)

    const mapRef = useRef(null)
    const markerRef = useRef(null)
    const mapElemRef = useRef(null)
    const searchRef = useRef(null)
    const autocompleteRef = useRef(null)

    useEffect(() => {
        initMap(mapRef, mapElemRef, markerRef, currentLandmark, setClickLocation)
        getLandmarks()
    }, [])


    useEffect(() => {

        if (location.pathname === '/create') {
            initPlaces(autocompleteRef, searchRef, mapRef, setPlace)
        } else {
            // mapElemRef?.current?.append(mapRef.current)
            // mapRef?.current?.append(markerRef.current)
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
            place,
            clickLocation
        }}>
            {children}
        </MapContext.Provider>
    );
};