import {setFrutasyVegetales, setTemporadas, setRegistros, setNoticias, setTestigos} from '../redux/actions'

export const SaveInRedux = (collection, param, dispatch ) => {

    switch(collection){
        case 'Temporadas' : 
            dispatch(setTemporadas(JSON.stringify(param) ))
        break
        case 'Registros' : 
            dispatch(setRegistros(JSON.stringify(param) ))
        break
        case 'FrutasyVegetales' : 
            dispatch(setFrutasyVegetales(JSON.stringify(param) ))
        break
        case 'Noticias' : 
            dispatch(setNoticias(JSON.stringify(param) ))
        break
        case 'Testigos' : 
            dispatch(setTestigos(JSON.stringify(param) ))
        break
    }
    console.log(collection + " Guardado exitosamente en Redux")
}
