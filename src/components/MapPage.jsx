import { useEffect, useRef } from 'react'
import { BsWikipedia, BsYoutube, BsLink45Deg } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import { useLM } from '../providers/LMProvider';
import MapNav from './MapNav'
import './mapPage.css'

export default function MapPage() {
  const mapRef = useRef(null)
  const mapElem = useRef(null)
  const { isLoggedIn, logout } = useLM()

  useEffect(() => {
    init()
  }, [])

  async function init() {

    const { Map3DElement } = await google.maps.importLibrary("maps3d");

    const map = new Map3DElement({
      center: { lat: 39.66515803, lng: -105.20664675, altitude: 2000 },
      tilt: 60,
      range: 100,
      defaultLabelsDisabled: true,
      heading: 77.86
    });

    mapRef.current.append(map);
    mapElem.current = map


    map.addEventListener('gmp-click', (event) => {
      console.log(event.position);
    });
  }

  return (
    <div className='d-flex flex-column'>

      <div id="nav-overlay" className="d-flex justify-content-between align-items-center">
        <span id="homepage-title" className="m-2">Music Landmarks</span>
        <div className="d-flex">
          <a id="signin-btn" href="http://localhost:3000/login/federated/google" className='btn d-flex align-items-center gap-3'>
            <BsPersonCircle size={32} /> Sign in</a>
          {/* <div ref={modalRef} onClick={openProfileModal} className="d-flex justify-content-center" data-bs-toggle="popover" data-bs-placement="right" data-bs-content="Top popover" >
      {isLoggedIn ? <img id="profile-image" src={isLoggedIn?._json?.picture}></img> :
        <BsPersonCircle size={32} className="me-4" />}
    </div> */}
        </div>
      </div>

      <div id="map" ref={mapRef}></div>

      <div className='d-flex flex-column'>
        <MapNav />
        <Info />
      </div>

    </div>
  )
}

function Info() {

  return (
    <div id="info" className="d-flex m-3">

      <div id="description" className="d-flex flex-column mx-3 mt-3">
        <div className="mb-3">
          <span className="title">Home  </span>
          <span className="address">- 44123 Carrolside Ave, Lancaster, CA</span>
        </div>
        <p>
          Red Rocks Amphitheatre, located just outside Denver, Colorado, is a breathtaking outdoor concert venue renowned for its stunning natural acoustics and dramatic red sandstone formations. Nestled in a picturesque setting, the amphitheater offers a unique blend of natural beauty and artistic performance, attracting world-class musicians and enthusiastic audiences alike. With a seating capacity of approximately 9,500, it provides an intimate experience while showcasing the beauty of the surrounding foothills. Known for its vibrant history, Red Rocks has hosted legendary acts from The Beatles to U2, making it a cherished landmark in the music world and a must-visit destination for music lovers and outdoor enthusiasts.
        </p>
      </div>

      <div id="bio" className="d-flex flex-column">
        <img className="info-image" src="images/RedRocksAMP.png"></img>
        <span className="text text-center">Red Rocks</span>
        <div className="d-flex justify-content-center gap-3 mt-2">
          <a target="_blank" rel="noopener noreferrer" href="https://www.theredrocksamphitheater.com/"><BsLink45Deg size={26} /></a>
          <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Red_Rocks_Amphitheatre"><BsWikipedia size={26} /></a>
          <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCK36AQt-u4CLisfkFtkIxYw"><BsYoutube size={26} /></a>
        </div>
      </div>

    </div>)
}