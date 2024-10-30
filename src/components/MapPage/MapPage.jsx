import { useEffect, useRef } from 'react';
import { useMap } from '../../providers/MapProvider';
import MapNav from '../MapNav/MapNav'
import Info from "../Info/Info";
import './mapPage.css'

export default function MapPage() {
  const { loader, currentLandmark, enableDefaultLabels } = useMap()
  const mapRef = useRef(null)
  const markerRef = useRef(null)
  const mapElemRef = useRef(null)

  // Initialize 3D map
  useEffect(() => {
    initMap()
  }, [])

  // Updare map and marker when landmark changes
  useEffect(() => {
    if (currentLandmark._id && markerRef.current) {
      updateMap()
      updateMarker()
    }
  }, [currentLandmark])

  // Toggle default Google labels
  useEffect(()=>{
    if(mapRef.current){
      mapRef.current.defaultLabelsDisabled = enableDefaultLabels
    }
  },[enableDefaultLabels])

  // Initialize Google map
  function initMap() {
    loader.importLibrary('maps3d')
      .then(async ({ Map3DElement, Marker3DElement }) => {

        // Create reference to Google map
        mapRef.current = new Map3DElement({
          defaultLabelsDisabled: true,
          center: {
            lat: currentLandmark.coords.view.latitude,
            lng: currentLandmark.coords.view.longitude,
            altitude: currentLandmark.coords.view.altitude,
          },
          tilt: currentLandmark.camera.tilt,
          range: currentLandmark.camera.range,
          heading: currentLandmark.camera.heading,
        });

        // Create marker for map
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

        // Add map and marker to DOM
        mapRef?.current?.append(markerRef.current)
        mapElemRef?.current?.append(mapRef.current)
      })
  }

  // Update map location
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

  // Update marker location
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

      <Info currentLandmark={currentLandmark} />

    </div>
  )
}


