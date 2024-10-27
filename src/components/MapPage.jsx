import { useMap } from '../providers/MapProvider';
import Navbar from './Navbar'
import MapNav from './MapNav'
import Info  from "./Info";
import './mapPage.css'

export default function MapPage() {
  const { mapElemRef, currentLandmark } = useMap()

  return (
    <div className='d-flex flex-column'>

      <Navbar />

      <div ref={mapElemRef} id="map"></div>

      <MapNav />
      
      <Info currentLandmark={currentLandmark} />

    </div>
  )
}






