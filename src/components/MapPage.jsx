import { useEffect, useState, useRef } from 'react';
import { useMap } from '../providers/MapProvider';
import MapNav from './MapNav'
import Info from "./Info";
import './mapPage.css'

export default function MapPage() {
  const { loader, currentLandmark } = useMap()
  const mapRef = useRef(null)
  const markerRef = useRef(null)
  const mapElemRef = useRef(null)
  const [tilt, setTilt] = useState(0)
  const [heading, setHeading] = useState(0)
  const [range, setRange] = useState(0)
  const [roll, setRoll] = useState(0)
  const [altitude, setAltitude] = useState(0)
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)



  useEffect(() => {
    initMap()
  }, [])

  useEffect(() => {
    if (currentLandmark._id && markerRef.current) {
      updateMap()
      updateMarker()
    }
  }, [currentLandmark])

  function initMap() {
    loader.importLibrary('maps3d')
      .then(async ({ Map3DElement, Marker3DElement }) => {

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

        mapRef.current.addEventListener("gmp-click", (event) => {
          console.log(JSON.stringify(event.position))
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

        mapRef?.current?.append(markerRef.current)
        mapElemRef?.current?.append(mapRef.current)
        console.log('Initializing map.')
      })
  }


  function updateMap() {
    mapRef?.current?.flyCameraTo({
      endCamera: {
        center: {
          lat: currentLandmark.coords.view.latitude,
          lng: currentLandmark.coords.view.longitude,
          altitude: currentLandmark.coords.view.altitude
        },
        tilt: currentLandmark.camera.tilt,
        range: currentLandmark.camera.range,
        heading: currentLandmark.camera.heading
      },
      durationMillis: 5000
    });
  }

  // update marker
  function updateMarker() {
    markerRef.current.position = {
      lat: currentLandmark.coords.marker.latitude,
      lng: currentLandmark.coords.marker.longitude,
      altitude: currentLandmark.coords.marker.altitude
    }
    markerRef.current.label = currentLandmark.title
    markerRef.current.altitudeMode = 'RELATIVE_TO_GROUND'
    markerRef.current.extruded = true
  }


  return (
    <div className='d-flex flex-column'>


      <div ref={mapElemRef} id="map"></div>
      <MapNav />
      <Info currentLandmark={currentLandmark} tilt={tilt}
        heading={heading}
        range={range}
        roll={roll}
        altitude={altitude}
        latitude={latitude}
        longitude={longitude} />

    </div>
  )
}


