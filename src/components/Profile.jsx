import { useUser } from "../providers/UserProvider"

export default function Profile() {
    const { isLoggedIn,
        getLandmarksByUser,
        addLandmark,
        removeLandmark,
        updateLandmark } = useUser()


    return (<div>{JSON.stringify(isLoggedIn)}</div>)
}