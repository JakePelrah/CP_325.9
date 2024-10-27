import { useEffect, useState } from "react"
import { useMap } from "../providers/MapProvider"
import "./createPage.css"

export default function Create() {
    const [searchTerm, setSearchTerm] = useState('')
    const { mapElemRef, searchRef, searchPlace,update  } = useMap()


    useEffect(()=>{
        update()
    },[])

    function search() {
        if (searchTerm) {
            console.log(searchTerm)
            searchPlace(searchTerm)
        }
    }


    return (
        <div>
            <div ref={mapElemRef} id="create-map"></div>
            <input className="form-control" ref={searchRef} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text"></input>
        </div>
    )
}