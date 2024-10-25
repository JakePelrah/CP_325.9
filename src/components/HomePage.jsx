import { useRef } from "react";
import { Link } from "react-router-dom";
import './home.css'
import { useEffect } from "react";
export default function Home() {
    const mapRef = useRef(null)

    useEffect(() => {
        init()
    }, [])

    async function init() {

        const camera = {
            center: { lat: 39.66515803, lng: -105.20664675, altitude: 2000 },
            tilt: 55,
            range: 500,
            heading: 77.86
        };

        const { Map3DElement, Marker3DElement } = await google.maps.importLibrary("maps3d");

        const map = new Map3DElement({
            center: { lat: 39.66515803, lng: -105.20664675, altitude: 2000 },
            tilt: 60,
            range: 500,
            defaultLabelsDisabled: true,
            defaultUIDisabled:true,
            heading: 77.86
        });
        const marker = new Marker3DElement({
            position: { lat: 39.665542801567476, lng: -105.20513606834602 },
            label: 'Red Rocks Amphitheatre'
        });
        map.append(marker)

        mapRef.current.append(map);
        map.flyCameraAround({
            camera,
            durationMillis: 10000,
            rounds: 1
        });
    }

    return (

        <>
            <div id="homepage-map" ref={mapRef}></div>
            <div id="home-overlay" className="d-flex  justify-content-between align-items-center">
                <span id="homepage-title" className="m-2">Music Landmarks</span>
                <Link id="explore-btn" to='map' className="btn explore-btn m-2 ">EXPLORE</Link>
            </div>
        </>


    )
}