import { useEffect, useRef } from 'react'
import { BsWikipedia, BsYoutube } from "react-icons/bs";
import Sidebar from './Sidebar'


export default function MapPage() {
  const mapRef = useRef(null)
  const mapElem = useRef(null)

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
    <div className='d-flex'>
      <Sidebar />
      <div className='d-flex flex-column m-3'>
        <div id="map" ref={mapRef}></div>
        <Info />
      </div>

    </div>
  )
}

function Info() {

  return (<div id="info" className="d-flex mt-4">

    <div id="description" className="d-flex flex-column mt-4">
      <div className="mb-3">
        <span className="title">Home  </span>
        <span className="address">- 44123 Carrolside Ave, Lancaster, CA</span>
      </div>

      <p>
        Lorem ipsum odor amet, consectetuer adipiscing elit. Etiam montes ante mus cubilia cras lectus. Tellus vel eget ligula sit; justo cras. Condimentum pellentesque duis amet pharetra molestie odio magnis pharetra. Iaculis mollis dis etiam ullamcorper maximus phasellus faucibus nam orci. Vulputate odio fames litora aenean congue hendrerit nostra sem venenatis.

        Velit felis porttitor id odio odio rutrum. Fames curabitur vestibulum mattis egestas arcu orci potenti curae fames. Aptent consequat feugiat class; nostra pretium posuere parturient. Dictum sodales cursus class massa; maximus finibus aliquet quis. Mus molestie donec in facilisis fringilla. Tempus maecenas nibh integer commodo luctus quis odio non. Litora habitasse pulvinar dapibus finibus sodales consectetur. Rhoncus litora feugiat conubia sagittis ligula in vitae suspendisse viverra. Luctus bibendum nulla magnis hendrerit nunc curae.
      </p>
    </div>

    <div id="bio" className="d-flex flex-column">
      <img className="info-image" src="images/Zappa_16011977_01_300.jpg"></img>
      <span className="text text-center">Frank Zappa</span>

      <div className="d-flex justify-content-center gap-3 mt-2">
        <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Frank_Zappa"><BsWikipedia size={26} /></a>
        <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCj-Qb2d6dJJJtNL4rgr3FNw"><BsYoutube size={26} /></a>
      </div>

    </div>



  </div>)
}