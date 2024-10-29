export const urlReducer = (state, action) => {
    switch (action.type) {
        case "SET_DEFAULT_URL":
            return { ...state, defaultURL: action.payload };
        case "SET_YOUTUBE_URL":
            return { ...state, youTubeURL: action.payload };
        case "SET_WIKI_URL":
            return { ...state, wikiURL: action.payload };
        default:
            return state;
    }
};

export const initialURLState = {
    defaultURL: 'https://',
    youTubeURL: 'https://',
    wikiURL: 'https://',
};



export const landmarkReducer = (state, action) => {
    console.log(state, action)
    switch (action.type) {
        case "SET_LANDMARK_TITLE":
            return { ...state, landMarkTitle: action.payload };
        case "SET_LANDMARK_ADDRESS":
            return { ...state, landMarkAddress: action.payload };
        case "SET_LANDMARK_DESCRIPTION":
            return { ...state, landMarkDescription: action.payload };
        case "SET_LANDMARK_CATEGORY":
            return { ...state, landMarkCategory: action.payload };
        case "SET_LANDMARK_CENTER":
            return { ...state, center: action.payload };
        case "SET_LANDMARK_TILT":
            return { ...state, tilt: action.payload };
        case "SET_LANDMARK_HEADING":
            return { ...state, heading: action.payload };
        case "SET_LANDMARK_RANGE":
            return { ...state, range: action.payload };
        case "SET_MARKER_ALTITUDE":
            return { ...state, markerAltitude: action.payload };
        case "SET_MARKER_POSITION":
            return { ...state, markerPosition: action.payload };
        default:
            return state;
    }
};
export const initialLandmarkState = {
    landMarkTitle: '',
    landMarkAddress: '',
    landMarkDescription: '',
    landMarkCategory:'',
    center: { lat: 0, lng: 0, altitude: 0 },
    tilt: 0,
    heading: 0,
    range: 0,
    markerAltitude: 0,
    markerPosition: null
};
