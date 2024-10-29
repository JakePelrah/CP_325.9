import { BsWikipedia, BsYoutube, BsLink45Deg } from "react-icons/bs";
import './info.css'


export default function Info({ currentLandmark }) {

  return (<div id="info" className="d-flex">

    <div id="description" className="d-flex flex-column mx-3 mt-3">
      <div className="mb-3">
        <span className="title">{currentLandmark.title}  </span>
        <span className="address">- {currentLandmark.address}</span>
      </div>
      <p>
        {currentLandmark.description}
      </p>
    </div>

    <div id="bio" className="d-flex flex-column">
      <img className="info-image" src={`images/${currentLandmark.image_url}`}></img>
      <div className="d-flex justify-content-center gap-3 mt-2">
        <a target="_blank" rel="noopener noreferrer" href={currentLandmark.websites['default']}><BsLink45Deg size={26} /></a>
        <a target="_blank" rel="noopener noreferrer" href={currentLandmark.websites['wikipedia']}><BsWikipedia size={26} /></a>
        <a target="_blank" rel="noopener noreferrer" href={currentLandmark.websites['youtube']}><BsYoutube size={26} /></a>
      </div>
    </div>
  </div>)
}


