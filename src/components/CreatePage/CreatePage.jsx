import { useEffect, useState, useReducer, useRef } from "react"
import { useMap } from "../../providers/MapProvider"
import { urlReducer, initialURLState, landmarkReducer, initialLandmarkState } from "./createReducers"
import "./createPage.css"

export default function CreatePage() {
    const { loader, currentLandmark } = useMap()
    const searchRef = useRef(null)
    const mapRef = useRef(null)
    const mapElemRef = useRef(null)
    const markerRef = useRef(null)
    const [imageFile, setImageFile] = useState(null)
    const [urlState, dispatchURL] = useReducer(urlReducer, initialURLState);
    const [landmarkState, dispatchLandmark] = useReducer(landmarkReducer, initialLandmarkState);

    useEffect(() => {
        initMap()
        initPlaces()
    }, [])


    useEffect(() => {

        if (landmarkState.markerPosition) {
            // remove old marker
            if (markerRef.current) {
                markerRef.current.remove()
            }

            // create new marker
            const { lat, lng } = landmarkState.markerPosition
            markerRef.current.label = landmarkState.title || 'Landmark Title'
            markerRef.current.position = { lat, lng, altitude: parseFloat(landmarkState.markerAltitude) || 0.0 }
            mapRef.current.append(markerRef.current)
        }
    }, [landmarkState.markerPosition, landmarkState.markerAltitude])


    useEffect(() => {
        if (markerRef.current) {
            markerRef.current.label = landmarkState.title || 'Landmark Title'
        }
    }, [landmarkState.title])

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
                    dispatchLandmark({ type: "SET_LANDMARK_CENTER", payload: mapRef.current.center })
                });

                mapRef.current.addEventListener("gmp-headingchange", () => {
                    dispatchLandmark({ type: "SET_LANDMARK_HEADING", payload: mapRef.current.heading })
                });

                mapRef.current.addEventListener("gmp-rangechange", () => {
                    dispatchLandmark({ type: "SET_LANDMARK_RANGE", payload: mapRef.current.range })
                });

                mapRef.current.addEventListener("gmp-tiltchange", () => {
                    dispatchLandmark({ type: "SET_LANDMARK_TILT", payload: mapRef.current.tilt })
                });

                mapRef.current.addEventListener('gmp-click', (event) => {
                    const { lat, lng, altitude } = event.position
                    dispatchLandmark({ type: "SET_MARKER_POSITION", payload: { lat, lng, altitude } })
                });

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
            dispatchLandmark({ type: "SET_MARKER_ALTITUDE", payload: elevation })
            mapRef.current.center = { lat: geometry.location.lat(), lng: geometry.location.lng(), altitude: elevation + 50 };
            mapRef.current.heading = 0;
            mapRef.current.range = 1000;
            mapRef.current.tilt = 65;
        }
    };

    async function getElevationforPoint(location) {
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

    function submit(e) {
        e.preventDefault()

        const formData = new FormData()
        formData.append('file', imageFile)
        formData.append('landmarkState', JSON.stringify(landmarkState))
        formData.append('urlState', JSON.stringify(urlState))

        fetch('/createLandmark', {
            method: 'POST',
            body: formData
        })
    }

    return (
        <div className="">

            <div ref={mapElemRef} id="create-map"></div>

            <table id="create-table" className="table">
                <thead>
                    <tr>
                        <th scope="col">Search</th>
                        <th scope="col">Marker Altitude</th>
                        <th scope="col">Latitude</th>
                        <th scope="col">Longitude</th>
                        <th scope="col">Alitude</th>
                        <th scope="col">Tilt</th>
                        <th scope="col">Heading</th>
                        <th scope="col">Range</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> <input className="form-control" ref={searchRef} type="text"></input></td>
                        <td>
                            <input className="form-control"
                                value={landmarkState.markerAltitude}
                                onChange={(e) => dispatchLandmark({ type: "SET_MARKER_ALTITUDE", payload: e.target.value })}
                                type="number">
                            </input>
                        </td>
                        <td>{landmarkState.center.lat?.toFixed(2)}</td>
                        <td>{landmarkState.center.lng?.toFixed(2)}</td>
                        <td>{landmarkState.center.altitude?.toFixed(2)}</td>
                        <td>{landmarkState.tilt?.toFixed(2)}</td>
                        <td>{landmarkState.heading?.toFixed(2)}</td>
                        <td>{landmarkState.range?.toFixed(2)}</td>

                    </tr>
                </tbody>
            </table>


            <form onSubmit={submit} className="d-flex justify-content-center gap-5 mx-5">

                <div className="d-flex flex-column flex-fill gap-2">

                    <div>
                        <label for="floatingInput">Title</label>
                        <input
                            value={landmarkState.title}
                            onChange={(e) => dispatchLandmark({ type: "SET_LANDMARK_TITLE", payload: e.target.value })}
                            type="text"
                            className="form-control" required />
                    </div>

                    <div>
                        <label for="floatingInput">Address</label>
                        <input
                            value={landmarkState.address}
                            onChange={(e) => dispatchLandmark({ type: "SET_LANDMARK_ADDRESS", payload: e.target.value })}
                            type="text"
                            className="form-control" required />
                    </div>

                    <div>
                        <label for="floatingTextarea">Description</label>
                        <textarea
                            value={landmarkState.description}
                            onChange={(e) => dispatchLandmark({ type: "SET_LANDMARK_DESCRIPTION", payload: e.target.value })}
                            style={{ 'height': '6em' }}
                            class="form-control" required></textarea>
                    </div>

                </div>

                <div className="d-flex flex-column flex-fill gap-1">

                <label for="floatingPassword">Category</label>
                    <select class="form-select"
                        aria-label="Default select example"
                        onChange={(e) => dispatchLandmark({ type: "SET_LANDMARK_CATEGORY", payload: e.target.value })}
                        required>
                        <option value="">Select category</option>
                        <option value="artist">Artist</option>
                        <option value="genre">Genre</option>
                        <option value="studio">Studio</option>
                        <option value="venue">Venue</option>
                    </select>

                    <div>
                        <label for="floatingPassword">Default URL</label>
                        <input value={urlState.defaultURL} onChange={(e) => dispatchURL({ type: "SET_DEFAULT_URL", payload: e.target.value })} type="text" className="form-control" />
                    </div>

                    <div>
                        <label for="floatingPassword">Wiki URL</label>
                        <input value={urlState.wikiURL} onChange={(e) => dispatchURL({ type: "SET_WIKI_URL", payload: e.target.value })} type="text" className="form-control" />
                    </div>

                    <div>
                        <label for="floatingPassword">YouTube URL</label>
                        <input value={urlState.youTubeURL} onChange={(e) => dispatchURL({ type: "SET_YOUTUBE_URL", payload: e.target.value })} type="text" className="form-control" />
                    </div>

                </div>

                <div className="d-flex flex-column">
                    <div className="">
                            <label for="formFile" class="form-label">Image</label>
                            <input class="form-control" type="file" onChange={(e) => setImageFile(e.target.files[0])} accept="image/png, image/jpeg" required/>
                    </div>

                    <button id="create-btn" type="submit" className="btn mt-5" >Create Landmark</button>

                </div>

            </form>

        </div>
    )
}
