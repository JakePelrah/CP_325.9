import { useEffect, useState } from "react"

export default function EditModal({ modalRef, currentLandmark, patchLandmark }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [defaultURL, setDefaultURL] = useState('')
    const [wikiURL, setWikiURL] = useState('')
    const [youTubeURL, setYouTubeURL] = useState('')

    useEffect(() => {
        setTitle(currentLandmark?.title)
        setDescription(currentLandmark?.description)
        setDefaultURL(currentLandmark?.websites.default)
        setWikiURL(currentLandmark?.websites.wikipedia)
        setYouTubeURL(currentLandmark?.websites.youtube)
    }, [currentLandmark])


    function update(e) {
        e.preventDefault()
        if (title && description && defaultURL && wikiURL && youTubeURL) {
            patchLandmark(currentLandmark._id, {  title,  description, defaultURL, wikiURL, youTubeURL })
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

                    <form>

                        <div class="row">
                            <div class="col">
                                <label for="floatingInput">Landmark Title</label>
                                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" />
                            </div>
                        </div>

                        <div class="row mt-1">

                            <div class="col">
                                <label>Landmark Description</label>
                                <textarea
                                    value={description} onChange={(e) => setDescription(e.target.value)}
                                    style={{ 'height': '10em' }}
                                    class="form-control"></textarea>
                            </div>

                            <div class="col">
                                <div>
                                    <label for="floatingPassword">Default URL</label>
                                    <input value={defaultURL} onChange={(e) => setDefaultURL(e.target.value)} type="text" className="form-control" />
                                </div>
                                <div>
                                    <label for="floatingPassword">Wiki URL</label>
                                    <input value={wikiURL} onChange={(e) => setWikiURL(e.target.value)} type="text" className="form-control" />
                                </div>
                                <div>
                                    <label for="floatingPassword">YouTube URL</label>
                                    <input value={youTubeURL} onChange={(e) => setYouTubeURL(e.target.value)} type="text" className="form-control" />
                                </div>
                            </div>

                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button onClick={(e) => update(e)} type="submit" class="btn btn-primary">Save changes</button>
                </div>

            </div>
        </div>
    </div >)
}


