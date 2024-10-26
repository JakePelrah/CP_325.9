import { useEffect, useRef, useState } from 'react'
import { BsWikipedia, BsYoutube, BsLink45Deg } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import { useMap } from '../providers/MapProvider';
import MapNav from './MapNav'
import './mapPage.css'

export default function MapPage() {
  const { mapElemRef, location } = useMap()


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

      <div ref={mapElemRef} id="map"></div>

      <div className='d-flex flex-column'>
        <MapNav />
        <div id="info" className="d-flex m-3">

          <div id="description" className="d-flex flex-column mx-3 mt-3">
            <div className="mb-3">
              <span className="title">{location.title}  </span>
              <span className="address">- {location.address}</span>
            </div>
            <p>
              {location.description}
            </p>
          </div>

          <div id="bio" className="d-flex flex-column">
            <img className="info-image" src={`images/${location.image_url}`}></img>
            <div className="d-flex justify-content-center gap-3 mt-2">
              <a target="_blank" rel="noopener noreferrer" href={location.websites['default']}><BsLink45Deg size={26} /></a>
              <a target="_blank" rel="noopener noreferrer" href={location.websites['wikipedia']}><BsWikipedia size={26} /></a>
              <a target="_blank" rel="noopener noreferrer" href={location.websites['youtube']}><BsYoutube size={26} /></a>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

