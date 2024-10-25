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

        const { Map3DElement } = await google.maps.importLibrary("maps3d");

        const map = new Map3DElement({
            center: { lat: 39.66515803, lng: -105.20664675, altitude: 2000 },
            tilt: 60,
            range: 500,
            defaultLabelsDisabled: true,
            heading: 77.86
        });

        mapRef.current.append(map);
        map.flyCameraAround({
            camera,
            durationMillis: 6000,
            rounds: 1
        });
    }


    return (
        // <div id="home" className="d-flex flex-column justify-content-center align-items-center">
        //     <span className="text-white fw-bold mb-5">Musical Landmark Map</span>
        //    
        // </div>
        <>
            <div id="homepage-map" ref={mapRef}></div>

            <div id="home-overlay" className="d-flex flex-column justify-content-center align-items-center">
             <span className="text-white fw-bold mb-5">Musical Landmark Map</span>
                <Link id="explore-btn" to='map' className="btn explore-btn">EXPLORE</Link>
            </div>
        </>


    )
}