import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import initialLocation from './inititalLocation.json'
import { initMap, initPlaces, updateMap, updateMarker } from "../js/initGoogleMaps";


const MapContext = createContext();
export const useMap = () => useContext(MapContext)

export default function MapProvider({ children }) {
    const pageLocation = useLocation()
    const [location, setLocation] = useState(initialLocation)
    const [landmarks, setLandmarks] = useState({})
    const mapRef = useRef(null)
    const markerRef = useRef(null)
    const mapElemRef = useRef(null)
    const searchRef = useRef(null)
    const autocompleteRef = useRef(null)

    useEffect(() => {
        initMap(mapRef, mapElemRef, markerRef, location)
        initPlaces(autocompleteRef, searchRef, mapRef)
        getLandmarks()
    }, [])

    useEffect(() => {
        mapRef?.current?.append(markerRef.current)
        mapElemRef?.current?.append(mapRef.current)
    }, [pageLocation])

    useEffect(() => {
        if (location._id && markerRef.current) {
            updateMap(mapRef, location)
            updateMarker(markerRef, location)
        }
    }, [location])

    function getLandmarks() {
        fetch('/getLandmarks')
            .then(res => res.json())
            .then(setLandmarks)
    }

    return (
        <MapContext.Provider value={{
            location,
            setLocation,
            mapElemRef,
            landmarks,
            searchRef,
        }}>
            {children}
        </MapContext.Provider>
    );
};