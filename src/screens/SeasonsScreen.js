import React, { useEffect, useState } from 'react'  
import { StyleSheet, View, Text, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native'  
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useDispatch } from 'react-redux'

import { getFullStorageItemPath, listFilesAndDirectoriesGeneric } from '../functions/firebase-storage-functions'
import { GetCollectionFromAsyncStorage, GetSpecificValueFromAsyncStorage  } from '../storage/storage-functions'
import { GetCollection, deleteEvent } from '../functions/firebase-firestore-funtions'
import { lauchCameraOrLibrary, CheckConnectivity, downloadImageWhitRNFetchBlob } from '../functions/general-functions'
import { GetCurrentSpecificInfo } from '../functions/firebase-auth-functions'

import MyPickerAlternative from '../components/MyPickerAlternative'
import SeasonImages from '../components/SeasonImages';

const SeasonsScreen = ({ navigation }) => {

  const [temporadaName, setTemporadaName] = useState("Mostrar todos los Eventos")
  let [temporadaData, setTemporadaData] = useState(null)
  const [temporadas, setTemporadas ] = useState([])
  const [allEvents, setAllEvents ] = useState([])
  const [newTemporadas, setNewTemporadas ] = useState([])
  const [pendingWork, setPendingWork] = useState([])
  const [update, setUpdate] = useState(false)

  const dispatch = useDispatch()
  const [userID, setUserID] = useState('userid')
  const [userMail, setUserMail] = useState('useremail')
  const [userName, setUserName] = useState('userfullname')

  const [logoData, setLogoData] = useState(null)
  const [logoImage, setLogoImage] = useState(null)
  const [finalLogoImage, setFinalLogoImage] = useState(null)
 
  let collection = 'Temporadas'
  let collectionValue = 'temporadaNombre'
  
   useEffect(() => {
    GetCollection(collection, setTemporadas)

    if(CheckConnectivity()){
      GetCurrentSpecificInfo('id', setUserID)
      GetCurrentSpecificInfo('userCompleteName', setUserName)
      GetCurrentSpecificInfo('email', setUserMail)
    } else { 
      GetSpecificValueFromAsyncStorage('id', setUserID)
      GetSpecificValueFromAsyncStorage('userCompleteName', setUserName)
      GetSpecificValueFromAsyncStorage('email', setUserMail)  
    }
    GetCollectionFromAsyncStorage('pendingWork' , setPendingWork)
    }, [])

  useEffect(() => {
    if(temporadas){
      let arrayseasonswhitfirstmessage = [] 
      let seasonsArray =[]
        if(temporadaName == "Mostrar todos los Eventos"){
          arrayseasonswhitfirstmessage.push({temporadaNombre:"Mostrar todos los Eventos"})
            for(const item of temporadas){
              arrayseasonswhitfirstmessage.push(item)
              if(item.events){ 
                for(const subitem of item.events){
                  seasonsArray.push(subitem)
                }
              }
               setAllEvents(seasonsArray)
               setNewTemporadas(arrayseasonswhitfirstmessage)
          }
        } else {
          if(temporadaData.events){
            for(const item of temporadaData.events){
              seasonsArray.push(item)
            }
            setAllEvents(seasonsArray)
          }
        }
     }
    }, [temporadas, temporadaName])


    useEffect(()=>{
      listFilesAndDirectoriesGeneric("", "MainLogo", "MainLogo", setLogoData)
    },[])

  useEffect(()=>{
      let imagesUrlsArray = []  
     
      if(logoData){ 
          let filename 
          for (const subitem of logoData){
          filename = subitem.path.substring(subitem.path.lastIndexOf('/') + 1)
              getFullStorageItemPath("MainLogo", "MainLogo", filename, imagesUrlsArray, null )
          }
      setLogoImage(imagesUrlsArray)
      }
       
  },[logoData])

 /* useEffect(()=>{ 
      if(logoImage){
          if(logoImage[0]){ 
                 console.log("logoImage ----------> " + logoImage[0].url)
                  downloadImageWhitRNFetchBlob(logoImage[0].url, setFinalLogoImage)
              
          }
      }
  },[logoImage]) */

  const checkInternet =(event)=>{
    if(CheckConnectivity(event)){
      lauchCameraOrLibrary(null, "EventPictures", event['item'].eventID, "Eventos", null, navigation, 'first')
    }else{
      Alert.alert("No puede subir fotografias sin internet ...")
    }
  }

   const renderItem =  ( event ) => {
    return(    
      <>
        <View style={styles.item} >
            <SeasonImages collection={"Eventos"} itemId={event['item'].eventID}  
             testigoName={event['item'].testigoName} descripcion={event['item'].testigoDescripcion} 
             longitud ={event['item'].longitude} latitude={event['item'].latitude}     />
              <TouchableOpacity  onPress={()=> checkInternet(event)} style={styles.plus} >
                <FontAwesome5 name={'plus'} size={21} color={"#99E9FF"}/>
              </TouchableOpacity>
                <Text style={styles.title}>
                     {event['item'].testigoName} {"\n"} {"\n"}
                     {event['item'].testigoDescripcion} {"\n"} {"\n"}
                     Longitud : {event['item'].longitude} {"\n"}
                     Latitud     : {event['item'].latitude} {"\n"} {"\n"}
                     {
                      /*
                        ID : {event['item'].eventID} {"\n"}
                      */
                     }
                     
                     Temporada : {event['item'].temporadaNombre} {"\n"}
            </Text>
            <View style={styles.thrashStyle} >
              <TouchableOpacity onPress={()=>{ deleteEvent(event.index, event['item'].temporadaID, navigation, userID, userMail, userName, pendingWork, dispatch) }}>
                <FontAwesome5 name={'trash'} size={21} color={'#FF4D4D'}/>
              </TouchableOpacity>
  
            </View>
        </View>
      </>
      )
  }

  return (
            <View style={styles.inputContainer}>
                <SafeAreaView>
                  <Text style={styles.heading}> Seleccione la Temporada </Text>
                    <MyPickerAlternative param={temporadaName} groupParam={newTemporadas} functionParam={setTemporadaName} functionParam2={setTemporadaData} attribute={collectionValue} />    
                </SafeAreaView>
                { !newTemporadas ? 
                        <>
                            <ActivityIndicator style={styles.activityStyle} />
                        </>
                    :
                        <FlatList
                            data={allEvents}
                            renderItem={(item, index)=>renderItem(item, index)}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    }
            </View>
  )}
  
export default SeasonsScreen;

const styles = StyleSheet.create ({  
    container: {  
        flex: 1,  
        alignItems: 'center',  
        justifyContent: 'center',  
    },  
   textStyle:{  
       margin: 24,  
       fontSize: 25,  
       fontWeight: 'bold',  
       textAlign: 'center',  
   },  
   pickerStyle:{  
       height: 150,  
       width: "80%",  
       color: '#344953',  
       justifyContent: 'center',  
   },
   heading: {
     fontSize: 20,
     textAlign: 'center',
     marginVertical: 10,
     marginTop:20,
   },  
   inputContainer: {
     margin:0,
     flex:1,
     height:"80%"
   },
   image:{
    width: "100%",
    height: 280,
    resizeMode: "contain",
    margin: 10,
    marginTop:40,
    marginBottom:50
    },
    button:{
        marginTop:62
    },
    item: {
        backgroundColor: '#E4F9FF',
        padding: 0,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius:10,
        flexDirection:'row',
        borderWidth: 1,
      },
      activityStyle:{
        size:"large",
        color:"#0000ff"
      },
      title: {
        marginTop:10,
        fontSize: 15,
        alignSelf:'center',
        marginLeft:5,
        width:'70%'
      },
      testStyle:{
        marginBottom:50
      },
      thrashStyle:{
        marginTop:10,
        right:32
      },
      plus:{
        marginTop:5
      }
 }) 