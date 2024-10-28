import { useEffect, useState, useRef } from "react"
import { useMap } from "../src/providers/MapProvider"
import "./createPage.css"

export default function Create() {
    const { loader, currentLandmark } = useMap()
    const searchRef = useRef(null)
    const mapRef = useRef(null)
    const mapElemRef = useRef(null)
    const markerRef = useRef(null)
    const [tilt, setTilt] = useState(0)
    const [heading, setHeading] = useState(0)
    const [range, setRange] = useState(0)
    const [roll, setRoll] = useState(0)
    const [altitude, setAltitude] = useState(0)
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [landMarkTitle, setlandMarkTitle] = useState('')
    const [landMarkDescription, setlandMarkDescription] = useState('')


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


                mapRef.current.addEventListener("gmp-centerchange", () => {
                    const { altitude, lat, lng } = mapRef.current.center
                    setAltitude(altitude)
                    setLatitude(lat)
                    setLongitude(lng)
                });

                mapRef.current.addEventListener("gmp-headingchange", () => {
                    setHeading(mapRef.current.heading)
                });

                mapRef.current.addEventListener("gmp-rangechange", () => {
                    setRange(mapRef.current.range)
                });

                mapRef.current.addEventListener("gmp-rollchange", () => {
                    setRoll(mapRef.current.roll)
                });

                mapRef.current.addEventListener("gmp-tiltchange", () => {
                    setTilt(mapRef.current.tilt)
                });

                // on map click
                mapRef.current.addEventListener('gmp-click', async (event) => {

                    // remove old marker
                    if (markerRef.current) {
                        markerRef.current.remove()
                    }

                    // create new marker
                    markerRef.current = new Marker3DElement({
                        position: { lat: event.position.lat, lng: event.position.lng, altitude: altitude + 50 },
                        altitudeMode: 'RELATIVE_TO_GROUND',
                        extruded: true,
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



    function submit(e) {
        e.preventDefault()

        console.log(landMarkDescription, landMarkTitle, markerRef.current)
        markerRef.current.label = landMarkTitle

    }

    return (
        <div className="">
            <div ref={mapElemRef} id="create-map"></div>

            <table id="create-table" className="table">
                <thead>
                    <tr>
                        <th scope="col">Alitude</th>
                        <th scope="col">Latitude</th>
                        <th scope="col">Longitude</th>
                        <th scope="col">Tilt</th>
                        <th scope="col">Heading</th>
                        <th scope="col">Range</th>
                        <th scope="col">Roll</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{altitude?.toFixed(2)}</td>
                        <td>{latitude?.toFixed(2)}</td>
                        <td>{longitude?.toFixed(2)}</td>
                        <td>{tilt?.toFixed(2)}</td>
                        <td>{heading?.toFixed(2)}</td>
                        <td>{range?.toFixed(2)}</td>
                        <td>{roll?.toFixed(2)}</td>
                    </tr>

                </tbody>
            </table>

            <div id="create-form" className="mx-5 px-5">

                <div class="row">
                    <div class="col mb-3">
                        <label for="floatingInput">Search</label>
                        <input className="form-control" ref={searchRef} type="text"></input>
                    </div>

                    <div class="col">
                        <label for="floatingInput">Landmark Title</label>
                        <input value={landMarkTitle} onChange={(e) => setlandMarkTitle(e.target.value)} type="text" className="form-control" />
                    </div>

                </div>

                <div class="row mt-1">
                    <div class="col">
                        <label for="floatingTextarea">Landmark Description</label>
                        <textarea
                            value={landMarkDescription} onChange={(e) => setlandMarkDescription(e.target.value)}
                            style={{ 'height': '6.2em' }}
                            class="form-control"></textarea>

                        <div class="mt-4">
                            <label for="image-upload" className="custom-file-upload">Choose landmark image:</label>
                            <input id="image-upload" type="file" accept="image/png, image/jpeg" />
                        </div>
                    </div>

                    <div class="col">

                        <div class="">
                            <label for="floatingPassword">Wiki URL</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div class="">
                            <label for="floatingPassword">YouTube URL</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>

                </div>

                <div className="mt-3">
                    <button className="btn submit-btn mt-2" onClick={submit}>Create Landmark</button>
                </div>


            </div>
        </div>
    )
}

