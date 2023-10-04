import { SET_TEMPORADAS, SET_FRUTASYVEGETALES, SET_NOTICIAS, SET_REGISTROS, SET_TESTIGOS } from './actions'

const initialState={
    temporadas:'',
    frutasyVegetales:'',
    noticias:'',
    testigos:'',
    registros:'',
}

function temporadasReducer(state=initialState, action){
    switch(action.type) {
        case SET_TEMPORADAS:
            return { ...state, temporadas: action.payload }

        case SET_REGISTROS:
            return { ...state, registros: action.payload }

        case SET_NOTICIAS:
            return { ...state, noticias: action.payload }
            
        case SET_FRUTASYVEGETALES:
            return { ...state, frutasyVegetales: action.payload }
        
        case SET_TESTIGOS:
            return { ...state, testigos: action.payload }

        default:
            return state;
    }
}

export default temporadasReducer;
