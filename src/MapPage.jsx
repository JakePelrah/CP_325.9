import { useEffect, useState } from 'react'
import Map from './components/Map'
import Sidebar from './components/Sidebar'
import Info from './components/Info'


function App() {

  return (
    <div className='d-flex'>

      <Sidebar />

      <div className='d-flex flex-column m-3'>
        <Map />
        <Info />
      </div>

    </div>
  )
}

export default App
