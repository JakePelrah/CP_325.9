import { useEffect, useRef } from "react"


export default function Map() {

    const mapRef = useRef(null)
    const mapElem = useRef(null)

    async function init() {

        const { Map3DElement, Marker3DInteractiveElement, Model3DElement, Polygon3DElement } = await google.maps.importLibrary("maps3d");

        const map = new Map3DElement({
            center: { lat: 39.66515803, lng: -105.20664675, altitude: 2000 },
            tilt: 60,
            range:100,
            defaultLabelsDisabled: true,
            heading: 77.86
        });

        mapRef.current.append(map);
        mapElem.current = map

        const polygonOptions = {
            strokeColor: "rgba(255, 0, 255, 0.8)",
            strokeWidth: 4,
            fillColor: "rgba(0, 255, 255, 0.2)",
            extruded: true,
            drawsOccludedSegments: true,
        }

        map.addEventListener('gmp-click', (event) => {
            console.log(event.position);
        });


        const model = new Model3DElement({
            src: 'public/cube.glb',
            position: { lat: 40.7144, lng: -74.0208, altitude: 1000 },
            orientation: { tilt: 0 },
            altitudeMode: 'ABSOLUTE',
            scale: 500
        });

        map.append(model);


        const polygon = new Polygon3DElement(polygonOptions)
        polygon.outerCoordinates = [
            { lat: 40.7144, lng: -74.0208, altitude: 1000 },
            { lat: 40.6993, lng: -74.019, altitude: 1000 },
            { lat: 40.7035, lng: -74.0004, altitude: 1000 },
            { lat: 40.7144, lng: -74.0208, altitude: 1000 }
        ];
        map.append(polygon)

            const positions = [{
                lat: 42.4239163,
                lng: -71.0947209
            }];

            for (const position of positions) {
                const interactiveMarker = new Marker3DInteractiveElement({
                    position,
                    label: 'B.B King Birthplace'
                });
                interactiveMarker.addEventListener('gmp-click', (event) => {
                });
                map.append(interactiveMarker);
            }
    }


    function setNew(e) {
        e.preventDefault()

        const flyToCamera = {
            center: { lat: 42.8584, lng: -71.2945, altitude: 900 },
            tilt: 55,
            range: 1500
        }
        mapElem.current.flyCameraTo({
            endCamera: flyToCamera,
            durationMillis: 5000,
        });
    }

    useEffect(() => {
        // init()
    }, [])


    return (
        <div ref={mapRef}></div>
    )
}