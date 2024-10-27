const GOOGLE_MAP_KEY = import.meta.env.VITE_MAP_KEY;
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
    apiKey: GOOGLE_MAP_KEY,
    version: "alpha",
    libraries: ["maps3d", "places"]
});

export function initPlaces(autocompleteRef, searchRef, mapRef) {

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
                if (!place.geometry || !place.geometry.viewport) {
                    window.alert("No viewport for input: " + place.name);
                    return;
                }
                zoomToViewport(place.geometry, mapRef);
            });
        })
}

function zoomToViewport(geometry, mapRef) {
    if (mapRef.current) {
        mapRef.current.center = { lat: geometry.location.lat(), lng: geometry.location.lng(), altitude: 500 };
        mapRef.current.heading = 0;
        mapRef.current.range = 1000;
        mapRef.current.tilt = 65;
    }
};


export function initMap(mapRef, mapElemRef, markerRef, location) {
    loader.importLibrary('maps3d')
        .then(async ({ Map3DElement, Marker3DElement }) => {

            mapRef.current = new Map3DElement({
                center: {
                    lat: location.coords.view.latitude,
                    lng: location.coords.view.longitude,
                    altitude: location.coords.view.altitude
                },
                tilt: location.camera.tilt,
                range: location.camera.range,
                heading: location.camera.heading,
            });

            markerRef.current = new Marker3DElement({
                position: {
                    lat: location.coords.marker.latitude,
                    lng: location.coords.marker.longitude,
                    altitude: location.coords.marker.altitude,
                },
                altitudeMode: 'RELATIVE_TO_GROUND',
                extruded: true,
                label: location.title
            });
            // add to map
            mapRef?.current?.append(markerRef.current)
            mapElemRef?.current?.append(mapRef.current)
        })
}


export function updateMap(mapRef, location) {
    mapRef?.current?.flyCameraTo({
        endCamera: {
            center: {
                lat: location.coords.view.latitude,
                lng: location.coords.view.longitude,
                altitude: location.coords.view.altitude
            },
            tilt: location.camera.tilt,
            range: location.camera.range,
            heading: location.camera.heading
        },
        durationMillis: 5000
    });
}

// update marker
export function updateMarker(markerRef, location) {
    markerRef.current.position = {
        lat: location.coords.marker.latitude,
        lng: location.coords.marker.longitude,
        altitude: location.coords.marker.altitude
    }
    markerRef.current.label = location.title
    markerRef.current.altitudeMode = 'RELATIVE_TO_GROUND'
    markerRef.current.extruded = true
}
