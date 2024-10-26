import { BsWikipedia, BsYoutube, BsLink45Deg } from "react-icons/bs";

export default function Info({ location }) {

    return (<div id="info" className="d-flex mx-3">
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
    </div>)
  }
  