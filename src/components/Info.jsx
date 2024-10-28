import { BsWikipedia, BsYoutube, BsLink45Deg } from "react-icons/bs";
import './info.css'


export default function Info({ currentLandmark, tilt, heading, range, roll, altitude, latitude,
  longitude }) {

  const hideStats = false

  return (<div id="info" className="d-flex">

    {hideStats ? null :
      <div id="stats">
        <table className="mx-3 mt-3">
          <tbody>
            <tr>
              <td className="fw-bold">Lat:</td>
              <td>{latitude}</td>
            </tr>
            <tr>
              <td className="fw-bold">Lng:</td>
              <td>{longitude}</td>
            </tr>
            <tr>
              <td className="fw-bold">Tlt:</td>
              <td>{tilt?.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="fw-bold">Hdg:</td>
              <td>{heading?.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="fw-bold">Alt:</td>
              <td>{altitude?.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="fw-bold">Rn:</td>
              <td>{range?.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="fw-bold">Rll:</td>
              <td>{roll?.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    }

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


