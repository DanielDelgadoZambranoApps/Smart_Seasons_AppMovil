import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import { getMessageType, get } from '../functions/general-functions'

 export const SaveInStorage = async (key=null, value)=> {
        try{    
            if(key){
                await AsyncStorage.setItem(key, JSON.stringify(value))
                console.log(key + " saved sussesfully !")
            }   
        }catch(error){
            console.log(error)
        }
}

export const GetCollectionSpecificValuesFromAsyncStorage = async (key=null, setData=null, collectionValue) => {
  let genericArray = []
    try {
      const value = await AsyncStorage.getItem(key)
      if (value) {
        for (const item of JSON.parse(value) ){
            genericArray.push(get(item, collectionValue))
        } 
        setData(genericArray)
        return genericArray
      }else{
        console.log("No existe contenido en el AsyncStorage para "+ key )
        return false
      }
    } catch (error) {
      console.log(key + " isn't save in AsyncStorage !")
    }
}

export const GetSpecificValueFromAsyncStorage = async (key=null, setData) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value) {
      console.log("El contenido en el AsyncStorage para "+ key + " es " +  JSON.parse( value) )
      if(setData){
        setData( JSON.parse( value) )
      }
      return  value
    }else{
      console.log("No existe contenido en el AsyncStorage para "+ key )
      return null
    }
  } catch (error) {
    console.log( " No se pudo realizar la buesqueda de "+ key + " en el AsyncStorage")
  }
}

export const GetCollectionFromAsyncStorage = async (key=null, setData=null, firstMessage=false ) => {
  let genericArray = []
    try {
      const value = await AsyncStorage.getItem(key)
      if (value) {
        for (const item of JSON.parse(value) ){
            genericArray.push(item)
        } 
        if(setData){
          setData(genericArray)
        }
        return genericArray
      }else{
        console.log("No existe contenido en el AsyncStorage para "+ key )
        return false
      }
    } catch (error) {
      console.log(key + " isn't save in AsyncStorage !")
    }
  }

  export const deleteRegisterFromAsync =(pendingWork, indexToDelete, update, setUpdate)=> {
    let newPendingWork =[]
    for( const [key, value] of Object.entries(pendingWork)){
      console.log("comparando " + key +" con " + indexToDelete)
      if(!Number(key)  == Number(indexToDelete) ){
        newPendingWork.push(value)
      }
    }
    SaveInStorage('pendingWork', newPendingWork)
    setUpdate(!update)
    Alert.alert("Tarea pendiente eliminada !")
  }