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
    const searchRef = useRef(null)
    const autocompleteRef = useRef(null)

    useEffect(() => {

        // load map
        const loader = new Loader({
            apiKey: GOOGLE_MAP_KEY,
            version: "alpha",
            libraries: ["maps3d", "places"]
        });

        loader
            .load()
            .then(async (google) => {
                const { Map3DElement, Marker3DElement } = await google.maps.importLibrary("maps3d");
                const { Autocomplete } = await google.maps.importLibrary("places");

                autocompleteRef.current = Autocomplete



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

    function update() {
        mapRef?.current?.append(markerRef.current)
        mapElemRef?.current?.append(mapRef.current)

        let autocomplete = new autocompleteRef.current(
            searchRef.current,
            {
                fields: [
                    "geometry",
                    "name",
                    "place_id"
                ],
            }
        );
        autocomplete.addListener("place_changed", () => {
            //viewer.entities.removeAll();
            const place = autocomplete.getPlace();
            console.log(place)

            if (!place.geometry || !place.geometry.viewport) {
                window.alert("No viewport for input: " + place.name);
                return;
            }
            zoomToViewport(place.geometry);
        });

        const zoomToViewport = async (geometry) => {

            if (mapRef.current) {
                mapRef.current.center = { lat: geometry.location.lat(), lng: geometry.location.lng(), altitude: 500 };
                mapRef.current.heading = 0;
                mapRef.current.range = 1000;
                mapRef.current.tilt = 65;
            }
        };
    }

    return (
        <MapContext.Provider value={{
            location,
            setLocation,
            mapElemRef,
            landmarks,
            searchRef,
            update
        }}>
            {children}
        </MapContext.Provider>
    );
};