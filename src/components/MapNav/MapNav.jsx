import { useState } from "react"
import { useMap } from "../../providers/MapProvider";
import { GiMicrophone, GiMusicalNotes, GiTheaterCurtains } from "react-icons/gi";
import { BsPersonCircle } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid'
import './mapNav.css'


export default function MapNav() {
  const { landmarksByCategory, setCurrentLandmark,  setEnableDefaultLabels } = useMap()

  const [categories, _] = useState([
    { name: "artist", icon: BsPersonCircle },
    { name: "genre", icon: GiMusicalNotes },
    { name: "studio", icon: GiMicrophone },
    { name: "venue", icon: GiTheaterCurtains },
  ])

  function Category({ name, data, Icon }) {

    const renderedItems = data?.map(entry =>
      <li onClick={() => setCurrentLandmark(entry)} key={uuidv4()}>
        <a className="dropdown-item">{entry.title}</a>
      </li>)

    return (
      <div className="dropdown">
        <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <Icon size={32} className="me-2" />
          <span className="titlecase">{name}</span>
        </button>
        <ul className="dropdown-menu">
          {renderedItems}
        </ul>
      </div>
    )
  }

  const renderCategories = categories?.map(category =>
    <Category key={uuidv4()}
      name={category.name}
      data={landmarksByCategory[category.name]}
      Icon={category.icon} />)

  return (<div id="map-nav" className="d-flex justify-content-around p-2 align-items-center" >
    <div class="form-check">
      <input onChange={(e)=>setEnableDefaultLabels(!e.target.checked)} class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
        <label class="form-check-label" for="flexCheckDefault">
          Google Markers
        </label>
    </div>
    {renderCategories}
  </div>)
}


