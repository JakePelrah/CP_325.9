import { useEffect, useRef } from "react"
import { useMap } from "../../providers/MapProvider"
import './home.css'

export default function Home() {
    const { loader, currentLandmark } = useMap()
    const mapRef = useRef(null)
    const markerRef = useRef(null)
    const mapElemRef = useRef(null)

    useEffect(() => {
        initMap()
    }, [])

    function initMap() {
        loader.importLibrary('maps3d')
            .then(async ({ Map3DElement, Marker3DElement }) => {

                mapRef.current = new Map3DElement({
                    center: {
                        lat: 39.66515803,
                        lng: -105.20664675,
                        altitude: currentLandmark.coords.view.altitude
                    },
                    tilt: 55,
                    range: 500,
                    heading: 77.86,
                    defaultLabelsDisabled: true,
                    defaultUIDisabled: true,
                });

                markerRef.current = new Marker3DElement({
                    position: {
                        lat: currentLandmark.coords.marker.latitude,
                        lng: currentLandmark.coords.marker.longitude,
                        altitude: currentLandmark.coords.marker.altitude,
                    },
                    altitudeMode: 'RELATIVE_TO_GROUND',
                    extruded: true,
                    label: currentLandmark.title
                });


                const camera = {
                    center: { lat: 39.66515803, lng: -105.20664675, altitude: 2000 },
                    tilt: 55,
                    range: 500,
                    heading: 77.86
                };

                mapRef.current.flyCameraAround({
                    camera,
                    durationMillis: 10000,
                    rounds: 1
                });

                mapRef?.current?.append(markerRef.current)
                mapElemRef?.current?.append(mapRef.current)
                console.log('Initializing map.')
            })
    }




    return (
        <div id="home-map">
            <div ref={mapElemRef}></div>
        </div>

    )
}