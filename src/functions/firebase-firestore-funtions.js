import { Alert } from 'react-native'  
import firestore from '@react-native-firebase/firestore'; 

import { getMessageType, CheckConnectivity, UpdateAllInternMemory } from '../functions/general-functions'
import { uploadImageToStorage, DeleteEventPictures, DeleteNewPictures } from './firebase-storage-functions'
import { SaveInStorage, GetCollectionFromAsyncStorage } from '../storage/storage-functions'

import { SaveInRedux } from '../redux/redux-functions';

export const GetCollectionSpecificValuesFromFirebase = (collection, value, setData, hasMessage=false) =>{
    const  genericArray = []
        if(hasMessage){
        // genericArray.push( getMessageType(collection))
        }
        firestore().collection(collection).get().then((querySnapshot)=>{              
          querySnapshot.forEach((user) => {
            switch(value){
              case 'temporadaNombre':
                genericArray.push(user.data().temporadaNombre)
                break
              case 'Nombre' :
                genericArray.push(user.data().Nombre)
                break
              case 'TipoProduccion' :
                genericArray.push(user.data().TipoProduccion)
                break
              case 'testigoName':
                genericArray.push(user.data().testigoName)
                break
            }}) 
          setData(genericArray) })
  }

  export const GetCollectionOrderByDate = async (collection, setData) =>{
    if(CheckConnectivity()){
      const subscriber = firestore().collection(collection).orderBy('fecha','desc').onSnapshot(
        (querySnapshot) => {
          let temp = []
          querySnapshot.forEach((documentSnapshot) => {
            let userDetails = {};
            userDetails = documentSnapshot.data();
            userDetails['id'] = documentSnapshot.id;
            temp.push(userDetails);
          })
          setData(temp);
        },
        (error) => {
          console.log('error', error);
        })
        return () => subscriber()  
    } else {
        Alert.alert("info sacado de async")
        console.log(collection  + " sacado desde AsynStorage")
        await GetCollectionFromAsyncStorage(collection, setData, firstMessage)
    }
  }

export const GetCollection = async (collection, setData, firstMessage) =>{
    if(CheckConnectivity()){
      console.log(collection  + " sacado desde Firebase")
      const subscriber = firestore().collection(collection).onSnapshot(
        (querySnapshot) => {
          let temp = []
          querySnapshot.forEach((documentSnapshot) => {
            let userDetails = {};
            userDetails = documentSnapshot.data();
            userDetails['id'] = documentSnapshot.id;
            temp.push(userDetails);
          })
          setData(temp);
        },
        (error) => {
          console.log('error', error);
        })
        return () => subscriber()  
        }
      else{
        Alert.alert("wea sacado de async")
        console.log(collection  + " sacado desde AsynStorage")
        await GetCollectionFromAsyncStorage(collection, setData, firstMessage)
      }
  }

export const GetLatestCollectionsData = (collection, dispatch) =>{ 
  if(collection=='Noticias' || collection=='Registros'){
    const subscriber = firestore().collection(collection).orderBy('fecha','desc').onSnapshot(
      (querySnapshot) => {
        let temp = []
        querySnapshot.forEach((documentSnapshot) => {
          let userDetails = {};
          userDetails = documentSnapshot.data();
          userDetails['id'] = documentSnapshot.id;
          temp.push(userDetails);
        })
        SaveInStorage(collection, temp)
        SaveInRedux(collection, temp, dispatch)
      },
      (error) => {
        console.log('error', error);
      })
      return () => subscriber()
  } else {
    const subscriber = firestore().collection(collection).onSnapshot(
      (querySnapshot) => {
        let temp = [];
        querySnapshot.forEach((documentSnapshot) => {
          let data = {};
          data = documentSnapshot.data();
          data['id'] = documentSnapshot.id;
          temp.push(data)       
        })
        SaveInStorage(collection, temp)
        SaveInRedux(collection, temp, dispatch)
      },
      (error) => {
        console.log('error', error);
      })
    return () => subscriber()
  }
}

export const UploadEventtoFirestore = (testigoName, latitude, longitude, temporadaData ,testigoDescripcion, 
  setTestigoName, setTestigoDescripcion, userID, userMail, userName, pendingWork, dispatch) => {
    const date  = new Date()

    console.log("testigoName -----------> " + testigoName)
    console.log("latitude -----------> " + latitude)
    console.log("longitude -----------> " + longitude)
    console.log("testigoDescripcion -----------> " +testigoDescripcion )
    console.log("temporadaData -----------> " + JSON.stringify(temporadaData) )
   

    if (!testigoName || !latitude || !longitude || !temporadaData  || !testigoDescripcion){
      Alert.alert(
        "Complete todos los campos !",
        "",
        [
          {
            text: "Volver",
            onPress: () => {
              return 
            },
          },
          
        ],
        { cancelable: true }
      )
    } else {
      if(CheckConnectivity()){
        let newEvents = []
      if(temporadaData){
        if(temporadaData.events){
          for (const previusEvent of temporadaData.events ) {
            newEvents.push(previusEvent)
          }
        } 
      }
      firestore().collection("Testigos").add({
        testigoName:testigoName,
        testigoDescripcion:testigoDescripcion, 
        latitude:Number(latitude),
        longitude:Number(longitude),
        testigoColor:"red",
        temporadaID:temporadaData.id,
        temporadaNombre:temporadaData.temporadaNombre
    }).then((value) => {
      firestore().collection("Registros").add({
        userName: userName,
        userID: userID,
        userMail: userMail,
        Operation: 'Creacion de Evento',
        EventID:value.id,
        EventName:testigoName,
        fecha:date
    }).then((registerID) => {})

      var newEvent = {testigoName:testigoName, testigoDescripcion:testigoDescripcion, 
        latitude:Number(latitude), longitude:Number(longitude), testigoColor:"red", temporadaID:temporadaData.id,
        temporadaNombre:temporadaData.temporadaNombre, eventID:value.id}

        newEvents.push(newEvent)

        firestore().collection('Temporadas').doc(temporadaData.id)
        .update({
          events:newEvents
        }).then(() => {
          Alert.alert("Evento agregado exitosamente !")
        })
    })
      if(setTestigoName) setTestigoName("")
      if(setTestigoDescripcion) setTestigoDescripcion("")
      if(setTestigoName) setTestigoName("")  
      UpdateAllInternMemory(dispatch, false, false, false, false, true)
      }else{
        let  newPendingWork
        var pendingActivity = { Operation:"Creacion de Evento", userName:userName, userMail:userMail, fecha:date, userID:userID,
        testigoName:testigoName, testigoDescripcion:testigoDescripcion, latitude:latitude, longitude:longitude, temporadaData:temporadaData}

        Alert.alert("El Evento se subira cuando vuelva a conectarse a la red ", "Revise la pantalla de tareas sin conexion")
    
         if(pendingWork) newPendingWork =  pendingWork
         newPendingWork.push(pendingActivity)
         SaveInStorage('pendingWork', newPendingWork) 
         setTestigoName("")
         setTestigoDescripcion("")
         setTestigoName("")  
        }
    }  
}

export const deleteSeason = (temporadaData, collection, userID, userMail, userName, pendingWork, dispatch) => {
  const date  = new Date()
  console.log("tem dele -----> "  + JSON.stringify(temporadaData) )
  if(CheckConnectivity()){
    firestore().collection(collection).doc(temporadaData.id).delete()
    .then((value) => {
      firestore().collection("Registros").add({
        userName: userName,
        userID: userID,
        userMail: userMail,
        Operation: 'Eliminacion de Temporada',
        SeasonName:temporadaData.temporadaNombre,
        SeasonID:temporadaData.id,
        fecha:date
    }).then((registerID) => {})
        for( const item of temporadaData.events){
          firestore().collection('Testigos').doc(item.EventID).delete().then(()=>{console.log("testigo " + item.EventID + " eliminado con exito !")})
          DeleteEventPictures("", item.eventID)
        }
    })
    UpdateAllInternMemory(dispatch, false, true, false, false, false)
    Alert.alert('Temporada Eliminada !')
  } else {
      let  newPendingWork
      var pendingActivity = { Operation:"Eliminacion de Temporada", userName:userName, userMail:userMail, fecha:date, userID:userID,
      SeasonName:temporadaData.temporadaNombre, SeasonID:temporadaData.id, temporadaData:temporadaData}

      Alert.alert("La temporada se eliminara cuando vuelva a conectarse a la red ", "Revise la pantalla de tareas sin conexion")

        if(pendingWork) newPendingWork =  pendingWork
         newPendingWork.push(pendingActivity)
         SaveInStorage('pendingWork', newPendingWork) 
  }
}

export const SearchAndUpdate = (temporadaData, collection, temporadaName, setTemporadaName, temporadaProduccionBruta,
   temporadaProduccionPerdida, setemporadaProduccionBruta, setemporadaProduccionPerdida, userID, userMail, userName, pendingWork, dispatch) => {
   
  const date  = new Date()
  let newSeasonName = temporadaName

  let nuevaTemporadaProduccionBruta = temporadaData.temporadaProduccionBruta
  let nuevaTemporadaProduccionPerdida = temporadaData.temporadaProduccionPerdida
  let nuevaTemporadaProduccionNeta = temporadaData.temporadaProduccionNeta
  let productionDates = temporadaData.productionDates

  let currentProductionBruta = temporadaData.currentProductionBruta
  let currentProductionPerdida = temporadaData.currentProductionPerdida
  let currentProductionNeta = temporadaData.currentProductionNeta

  currentProductionBruta = Number(temporadaProduccionBruta) + Number(currentProductionBruta) 
  currentProductionPerdida = Number(temporadaProduccionPerdida) + Number(currentProductionPerdida) 
  currentProductionNeta = currentProductionBruta - currentProductionPerdida

  nuevaTemporadaProduccionBruta.push(currentProductionBruta)
  nuevaTemporadaProduccionPerdida.push(currentProductionPerdida)
  nuevaTemporadaProduccionNeta.push(currentProductionNeta)

  let newDate= date.toString()
  let finalDate= ""
  let index =0
  let time=""

  for (const letra of newDate){
    if(index<10){
      finalDate = finalDate + letra
    } 
      index =index + 1
  }

  productionDates.push(finalDate)

  if(CheckConnectivity()){
    if(!temporadaName){
      newSeasonName = temporadaData.temporadaNombre
    }
    if(!temporadaData.isClosed){
      firestore().collection(collection).doc(temporadaData.id)
          .update({
          temporadaNombre: newSeasonName,
          temporadaProduccionBruta:nuevaTemporadaProduccionBruta,
          temporadaProduccionPerdida:nuevaTemporadaProduccionPerdida,
          temporadaProduccionNeta:nuevaTemporadaProduccionNeta,
          productionDates:productionDates,
          currentProductionNeta:currentProductionNeta,
          currentProductionPerdida:currentProductionPerdida,
          currentProductionBruta:currentProductionBruta
          }).then(() => { 
            firestore().collection("Registros").add({
              userName: userName,
              userID: userID,
              userMail: userMail,
              Operation: 'Actualizacion de Producciones',
              fecha:date
          }).then((registerID) => {})
          
          Alert.alert('Exito','Actualizacion realizada !',[{text: 'Ok',
          //  onPress:      () => props.navigation.navigate('HomeScreen')
          },],
          {cancelable: false},
      )
      if(setemporadaProduccionBruta)setemporadaProduccionBruta("")
      if(setemporadaProduccionPerdida)setemporadaProduccionPerdida("")
      if(setTemporadaName) setTemporadaName("")

      UpdateAllInternMemory(dispatch, false, true, false, false, false)
      })
      .catch((error) => {
      Alert.alert('Exception',error,[{text: 'Ok',
              // onPress:() => props.navigation.navigate('HomeScreen'),
          },],
          {cancelable: false},
      )})
    }else{
      Alert.alert("Esta temporada ya se encuentra cerrada!")
    } 
  } else {
    let  newPendingWork
    var pendingActivity = { Operation:"Actualizacion de Producciones", userName:userName, userMail:userMail, fecha:date, userID:userID,
    temporadaData:temporadaData, temporadaProduccionBruta:temporadaProduccionBruta, temporadaProduccionPerdida:temporadaProduccionPerdida, temporadaName:temporadaName }

    Alert.alert("La temporada se actualizara cuando vuelva a conectarse a la red ", "Revise la pantalla de tareas sin conexion")

     if(pendingWork){
      newPendingWork =  pendingWork
     }
     newPendingWork.push(pendingActivity)
     SaveInStorage('pendingWork', newPendingWork)
     if(setemporadaProduccionBruta) setemporadaProduccionBruta("")
     if(setemporadaProduccionPerdida) setemporadaProduccionPerdida("")
     if(setTemporadaName) setTemporadaName("")
  }
}

export const CloseSeason = (temporadaData, collection, temporadaName, setTemporadaName, setemporadaProduccionBruta, setemporadaProduccionPerdida, userID, userMail, userName, pendingWork, dispatch) => {
 let newSeasonName = temporadaName
 const date  = new Date()

 if(!temporadaName)newSeasonName = temporadaData.temporadaNombre

  if(CheckConnectivity()){
    if(!temporadaData.isClosed){
      firestore().collection(collection).doc(temporadaData.id)
           .update({
           isClosed:true
           }).then(() => { 
             firestore().collection("Registros").add({
               userName: userName,
               userID: userID,
               userMail: userMail,
               Operation: 'Cerrar Temporada',
               fecha:date,
               SeasonName:temporadaData.temporadaNombre,
              SeasonID:temporadaData.id
           }).then((registerID) => {})
    
           Alert.alert('Exito','Se cerro la temporada !',[{text: 'Continuar',
           //  onPress:      () => props.navigation.navigate('HomeScreen')
           },],
           {cancelable: false},
       )
       if(setemporadaProduccionBruta)setemporadaProduccionBruta("")
       if(setemporadaProduccionPerdida) setemporadaProduccionPerdida("")
       if(setTemporadaName)setTemporadaName("")
       UpdateAllInternMemory(dispatch, false, true, false, false, false)
       })
       .catch((error) => {
          Alert.alert('Exception',error,[{text: 'Ok',
               // onPress:() => props.navigation.navigate('HomeScreen'),
           },],
           {cancelable: false},
       )})
     } else {
      Alert.alert("Operacion Invalida", "Esta temporada ya se encuentra cerrada!", [{ text: "Continuar", onPress: () => {return null}}])
     }
  } else {
    let  newPendingWork
    var pendingActivity = { Operation:"Cerrar Temporada", userName:userName, userMail:userMail, fecha:date, userID:userID,
    SeasonName:temporadaData.temporadaNombre, SeasonID:temporadaData.id, temporadaData:temporadaData}

    Alert.alert("La temporada se cerrara cuando vuelva a conectarse a la red ", "Revise la pantalla de tareas sin conexion")
    if(pendingWork) newPendingWork =  pendingWork
    newPendingWork.push(pendingActivity)
    SaveInStorage('pendingWork', newPendingWork)
  }
}

export const UploadSeasontoFirestore = (temporadaNombre='', tipoProduccion='', setTemporadaNombre, setTipoProduccion, userID, userMail, userName, pendingWork, dispatch) => {
  const date  = new Date() 

  let productionDates = []
  let temporadaProduccionBruta   = []
  let temporadaProduccionPerdida = []
  let temporadaProduccionNeta = []

  let currentProductionBruta = 0
  let currentProductionPerdida = 0
  let currentProductionNeta = 0
  let newDate = date.toString()
  let finalDate = ""
  let time = ""
  let index = 0

  for (const letra of newDate){
    if(index<10){
      finalDate = finalDate + letra
    } 
      index =index + 1
  }
  productionDates.push(finalDate)
  temporadaProduccionBruta.push(Number(0))
  temporadaProduccionPerdida.push(Number(0))
  temporadaProduccionNeta.push(Number(0))
 
  if(!temporadaNombre){
    Alert.alert( "Campo Vacio", "Por favor ingrese un nombre valido.", [{ text: "Volver", onPress: () => { return },},],
    { cancelable: true })
  } else {
    if(CheckConnectivity()){
      if (tipoProduccion == 'Seleccione la produccion'){
        return alert("Ingrese el Tipo de Produccion !")
      } 
        else{ 
          firestore().collection('Temporadas').add({
            temporadaNombre: temporadaNombre,
            temporadaTipoProduccion: tipoProduccion,
            temporadaProduccionBruta:temporadaProduccionBruta,
            temporadaProduccionPerdida:temporadaProduccionPerdida,
            temporadaProduccionNeta:temporadaProduccionNeta,
            events:[],
            productionDates:productionDates,
            currentProductionBruta:currentProductionBruta,
            currentProductionPerdida:currentProductionPerdida,
            currentProductionNeta:currentProductionNeta,
            isClosed:false
          })
          .then((value) => {
            firestore().collection("Registros").add({
              userName: userName,
              userID: userID,
              userMail: userMail,
              Operation: 'Creacion de Temporada',
              SeasonID:value.id,
              SeasonName:temporadaNombre,
              fecha:date
          }).then((registerID) => {})
          console.log('Temporada agregada exitosamente !!');
          Alert.alert('Temporada agregado con exito !')
          })
          if(setTemporadaNombre) setTemporadaNombre("")
          if(setTipoProduccion)  setTipoProduccion("Seleccione la produccion")
          UpdateAllInternMemory(dispatch, false, true, false, false, false)
  }} else{
    let  newPendingWork
    var pendingActivity = { Operation:"Creacion de Temporada", userName:userName, userMail:userMail, fecha:date, userID:userID,
    temporadaNombre:temporadaNombre, tipoProduccion:tipoProduccion,    temporadaProduccionBruta:temporadaProduccionBruta,
    temporadaProduccionPerdida:temporadaProduccionPerdida, temporadaProduccionNeta:temporadaProduccionNeta, currentProductionBruta:currentProductionBruta,
    currentProductionPerdida:currentProductionPerdida,}

    Alert.alert("La temporada se subira cuando vuelva a conectarse a la red ", "Revise la pantalla de tareas sin conexion")

     if(pendingWork){
      newPendingWork =  pendingWork
     }
     newPendingWork.push(pendingActivity)
     SaveInStorage('pendingWork', newPendingWork)
    }
 }}

export const UploadNew = (itemName, itemDescription, setItemName, setItemDescription, hasImage, setHasImage, collection="", images, navigation, dispatch) => {
  const date  = new Date()
   
  if (!itemName){
      return alert("Complete el primer campo !")
  } else{
    if(CheckConnectivity()){
      firestore().collection(collection).add({
        tituloNoticia: itemName.replace(/['"]+/g, ''),
        contenidoNoticia:itemDescription.replace(/['"]+/g, ''),
        fecha:date,
        hasImage:hasImage
    }).then((value) => {
      if(hasImage){
        let filnename
          for(const item of images){
            filnename = item.path.substring(item.path.lastIndexOf('/') + 1)
            uploadImageToStorage(item.path, value.id, collection, filnename) 
          } 
          setHasImage(false)
      } 
      if(CheckConnectivity()){
        Alert.alert('Noticia agregado con exito !')
      }
    })
    setItemName("")
    setItemDescription("")
    UpdateAllInternMemory(dispatch, false, false, true, false, false)
    }else{
      Alert.alert("No hay Conexion ...", " ", [{ text: "Continuar", onPress: () => {return null}}])
    }
  }   
}

export const deleteEvent =async  (mainIndex, temporadaID, navigation, userID, userMail, userName, pendingWork, dispatch)=>{
  let newEventsArray = []
  const date  = new Date()
  const  index  = mainIndex 
  let auxEventID =""
  let auxEventName =""
  const temporada =  await firestore().collection("Temporadas").doc(temporadaID).get()

    if(temporada){
      for(const [key, value] of Object.entries(temporada._data.events) ){
        if(key && value){
          if((key)!=index){
            console.log(" haciendo push")
            newEventsArray.push(value)
          }else{
            if(CheckConnectivity()){
            auxEventID=value.eventID
            auxEventName=value.testigoName
            firestore().collection('Testigos').doc(value.eventID).delete().then(()=>{console.log("testigo " + value.eventID + " eliminado con exito !")})
            DeleteEventPictures("", value.eventID)
            UpdateAllInternMemory(dispatch, false, false, false, false, true)
            } else{
              auxEventID=value.eventID
              auxEventName=value.testigoName
              Alert.alert("El Evento se eliminara cuando vuelva a conectarse a la red ", "Revise la pantalla de tareas sin conexion")
              let  newPendingWork
              var pendingActivity = { Operation:"Eliminacion de Evento", userName:userName, userMail:userMail, fecha:date, userID:userID,
              auxEventID:auxEventID, auxEventName:auxEventName, mainIndex:mainIndex, temporadaID:temporadaID, newEventsArray:newEventsArray }
                  if(pendingWork) newPendingWork =  pendingWork
                  newPendingWork.push(pendingActivity)
                  SaveInStorage('pendingWork', newPendingWork) 
          }
        }      
      }  
    }
    if(CheckConnectivity()) UpdateSeasonEvents(newEventsArray, temporadaID, navigation, userID, userMail, userName, auxEventID, auxEventName)
  }
}

export const UpdateSeasonEvents =(newEvents, id, navigation, userID, userMail, userName, auxEventID, testigoName)=>{
  const date  = new Date()

  firestore().collection("Temporadas").doc(id.replace(/['"]+/g, ''))
  .update({
  events: newEvents
  }).then(() => { 

    firestore().collection("Registros").add({
      userName: userName,
      userID: userID,
      userMail: userMail,
      Operation: 'Eliminacion de Evento',
      EventID:auxEventID,
      EventName:testigoName,
      fecha:date
  }).then((registerID) => {})

  Alert.alert('Eliminacion exitosa !','',[{text: 'Ok',
  onPress:      () =>{
    if(navigation) navigation.navigate('Ver Temporadas')
  } 
  },],
  {cancelable: false},

)})}

export const deleteNew = (newInfo, userID, userMail, userName, pendingWork, dispatch) => {
  console.log("info ----------> "  + JSON.stringify(newInfo) )
  const date  = new Date()
  if(CheckConnectivity()){
    firestore().collection("Noticias").doc(newInfo.id).delete()
    .then((value) => {
      firestore().collection("Registros").add({
        userName: userName,
        userID: userID,
        userMail: userMail,
        Operation: 'Eliminacion de Noticia',
        NewData:newInfo,
        fecha:date
    }).then((registerID) => {})
          DeleteNewPictures("", newInfo.id)
    })
    Alert.alert('Noticia Eliminada !')
    UpdateAllInternMemory(dispatch, false, false, true, false, false)
  } else {
      let  newPendingWork
      var pendingActivity = { Operation:"Eliminacion de Noticia", userName:userName, userMail:userMail, fecha:date, userID:userID,
      NewData:newInfo}

      Alert.alert("La noticia se eliminara cuando vuelva a conectarse a la red ", "Revise la pantalla de tareas sin conexion")

        if(pendingWork) newPendingWork =  pendingWork
         newPendingWork.push(pendingActivity)
         SaveInStorage('pendingWork', newPendingWork) 
  }
}
