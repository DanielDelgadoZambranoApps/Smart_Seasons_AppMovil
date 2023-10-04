import { Alert, Linking } from 'react-native'  
import storage from '@react-native-firebase/storage'
import { CheckConnectivity } from './general-functions'

export function getPlatformURI (imagePath) {
  let imgSource = imagePath;
  if (isNaN(imagePath)) {
      imgSource = { uri: imagePath };
      if (Platform.OS == 'android') {
          imgSource.uri = "file:///" + imgSource.uri;
      }
  }
      return imgSource
}

export const getItem = async (fullPath) => {
  const url = await storage().ref(fullPath).getDownloadURL().catch((e) => {
      console.error(e);
    });
  Linking.openURL(url);
  console.log(url);
}

export const listFilesAndDirectories = (pageToken, setListData , setLoading, route , isNews=false, tituloNoticia) => {
  let reference
  if(isNews){
    reference = storage().ref('Noticias/+' +tituloNoticia)
  }else{
    reference = storage().ref(route.params.Nombre)
  }
  
  reference.list({ pageToken }).then((result) => {
    if (result.nextPageToken) {
      return listFilesAndDirectories(
        reference,
        result.nextPageToken
      );
    }
    setListData(result.items);
    setLoading(false);
})}

export function uploadMultipleImagesToStorage  ( setPathMain, paths, id, collectionName="", setHasImage, imageName, setImageName ) {
  let reference
  let task 
  for(const item of paths){
      reference = storage().ref(collectionName + "/" + id + "/" + item.name); 
      task = reference.putFile( item.url );
      task.then(() => {
        console.log('Image uploaded to the bucket!');
    }).catch((e) => {
        console.log('uploading image error => ', e)
    })
  }
  if(setHasImage){
    setHasImage(false)
  }
  if(setPathMain){
    setPathMain("")
  }
  if(setImageName){
    setImageName("")
  }
}

export function uploadImageToStorage  ( pathMain, id, collectionName="", imageName ) {
  let reference
  reference = storage().ref(collectionName + "/" + id + "/" + imageName); // linea de los dioses
  let task =  reference.putFile( pathMain );
   task.then(() => {
      console.log('Image uploaded to the bucket!');
  }).catch((e) => {
      console.log('uploading image error => ', e)
  })
}

export const getFullStorageItemPath = async (collection='', itemId, fileName, imagesUrlsArray, setIsLoading) => {
  const url = await storage().ref(collection + '/' + itemId + "/" + fileName).getDownloadURL().catch((e) => {
      console.error(e);
    })
    imagesUrlsArray.push({url:url})
    if(setIsLoading){
      setIsLoading(false)
    }
  }

export const listFilesAndDirectoriesGeneric = async (pageToken, collection="", id="", setListData) => {
  if(CheckConnectivity()){
    const reference = storage().ref(collection + '/' + id );
    await reference.list({ pageToken }).then((result) => {
      result.items.forEach((ref) => {
      })
      if (result.nextPageToken) {
        return listFilesAndDirectories(
          reference,
          result.nextPageToken
        );
      }
      setListData(result.items)
    });
  } else {
    Alert.alert("No hay Conexion ...", " ", [{ text: "Continuar", onPress: () => {return null}}])
  }
}

export const DeleteEventPictures  =async (pageToken="", id)=>{
  const reference = storage().ref('Eventos' + '/' + id )
    await reference.list({ pageToken }).then((result) => {
      result.items.forEach((ref) => {
      ref.delete()
       console.log('Eliminado de Firebase Storage exitosamente ') 
      })    
    }
  )
}

export const DeleteNewPictures  =async (pageToken="", id)=>{
  const reference = storage().ref('Noticias' + '/' + id )
    await reference.list({ pageToken }).then((result) => {
      result.items.forEach((ref) => {
      ref.delete()
       console.log('Eliminado de Firebase Storage exitosamente ') 
      })    
    }
  )
}