import { createContext, useContext, useState, useEffect, useRef } from "react";
import initialLocation from './inititalLocation.json'
const GOOGLE_MAP_KEY = import.meta.env.VITE_MAP_KEY;
import { Loader } from '@googlemaps/js-api-loader';


const MapContext = createContext();
export const useMap = () => useContext(MapContext)

export default function MapProvider({ children }) {
    const [location, setLocation] = useState(initialLocation)
    const [landmarks, setLandmarks] = useState({})
    const mapRef = useRef(null)
    const markerRef = useRef(null)
    const mapElemRef = useRef(null)

    useEffect(() => {

        // load map
        const loader = new Loader({
            apiKey: GOOGLE_MAP_KEY,
            version: "alpha",
            libraries: ["maps3d"]
        });

        loader
            .load()
            .then(async (google) => {
                const { Map3DElement, Marker3DElement } = await google.maps.importLibrary("maps3d");

                mapRef.current = new Map3DElement({
                    center: {
                        lat: location.coords.view.latitude,
                        lng: location.coords.view.longitude,
                        altitude: location.coords.view.altitude
                    },
                    tilt: location.camera.tilt,
                    range: location.camera.range,
                    heading: location.camera.heading,
                });

                markerRef.current = new Marker3DElement({
                    position: {
                        lat: location.coords.marker.latitude,
                        lng: location.coords.marker.longitude,
                        altitude: location.coords.marker.altitude,
                    },
                    altitudeMode: 'RELATIVE_TO_GROUND',
                    extruded: true,
                    label: location.title
                });

                // add to map
                mapRef?.current?.append(markerRef.current)
                mapElemRef?.current?.append(mapRef.current)
            })
            .catch(e => {
                alert(e)
            });

        // get landmarks
        getLandmarks()

        // add to map on back button
        window.onpopstate = () => {
            mapRef?.current?.append(markerRef.current)
            mapElemRef?.current?.append(mapRef.current)
        }
    }, [])

    useEffect(() => {
        if (location._id && markerRef.current) {
            updateMap()
            updateMarker()
        }
    }, [location])

    function getLandmarks() {
        fetch('/getLandmarks')
            .then(res => res.json())
            .then(setLandmarks)
    }

    // update map
    function updateMap() {
        mapRef?.current?.flyCameraTo({
            endCamera: {
                center: {
                    lat: location.coords.view.latitude,
                    lng: location.coords.view.longitude,
                    altitude: location.coords.view.altitude
                },
                tilt: location.camera.tilt,
                range: location.camera.range,
                heading: location.camera.heading
            },
            durationMillis: 5000
        });
    }

    // update marker
    function updateMarker() {
        markerRef.current.position = {
            lat: location.coords.marker.latitude,
            lng: location.coords.marker.longitude,
            altitude: location.coords.marker.altitude
        }
        markerRef.current.label = location.title
        markerRef.current.altitudeMode = 'RELATIVE_TO_GROUND'
        markerRef.current.extruded = true
    }

    return (
        <MapContext.Provider value={{
            location,
            setLocation,
            mapElemRef,
            landmarks,
        }}>
            {children}
        </MapContext.Provider>
    );
};