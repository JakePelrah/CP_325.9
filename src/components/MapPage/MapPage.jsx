import { useEffect, useState, useRef } from 'react';
import { useMap } from '../../providers/MapProvider';
import MapNav from '../MapNav/MapNav'
import Info from "../Info/Info";
import './mapPage.css'

export default function MapPage() {
  const { loader, currentLandmark } = useMap()
  const mapRef = useRef(null)
  const markerRef = useRef(null)
  const mapElemRef = useRef(null)

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

      <Info currentLandmark={currentLandmark} />

    </div>
  )
}


