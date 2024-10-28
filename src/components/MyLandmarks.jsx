import { useUser } from "../providers/UserProvider"
import { FaRegEdit, FaTrash } from "react-icons/fa";
import './myLandmarks.css'

export default function MyLandmarks() {
    const { isLoggedIn, userLandmarks } = useUser()

    const renderedLandmarks = userLandmarks.map(lm =>
        <tr>
            <td>{lm.title}</td>
            <td>{lm.category}</td>
            <td><img className="lm-my-landmark-img" src={`images/${lm.image_url}`}></img></td>
            <td>
                <button className="btn my-landmark-btn me-2"><FaRegEdit size={28} /></button>
                <button className="btn my-landmark-btn"><FaTrash size={28} /></button>
            </td>
        </tr>
    )
    return (<div id="my-landmark">
      
        <table class="table mt-5">
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

    </div>)
}

