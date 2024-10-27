import { useEffect, useState, useRef } from "react"
import { useMap } from "../providers/MapProvider"
import "./createPage.css"

export default function Create() {
    const { loader, currentLandmark } = useMap()
    const [landmarkPosition, setLandmarkPostion] = useState(null)
    const searchRef = useRef(null)
    const mapRef = useRef(null)
    const mapElemRef = useRef(null)
    const markerRef = useRef(null)

    useEffect(() => {
        initMap()
        initPlaces()
    }, [])

    function initMap() {
        loader.importLibrary('maps3d')
            .then(async ({ Map3DElement, Marker3DElement }) => {

                // create new map
                mapRef.current = new Map3DElement({
                    center: {
                        lat: currentLandmark.coords.view.latitude,
                        lng: currentLandmark.coords.view.longitude,
                        altitude: currentLandmark.coords.view.altitude
                    },
                    tilt: currentLandmark.camera.tilt,
                    range: currentLandmark.camera.range,
                    heading: currentLandmark.camera.heading,
                });

                // on map click
                mapRef.current.addEventListener('gmp-click', (event) => {
                    const { center, tilt, heading } = mapRef.current
                    setLandmarkPostion({ center, tilt, heading })

                    // remove old marker
                    if (markerRef.current) {
                        markerRef.current.remove()
                    }

                    // create new marker
                    markerRef.current = new Marker3DElement({
                        position: event.position,
                        altitudeMode: 'RELATIVE_TO_GROUND',
                        extruded: true,
                        label: 'TEST'
                    });

                    // add marker to map
                    mapRef.current.append(markerRef.current)
                });

                // add map
                mapElemRef?.current?.append(mapRef.current)
            })
    }

    function initPlaces() {

        loader.importLibrary('places')
            .then(async ({ Autocomplete }) => {

                const autocomplete = new Autocomplete(
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
                    const place = autocomplete.getPlace();
                    // setPlace(place)
                    if (!place.geometry || !place.geometry.viewport) {
                        window.alert("No viewport for input: " + place.name);
                        return;
                    }
                    zoomToViewport(place.geometry);
                });
            })
    }

    // zoom to location
    function zoomToViewport(geometry) {
        if (mapRef.current) {
            mapRef.current.center = { lat: geometry.location.lat(), lng: geometry.location.lng(), altitude: 500 };
            mapRef.current.heading = 0;
            mapRef.current.range = 1000;
            mapRef.current.tilt = 65;
        }
    };

    return (
        <div>
            <div ref={mapElemRef} id="create-map"></div>
            <input className="form-control" ref={searchRef} type="text"></input>
            <div className="text-white">{JSON.stringify(landmarkPosition)}</div>
        </div>
    )
}