import { useEffect, useState, useRef } from "react"
import { useMap } from "../providers/MapProvider"
import "./createPage.css"

export default function Create() {
    const { loader, currentLandmark } = useMap()
    const [place, setPlace] = useState(null)
    const [clickLocation, setClickLocation] = useState(null)
    const searchRef = useRef(null)
    const autocompleteRef = useRef(null)
    const mapRef = useRef(null)
    const mapElemRef = useRef(null)

    useEffect(() => {
        initMap()
        initPlaces()
    }, [])

    function initMap() {
        loader.importLibrary('maps3d')
            .then(async ({ Map3DElement }) => {

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


                mapRef.current.addEventListener('gmp-click', (event) => {
                    setClickLocation(event.position)
                    // Do something with event.position.
                });

                mapElemRef?.current?.append(mapRef.current)
            })
    }

    function initPlaces() {

        loader.importLibrary('places')
            .then(async ({ Autocomplete }) => {

                autocompleteRef.current = new Autocomplete(
                    searchRef.current,
                    {
                        fields: [
                            "geometry",
                            "name",
                            "place_id"
                        ],
                    }
                );

                autocompleteRef.current.addListener("place_changed", () => {
                    const place = autocompleteRef.current.getPlace();
                    setPlace(place)
                    if (!place.geometry || !place.geometry.viewport) {
                        window.alert("No viewport for input: " + place.name);
                        return;
                    }
                    zoomToViewport(place.geometry);
                });
            })
    }

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
            <div className="text-white">{JSON.stringify(place)}</div>
            <div className="text-white">{JSON.stringify(clickLocation)}</div>
        </div>
    )
}