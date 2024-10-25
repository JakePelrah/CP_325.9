import { createContext, useContext, useState, useEffect, useRef } from "react";

const LMContext = createContext();
export const useLM = () => useContext(LMContext)

export default function LMProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState({})
    const [landmarks, setLandmarks] = useState({})
    // const [marker, setMarker] = useState(null)
    const mapRef = useRef(null)
    const markerRef = useRef(null)

    const [location, setLocation] = useState(
        {
            "title": "Red Rocks Amphitheatre",
            "description": "Red Rocks Amphitheatre, located just outside Denver, Colorado, is a breathtaking outdoor concert venue renowned for its stunning natural acoustics and dramatic red sandstone formations. Nestled in a picturesque setting, the amphitheater offers a unique blend of natural beauty and artistic performance, attracting world-class musicians and enthusiastic audiences alike. With a seating capacity of approximately 9,500, it provides an intimate experience while showcasing the beauty of the surrounding foothills. Known for its vibrant history, Red Rocks has hosted legendary acts from The Beatles to U2, making it a cherished landmark in the music world and a must-visit destination for music lovers and outdoor enthusiasts.",
            "category": "venue",
            "camera": {
                "tilt": 60,
                "range": 100,
                "heading": 77.86

            },
            "coords": {
                "view": {
                    "latitude": 39.66515803,
                    "longitude": -105.20664675,
                    "altitude": 2000
                },
                "marker": {
                    "latitude": 39.665542801567476,
                    "longitude": -105.20513606834602,
                    "altitude":30
                }
            },
            "created": "2024-10-24T12:34:56-04:00",
            "websites": {
                "wikipedia": "https://en.wikipedia.org/wiki/Red_Rocks_Amphitheatre",
                "default": "https://www.redrocksonline.com/",
                "youtube": "https://www.youtube.com/channel/UCK36AQt-u4CLisfkFtkIxYw"
            },
            "image_url": "redrocks.png",
            "address": "18300 W Alameda Pkwy, Morrison, CO 80465"
        }
    )


    useEffect(() => {
        fetch('http://localhost:3000/isLoggedIn')
            .then(res => res.json())
            .then(setIsLoggedIn)

        init()
        getLandmarks()
    }, [])

    useEffect(() => {
        if (location._id && markerRef.current) {
            markerRef.current.position = {
                lat: location.coords.marker.latitude,
                lng: location.coords.marker.longitude,
                altitude: 30
            }
            markerRef.current.label = location.title
            markerRef.current.altitudeMode = 'RELATIVE_TO_GROUND'
            markerRef.current.extruded = true

            mapRef?.current?.flyCameraTo({
                endCamera: {
                    center: {
                        lat: location.coords.view.latitude,
                        lng: location.coords.view.longitude,
                        altitude: location.coords.marker.altitude
                    },
                    tilt: location.camera.tilt,
                    range: location.camera.range,
                    heading: location.camera.heading
                },
                durationMillis: 5000
            });
        }
    }, [location])



    async function init() {

        const { Map3DElement, Marker3DElement } = await google.maps.importLibrary("maps3d");

        const map = new Map3DElement({
            center: {
                lat: location.coords.view.latitude,
                lng: location.coords.view.longitude,
                altitude: location.coords.view.altitude
            },
            tilt: location.camera.tilt,
            range: location.camera.range,
            heading: location.camera.heading,
            // defaultLabelsDisabled: true,
        });

        const marker = new Marker3DElement({
            position: {
                lat: location.coords.marker.latitude,
                lng: location.coords.marker.longitude,
                altitude: location.coords.marker.altitude,
            },
            altitudeMode: 'RELATIVE_TO_GROUND',
            extruded: true,
            label: location.title
        });

        // references
        markerRef.current = marker
        mapRef.current = map

        // add to map
        map.append(marker)
        document.getElementById('map').append(map)
    }

    function getLandmarks() {
        fetch('/getLandmarks')
            .then(res => res.json())
            .then(setLandmarks)
    }


    function logout() {
        fetch('http://localhost:3000/logout', { method: 'POST' })
            .then(res => res.json())
            .then(({ redirect }) => {
                if (redirect) {
                    setIsLoggedIn({})
                    redirect ? window.location.href = '/' : null
                }
            })
    }

    return (
        <LMContext.Provider value={{
            isLoggedIn, landmarks, logout, location, setLocation
        }}>
            {children}
        </LMContext.Provider>
    );
};