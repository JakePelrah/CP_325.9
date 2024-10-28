import { useEffect, useRef, useState } from "react";
import { useMap } from "../providers/MapProvider";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import './myLandmarks.css'


export default function MyLandmarks() {
    const { landmarks, removeLandmark, updateLandmark } = useMap()
    const editModalRef = useRef(null)
    const removeModalRef = useRef(null)
    const [currentLandmark, setCurrentLandmark] = useState(null)


    useEffect(() => {
        editModalRef.current = new bootstrap.Modal(editModalRef.current)
        removeModalRef.current = new bootstrap.Modal(removeModalRef.current)
    }, [])

    function edit(e, lm) {
        e.preventDefault()
        setCurrentLandmark(lm)
        editModalRef.current.show()
    }

    function remove(e, lm) {
        e.preventDefault()
        setCurrentLandmark(lm)
        removeModalRef.current.show()
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
            <div className="d-flex" id="my-landmarks">

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

            </div>
            <DeleteModal modalRef={removeModalRef} currentLandmark={currentLandmark} removeLandmark={removeLandmark} />
            <EditModal modalRef={editModalRef} currentLandmark={currentLandmark} updateLandmark={updateLandmark} />
        </>
    )
}


function EditModal({ modalRef, currentLandmark, updateLandmark }) {
    const [landMarkTitle, setlandMarkTitle] = useState('')
    const [landMarkDescription, setlandMarkDescription] = useState('')
    const [defaultURL, setDefaultURL] = useState('')
    const [wikiURL, setWikiURL] = useState('')
    const [youTubeURL, setYouTubeURL] = useState('')

    useEffect(() => {
        setlandMarkTitle(currentLandmark?.title)
        setlandMarkDescription(currentLandmark?.description)
        setDefaultURL(currentLandmark?.websites.default)
        setWikiURL(currentLandmark?.websites.wikipedia)
        setYouTubeURL(currentLandmark?.websites.youtube)
    }, [currentLandmark])


    function update(e) {
        e.preventDefault()
        if (landMarkTitle && landMarkDescription && defaultURL && wikiURL && youTubeURL) {
            updateLandmark(currentLandmark._id, {landMarkTitle, landMarkDescription, defaultURL, wikiURL, youTubeURL})
            modalRef.current.hide()
        }
        else {
            alert('Fill out all fields')
        }
    }

    return (<div class="modal" ref={modalRef} tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Editing</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <div id="create-form" >

                        <div class="row">

                            <div class="col">
                                <label for="floatingInput">Landmark Title</label>
                                <input value={landMarkTitle} onChange={(e) => setlandMarkTitle(e.target.value)} type="text" className="form-control" />
                            </div>

                        </div>

                        <div class="row mt-1">
                            <div class="col">
                                <label for="floatingTextarea">Landmark Description</label>
                                <textarea
                                    value={landMarkDescription} onChange={(e) => setlandMarkDescription(e.target.value)}
                                    style={{ 'height': '10em' }}
                                    class="form-control"></textarea>
                            </div>

                            <div class="col">
                                <div class="">
                                    <label for="floatingPassword">Default URL</label>
                                    <input value={defaultURL} onChange={(e) => setDefaultURL(e.target.value)} type="text" className="form-control" />
                                </div>
                                <div class="">
                                    <label for="floatingPassword">Wiki URL</label>
                                    <input value={wikiURL} onChange={(e) => setWikiURL(e.target.value)} type="text" className="form-control" />
                                </div>
                                <div class="">
                                    <label for="floatingPassword">YouTube URL</label>
                                    <input value={youTubeURL} onChange={(e) => setYouTubeURL(e.target.value)} type="text" className="form-control" />
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button onClick={(e) => update(e)} type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div >)
}


function DeleteModal({ modalRef, currentLandmark, removeLandmark }) {

    function remove(e, id) {
        e.preventDefault()
        removeLandmark(id)
        modalRef.current.hide()
    }

    return (<div class="modal" ref={modalRef} tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Delete Landmark: {currentLandmark?.title} ?</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>This action can not be reversed!</p>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <div onClick={(e) => remove(e, currentLandmark._id)} type="button" class="btn btn-primary">Delete</div>
                </div>
            </div>
        </div>
    </div>)
}