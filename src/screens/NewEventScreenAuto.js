import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, StyleSheet, Image, Button, LogBox, ScrollView, Alert } from 'react-native'
import { useDispatch } from 'react-redux'

import { GetCollectionFromAsyncStorage, GetSpecificValueFromAsyncStorage  } from '../storage/storage-functions'
import { UploadEventtoFirestore, GetCollection } from '../functions/firebase-firestore-funtions'
import { GetCurrentSpecificInfo } from '../functions/firebase-auth-functions'
import { GetRealTimeLocation } from '../functions/geolocations-functions'
import { CheckConnectivity } from '../functions/general-functions'

import MyPickerAlternative from '../components/MyPickerAlternative'
import MyTextInput from '../components/MyTextInput'

import Geolocation from '@react-native-community/geolocation';
import { set } from 'react-native-reanimated'
 
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const AgregarTestigoAuto = ({navigation}) => {

  const [testigoDescripcion, setTestigoDescripcion] = useState()
  const [newTemporadas, setNewTemporadas ] = useState([])
  const [locationStatus, setLocationStatus]= useState()
  const [testigoName, setTestigoName] = useState()
  const [pendingWork, setPendingWork] = useState([])
  const dispatch = useDispatch()
  let [longitude, setLongitude] = useState(0)
  let [latitude, setLatitude] = useState(0)
  const [temporadas, setTemporadas ] = useState([])
  const [temporadaName, setTemporadaName] = useState(null)
  const [userID, setUserID] = useState('userid')
  const [userMail, setUserMail] = useState('usremail')
  const [userName, setUserName] = useState('userfullname')

  let [temporadaData, setTemporadaData] = useState(null)
  let collection = 'Temporadas'
  let collectionValue = 'temporadaNombre'

  
  useEffect(() => {
    GetCollection(collection, setTemporadas)
   // GetRealTimeLocation(setLongitude, setLatitude, setLocationStatus)
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

    
    Geolocation.getCurrentPosition(info =>{
      console.log("infooo --->  " +  JSON.stringify(info.coords))
      setLatitude(Number(info.coords.latitude))
      setLongitude(Number(info.coords.longitude))
    } )
    }, [])

    useEffect(() => {
      if(temporadas){
        let arrayseasonswhitfirstmessage = [] 
            arrayseasonswhitfirstmessage.push({temporadaNombre:"Seleccione una Temporada"})
              for(const item of temporadas){
                arrayseasonswhitfirstmessage.push(item)
              }
              setNewTemporadas(arrayseasonswhitfirstmessage)
      } 
    }, [temporadas,temporadaName])

    const checkTemporadaData =()=>{
      if(temporadaName!="Seleccione una Temporada"){
        UploadEventtoFirestore(testigoName, latitude, longitude, temporadaData ,testigoDescripcion, 
          setTestigoName, setTestigoDescripcion, userID, userMail, userName, pendingWork, dispatch)
          setTemporadaName(newTemporadas['0'].temporadaNombre)
      }else{
        Alert.alert("Selecciona una temporada")
      }
    }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
          <View style={styles.inputContainer}>
            <View style={{marginTop:0}}>
              <MyTextInput param={testigoName} placeholder='Nombre del Evento' functionParam={setTestigoName}/>
              <View style={styles.space} /> 
              <View style={{ alignItems: "center" }}>
                  <Image source={require("../../assets/TestigoAuto.jpg")} style={styles.image} />
              </View>
                <View style={styles.space} />
                <MyTextInput param={testigoDescripcion} placeholder='Descripcion' functionParam={setTestigoDescripcion}/>
                <View style={styles.space} />
                <View style={styles.space} />
                <View style={styles.space} />
                <View style={styles.space} />
                <View style={styles.space} />
                <Text style={styles.text}>{'Seleccione su Temporada '}</Text>
                <MyPickerAlternative param={temporadaName} groupParam={newTemporadas} functionParam={setTemporadaName} functionParam2={setTemporadaData} attribute={collectionValue} />    
                <View style={styles.space} />
                <View style={styles.button} >
                <Button  style={styles.button} title="Ingresar Testigo"  onPress={() => checkTemporadaData()} />
                </View>
            </View>
          </View>
      </ScrollView>    
    </SafeAreaView>
  )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  inputContainer: {
    margin: 30
  },
  boldText: {
    fontSize: 25,
    color: "#1894F8",
    marginVertical: 26,
  },
  image:{
    width: "35%",
    height: 115,
    resizeMode: "contain",
    margin: 10,
    marginBottom:30
  },
  text:{
    fontSize: 18.5,
    textAlign: 'left',
    marginBottom: 0,
    marginTop: 0,
    color: "#B3B3B3 ",
  },
  space:{
    marginBottom:25
  },
  button:{
    borderRadius:10,
    color:'#1894F8'
  }
  
})

export default AgregarTestigoAuto;