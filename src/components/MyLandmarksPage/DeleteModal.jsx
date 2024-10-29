

export default function DeleteModal({ modalRef, currentLandmark, removeLandmark }) {

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