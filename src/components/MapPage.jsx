import { useMap } from '../providers/MapProvider';
import Navbar from './Navbar'
import MapNav from './MapNav'
import Info  from "./Info";
import './mapPage.css'

export default function MapPage() {
  const { mapElemRef, location } = useMap()

  return (
    <div className='d-flex flex-column'>

      <Navbar />

      <div ref={mapElemRef} id="map"></div>

      <MapNav />
      
      <Info location={location} />

    </div>
  )
}




