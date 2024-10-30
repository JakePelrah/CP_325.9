import { useEffect, useRef, useState } from "react";
import { useMap } from "../../providers/MapProvider";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import './myLandmarks.css'

export default function MyLandmarks() {
    const { landmarksByUser, removeLandmark, patchLandmark } = useMap()
    const [currentLandmark, setCurrentLandmark] = useState(null)
    const editModalRef = useRef(null)
    const deleteModalRef = useRef(null)

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

    const renderedLandmarks = landmarksByUser?.map(lm =>
        <tr>
            <td>{lm.title}</td>
            <td>{lm.category}</td>
            <td><img className="lm-my-landmark-img" src={lm.image_url}></img></td>
            <td>
                <button onClick={(e) => edit(e, lm)} className="btn my-landmark-btn me-2"><FaRegEdit size={28} /></button>
                <button onClick={(e) => remove(e, lm)} className="btn my-landmark-btn"><FaTrash size={28} /></button>
            </td>
        </tr>
    )

    return (
        <div id="my-landmarks">
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
                    <tr>
                        <td className="text-center" colSpan={4}>END OF LIST</td>
                    </tr>
                </tbody>
            </table>
            <DeleteModal modalRef={deleteModalRef} currentLandmark={currentLandmark} removeLandmark={removeLandmark} />
            <EditModal modalRef={editModalRef} currentLandmark={currentLandmark} patchLandmark={patchLandmark} />
        </div>
    )
}


