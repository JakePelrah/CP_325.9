import { useEffect, useState, useRef } from "react"
import { useMap } from "../providers/MapProvider"
import "./createPage.css"

export default function CreatePage() {
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
    const [clickPosition, setClickPosition] = useState(null)
    const [landMarkAddress, setlandMarkAddress] = useState(null)
    const [markerAltitude, setMarkerAltitude] = useState(0)

    useEffect(() => {
        initMap()
        initPlaces()
    }, [])


    useEffect(() => {

        if (clickPosition) {
            if (markerRef.current) {
                markerRef.current.remove()
            }
            const { lat, lng, altitude } = clickPosition
            markerRef.current.label = landMarkTitle || 'Landmark Title'

            markerRef.current.position = { lat, lng, altitude: parseFloat(markerAltitude) }
            mapRef.current.append(markerRef.current)
        }
    }, [clickPosition, markerAltitude])


    useEffect(() => {
        if (markerRef.current) {
            markerRef.current.label = landMarkTitle || 'Landmark Title'
        }
    }, [landMarkTitle])

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
                mapRef.current.addEventListener('gmp-click', (event) => setClickPosition(event.position));

                // add map
                mapElemRef?.current?.append(mapRef.current)

                // create new marker 
                markerRef.current = new Marker3DElement({
                    position: { lat: 0, lng: 0, altitude: 0 },
                    altitudeMode: 'RELATIVE_TO_GROUND',
                    extruded: true,
                    label: 'NEW'
                });
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
    async function zoomToViewport(geometry) {
        if (mapRef.current) {
            let elevation = await getElevationforPoint(geometry.location);
            setMarkerAltitude(elevation)
            mapRef.current.center = { lat: geometry.location.lat(), lng: geometry.location.lng(), altitude: elevation + 50 };
            mapRef.current.heading = 0;
            mapRef.current.range = 1000;
            mapRef.current.tilt = 65;
        }
    };

    async function getElevationforPoint(location) {
        const { ElevationService } = await google.maps.importLibrary("elevation");
        // Get place elevation using the ElevationService.
        const elevatorService = new google.maps.ElevationService();
        const elevationResponse = await elevatorService.getElevationForLocations({
            locations: [location],
        });
        if (!(elevationResponse.results && elevationResponse.results.length)) {
            window.alert(`Insufficient elevation data for place: ${place.name}`);
            return;
        }
        const elevation = elevationResponse.results[0].elevation || 10;
        return elevation;
    }

    function submit() {

    }

    return (
        <div className="">

            <div ref={mapElemRef} id="create-map"></div>

            <table id="create-table" className="table">
                <thead>
                    <tr>
                        <th scope="col">Search</th>
                        <th scope="col">Alitude</th>
                        <th scope="col">Latitude</th>
                        <th scope="col">Longitude</th>
                        <th scope="col">Tilt</th>
                        <th scope="col">Heading</th>
                        <th scope="col">Range</th>
                        <th scope="col">Marker Altitude</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> <input className="form-control" ref={searchRef} type="text"></input></td>
                        <td>{altitude?.toFixed(2)}</td>
                        <td>{latitude?.toFixed(2)}</td>
                        <td>{longitude?.toFixed(2)}</td>
                        <td>{tilt?.toFixed(2)}</td>
                        <td>{heading?.toFixed(2)}</td>
                        <td>{range?.toFixed(2)}</td>
                        <td><input value={markerAltitude} onChange={(e) => setMarkerAltitude(e.target.value)} type="number"></input></td>
                    </tr>

                </tbody>
            </table>


            <div className="d-flex justify-content-center gap-5 mx-5">

                <div className="d-flex flex-column flex-fill gap-2">

                    <div>
                        <label for="floatingInput">Landmark Title</label>
                        <input value={landMarkTitle} onChange={(e) => setlandMarkTitle(e.target.value)} type="text" className="form-control" />
                    </div>

                    <div>
                        <label for="floatingInput">Landmark Address</label>
                        <input value={landMarkAddress} onChange={(e) => setlandMarkAddress(e.target.value)} type="text" className="form-control" />
                    </div>

                    <div>
                        <label for="floatingTextarea">Landmark Description</label>
                        <textarea
                            value={landMarkDescription} onChange={(e) => setlandMarkDescription(e.target.value)}
                            style={{ 'height': '6em' }}
                            class="form-control"></textarea>
                    </div>

                </div>

                <div className="d-flex flex-column flex-fill gap-1">


                    <select class="form-select mt-4" aria-label="Default select example">
                        <option selected>Select category</option>
                        <option value="artist">Artist</option>
                        <option value="genre">Genre</option>
                        <option value="studio">Studio</option>
                        <option value="venue">Venue</option>
                    </select>

                    <div>
                        <label for="floatingPassword">Default URL</label>
                        <input type="text" className="form-control" />
                    </div>

                    <div>
                        <label for="floatingPassword">Wiki URL</label>
                        <input type="text" className="form-control" />
                    </div>

                    <div>
                        <label for="floatingPassword">YouTube URL</label>
                        <input type="text" className="form-control" />
                    </div>

                </div>

                <div className="d-flex flex-column">

                    <div className="mt-4 mb-5">
                        <label for="landmark-image" className="custom-file-upload">Choose landmark image:</label>
                        <input type="file" id="landmark-image" accept="image/png, image/jpeg" />
                    </div>

                    <button id="create-btn" className="btn mt-5" onSubmit={submit}>Create Landmark</button>

                </div>

            </div>

        </div>
    )
}
