export const SET_TEMPORADAS = 'SET_TEMPORADAS'
export const SET_FRUTASYVEGETALES = 'SET_FRUTASYVEGETALES'
export const SET_NOTICIAS = 'SET_NOTICIAS'
export const SET_REGISTROS = 'SET_REGISTROS'
export const SET_TESTIGOS = 'SET_TESTIGOS'

export const setRegistros = registros => dispatch =>{
    dispatch({
        type: SET_REGISTROS,
        payload: registros,
    })
}

export const setTestigos = testigos => dispatch =>{
    dispatch({
        type: SET_TESTIGOS,
        payload: testigos,
    })
}

export const setTemporadas = temporadas => dispatch =>{
    dispatch({
        type: SET_TEMPORADAS,
        payload: temporadas,
    })
}

export const setNoticias = noticias => dispatch =>{
    dispatch({
        type: SET_NOTICIAS,
        payload: noticias,
    })
}
 
export const setFrutasyVegetales = frutasyVegetales => dispatch =>{
    dispatch({
        type: SET_FRUTASYVEGETALES,
        payload: frutasyVegetales,
    })
}
 