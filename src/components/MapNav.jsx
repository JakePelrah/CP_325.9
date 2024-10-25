import { useEffect, useState } from "react"
import * as Icons from "react-icons/gi";
import { v4 as uuidv4 } from 'uuid'
import './mapNav.css'


export default function MapNav() {


  const [categories, setCategories] = useState([
    { name: "Artist", data: ["Jon Anderson"], icon: Icons.GiMicrophone },
    { name: "Genre", data: ["Jon Anderson"], icon: Icons.GiMusicalNotes },
    { name: "Label", data: ["Jon Anderson"], icon: Icons.GiCompactDisc },
    { name: "Songs", data: ["Jon Anderson"], icon: Icons.GiMusicalScore },
    { name: "Venue", data: ["Jon Anderson"], icon: Icons.GiTheaterCurtains },
  ])

  useEffect(() => {

    // const button = document.createElement('button')
    // button.innerText = 'Logout'
    // button.classList.add('btn')

    // button.onclick = logout
    // modalRef.current = new Popover(modalRef.current, {
    //   html: true,
    //   content: button
    // })
  }, [])

  const renderCategories = categories?.map(category =>
    <Category key={uuidv4()} name={category.name} data={category.data} Icon={category.icon} />)

  return (<div id="map-nav" className="d-flex justify-content-around m-3 p-2" >
    {renderCategories}
  </div>)
}

function Category({ name, data, Icon }) {
  const renderedItems = data.map(entry =>
    <li key={uuidv4()}><a class="dropdown-item">{entry}</a></li>)
  return (
    <div class="dropdown">
      <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <Icon size={32} className="me-4" />
        <span>{name}</span>
      </button>
      <ul class="dropdown-menu">
        {renderedItems}
      </ul>
    </div>
  )
}
