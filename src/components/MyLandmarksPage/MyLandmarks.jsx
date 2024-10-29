import { useEffect, useRef, useState } from "react";
import { useMap } from "../../providers/MapProvider";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import './myLandmarks.css'

export default function MyLandmarks() {
    const { landmarks, removeLandmark, updateLandmark } = useMap()
    const editModalRef = useRef(null)
    const deleteModalRef = useRef(null)
    const [currentLandmark, setCurrentLandmark] = useState(null)

    // initialize modals
    useEffect(() => {
        editModalRef.current = new bootstrap.Modal(editModalRef.current)
        deleteModalRef.current = new bootstrap.Modal(deleteModalRef.current)
    }, [])

    // on edit
    function edit(e, lm) {
        e.preventDefault()
        setCurrentLandmark(lm)
        editModalRef.current.show()
    }

    // on remove
    function remove(e, lm) {
        e.preventDefault()
        setCurrentLandmark(lm)
        deleteModalRef.current.show()
    }

    const renderedLandmarks = landmarks?.map(lm =>
        <tr>
            <td>{lm.title}</td>
            <td>{lm.category}</td>
            <td><img className="lm-my-landmark-img" src={`images/${lm.image_url}`}></img></td>
            <td>
                <button onClick={(e) => edit(e, lm)} className="btn my-landmark-btn me-2"><FaRegEdit size={28} /></button>
                <button onClick={(e) => remove(e, lm)} className="btn my-landmark-btn"><FaTrash size={28} /></button>
            </td>
        </tr>
    )

    return (
        <>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Category</th>
                            <th scope="col">Image</th>
                            <th scope="col">Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderedLandmarks}
                    </tbody>
                </table>
            <DeleteModal modalRef={deleteModalRef} currentLandmark={currentLandmark} removeLandmark={removeLandmark} />
            <EditModal modalRef={editModalRef} currentLandmark={currentLandmark} updateLandmark={updateLandmark} />
        </>
    )
}


