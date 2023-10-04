import { Alert } from "react-native"
import ImagePicker from 'react-native-image-crop-picker'
import NetInfo from "@react-native-community/netinfo"
import * as Keychain from 'react-native-keychain'
import RNFetchBlob from 'rn-fetch-blob';

import { GetCollectionSpecificValuesFromFirebase, GetLatestCollectionsData } from '../functions/firebase-firestore-funtions'
import { GetCollectionSpecificValuesFromAsyncStorage, SaveInStorage } from '../storage/storage-functions'
import { uploadImageToStorage } from '../functions/firebase-storage-functions'

export const get = (element, key, nullMessage=null) => {
  if (element) {
      if (element[key]) {
          return element[key]
      }
  }
  return nullMessage
}

export const SaveCredentials = async  (username=null, password=null) =>{
    await Keychain.setGenericPassword(username, password)
} 

export const CredentialsExists = async  () =>{
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
       console.log('Credentials successfully loaded for user ' + credentials.username)
       return true
    } else {
      console.log('No credentials stored')
      return false
    }
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
  }
} 

export const DeleteCredentials = async  () =>{
  await Keychain.resetGenericPassword()
} 

export const CheckConnectivity = () => {
  return NetInfo.fetch().then((response) => {
    if(response.isConnected === true){
    //  console.log("Hay intenet !!")
    //  console.log("Connection type", response.type)
    //  console.log("Is connected?", response.isConnected)
    //  Alert.alert("Hay Internet !!")
      return true

    } else {
    //  console.log("No hay intenet !!")
   //   Alert.alert("No esta conectado a internet ...")
      return false
    }
  })
} 

export const getMessageType = (key) =>{
  let message = ''
        switch(key){
            case'Temporadas'  :
              message = 'Seleccione una Temporada'
            break
            case 'Empresas':
              message = 'Seleccione la Empresa'
            break
            case 'Testigos' :
              message = 'Seleccione el Evento'
            break
            case 'FrutasyVegetales':
              message = 'Seleccione la produccion'
            break
    }
    return message
}

export const GetCollectionSpecificValues = async (collection, setData, collectionValue) =>{
  if(CheckConnectivity()){
    GetCollectionSpecificValuesFromFirebase(collection, collectionValue, setData)
    console.log("contenido sacado de Firebase")
  } else {
    await GetCollectionSpecificValuesFromAsyncStorage(collection, setData, collectionValue)
    Alert.alert("sacado del asyncStorage")
    console.log("contenido sacado del AsyncStorage")
  }
}

export const lauchCameraOrLibrary = (setHasImage, isProfileImage="", id, collection, setImages, navigation, screen= null, update=null, setUpdate=null)=>{
    Alert.alert(
      "Escoga una Opcion ",
      "¿Como quiere escoger la foto ?",
      [
        {
          text: "Cancelar",
          onPress: () => {
            return 
          },
        },
        {
          text: "Seleccionar de la Bibloteca",
          onPress: () => {
            ChooseProfilePick(setHasImage, isProfileImage, id, collection, setImages, navigation, screen, update, setUpdate)
          },
        },
        {
          text: "Tomar Fotografia",
          onPress: () => {
            TakeProfilePick(setHasImage, isProfileImage, id, collection, setImages, navigation, screen, update, setUpdate)
          },
        },
        
      ],
      { cancelable: true }
    )
  }
  
  export const TakeProfilePick = (setHasImage, isProfileImage, id=null, collection, setImages, navigation, screen, update, setUpdate) => {
    ImagePicker.openCamera({
      width: 300,          
      height: 400,          
      cropping: false,      
      multiple:true,
    }).then(image => {
      switch(isProfileImage){
        case "Profile":
          SaveInStorage('ProfilePicturePath', image.path)
          if(setUpdate)  setUpdate(!update)
        break
        case "SeasonPicture":
          let filename = image.path.substring(image.path.lastIndexOf('/') + 1)
          uploadImageToStorage(image.path, id, collection, filename) 
          if(CheckConnectivity()){
            Alert.alert("Contenido subido con exito !")
          }
          
        break
        case "News":
          let imagesArray=[]
              imagesArray.push(image) 
              setImages(imagesArray)
              setHasImage(true)
        break
        case "EventPictures":
          let archiveName = image.path.substring(image.path.lastIndexOf('/') + 1)
          uploadImageToStorage(image.path, id, collection, archiveName) 
          if(navigation) navigation.navigate("Ver Temporadas'")
          if(CheckConnectivity()){
            Alert.alert("Contenido subido con exito !")
          }
        break
        default:
        break
  }
    })
  }
  
  export const ChooseProfilePick = (setHasImage, isProfileImage="", id=null, collection, setImages, navigation, screen, update, setUpdate) => {
     ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      multiple: true
    }).then(images => {

      switch(isProfileImage){
        case "Profile":
          SaveInStorage('ProfilePicturePath', images['0'].path)
          if(setUpdate)  setUpdate(!update)
        break
        case "News":
            setImages(images)
            setHasImage(true)
        break
        case "EventPictures":
          let archiveName
          for(const image of images){
            archiveName = image.path.substring(image.path.lastIndexOf('/') + 1)
            uploadImageToStorage(image.path, id, collection, archiveName) 
          }
          if(CheckConnectivity()){
            Alert.alert("Contenido subido con exito !")
          }
        break
        default:
        break
      }
    });
  }

export const UpdateAllInternMemory =(dispatch, colection1=true, colection2=true, colection3=true, colection4=true, colection5=true)=>{
  if(CheckConnectivity()){
    if(colection1) GetLatestCollectionsData('FrutasyVegetales', dispatch)
    if(colection2) GetLatestCollectionsData('Temporadas', dispatch)
    if(colection3) GetLatestCollectionsData('Noticias', dispatch)
    if(colection4) GetLatestCollectionsData('Registros', dispatch)
    if(colection5) GetLatestCollectionsData('Testigos', dispatch)
  }
}

export const downloadImageWhitRNFetchBlob= async (url, setLogoImage)=>{
    const fs = RNFetchBlob.fs;
    let imagePath = null;
   await  RNFetchBlob.config({
      fileCache: true
    })
    .fetch("GET", url)
    .then(resp => {
    imagePath = resp.path();
    return resp.readFile("base64");
  })
  .then(base64Data => {
    setLogoImage(base64Data)
    return fs.unlink(imagePath);
  })
}

export const downloadImagesWhitRNFetchBlob= async (imagesArray, setImagesEventsData)=>{

  let imagesUrlsArray = []

  for (const image of imagesArray){
    let fs = RNFetchBlob.fs
    let imagePath = null
    await  RNFetchBlob.config({
      fileCache: true
    })
    .fetch("GET", image.url)
    .then(resp => {
    imagePath = resp.path();
    return resp.readFile("base64");
    })
    .then(base64Data => {
      imagesUrlsArray.push(base64Data)
      return fs.unlink(imagePath);
    })
  }
  setImagesEventsData(imagesUrlsArray)
}

