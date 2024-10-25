import { useEffect, useRef, useState } from "react"
import { Popover } from "bootstrap";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/gi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { useLM } from "./LMProvider";
import { v4 as uuidv4 } from 'uuid'
import './sidebar.css'


export default function Sidebar() {
  const { isLoggedIn, logout } = useLM()
  const modalRef = useRef(null)
  const [categories, setCategories] = useState([
    { name: "Artist", data: ["Jon Anderson"], icon: Icons.GiMicrophone },
    { name: "Genre", data: ["Jon Anderson"], icon: Icons.GiMusicalNotes },
    { name: "Label", data: ["Jon Anderson"], icon: Icons.GiCompactDisc },
    { name: "Songs", data: ["Jon Anderson"], icon: Icons.GiMusicalScore },
    { name: "Venue", data: ["Jon Anderson"], icon: Icons.GiTheaterCurtains }
  ])


  useEffect(() => {

    const button = document.createElement('button')
    button.innerText = 'Logout'
    button.classList.add('btn')

    button.onclick = logout
    modalRef.current = new Popover(modalRef.current, {
      html: true,
      content: button
    })
  }, [])


  function openProfileModal() {

  }



  function Category({ name, data, Icon }) {
    const renderedData = data.map(entry => <li key={uuidv4()}><a href="#" className="category-link link-body-emphasis ms-5 text-decoration-none rounded">{entry}</a></li>)
    return (<li className="mb-2">

      <button className="sidebar-btn btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
        data-bs-toggle="collapse" data-bs-target={`#${name}-collapse`} aria-expanded="false">
        <Icon size={32} className="me-4" />
        <span className="text">{name}</span>
      </button>

      <div className="collapse ms-4" id={`${name}-collapse`}>
        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
          {renderedData}
        </ul>
      </div>
    </li>)
  }


  const renderCategories = categories?.map(category => <Category key={uuidv4()} name={category.name} data={category.data} Icon={category.icon} />)

  return (<div id="sidebar" className="d-flex flex-column" >

    <span className="brand text-center ms-3 my-3 d-flex align-items-center">Musical Landmarks </span>

    <hr />

    <ul className="list-unstyled ps-0 mt-3 ms-4">
      {renderCategories}
    </ul>


    <hr />

    <li className="mb-2">

      <button className="sidebar-btn btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
        data-bs-toggle="collapse" data-bs-target={`#${name}-collapse`} aria-expanded="false">
        <MdFavorite size={32} className="me-4" />
        <span className="text">Favorites</span>
      </button>

      <div className="collapse ms-4" id={`${name}-collapse`}>
        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
          {/* {renderedData} */}
        </ul>
      </div>
    </li>


    <li className="mb-2">
      <Link to="/create" className="sidebar-btn btn  d-inline-flex align-items-center rounded border-0 mb-2"
        aria-expanded="false">
        <FaMapMarkerAlt size={32} className="me-4" />
        <span className="text">Create Landmark</span>
      </Link>
    </li>


    <a id="signin-btn" href="http://localhost:3000/login/federated/google" className='btn d-flex align-items-center gap-3'>
      <BsPersonCircle size={32} /> Sign in</a>

    <div ref={modalRef} onClick={openProfileModal} className="d-flex justify-content-center" data-bs-toggle="popover" data-bs-placement="right" data-bs-content="Top popover" >
      {isLoggedIn ? <img id="profile-image" src={isLoggedIn?._json?.picture}></img> :
        <BsPersonCircle size={32} className="me-4" />}
    </div>

  </div>)
}
