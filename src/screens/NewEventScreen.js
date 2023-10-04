import React, { useEffect, useState} from "react"
import { StyleSheet, SafeAreaView, Text, View, Button, Image, ScrollView, Alert } from "react-native"
import { useDispatch } from 'react-redux'

import { GetCollectionFromAsyncStorage, GetSpecificValueFromAsyncStorage  } from '../storage/storage-functions'
import { UploadEventtoFirestore, GetCollection} from '../functions/firebase-firestore-funtions'
import { GetCurrentSpecificInfo } from '../functions/firebase-auth-functions'
import { CheckConnectivity } from '../functions/general-functions'

import MyPickerAlternative from "../components/MyPickerAlternative"
import MyTextInput from "../components/MyTextInput";

const NewEventScreen = ({ navigation }) => {

  const [testigoDescripcion, setTestigoDescripcion] = useState()
  const [newTemporadas, setNewTemporadas ] = useState([])
  const [testigoName, setTestigoName] = useState()
  const [longitude, setLongitude] = useState('')
  const [latitude, setLatitude] = useState('')
  const [userID, setUserID] = useState('')
  const [userMail, setUserMail] = useState('')
  const [userName, setUserName] = useState('')
  const [pendingWork, setPendingWork] = useState([])

  const dispatch = useDispatch()
  
  const [temporadaName, setTemporadaName] = useState(null)
  let [temporadaData, setTemporadaData] = useState(null)
  const [temporadas, setTemporadas ] = useState([])

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
            arrayseasonswhitfirstmessage.push({temporadaNombre:"Mostrar todos las Temporadas"})
              for(const item of temporadas){
                arrayseasonswhitfirstmessage.push(item)
              }
              setNewTemporadas(arrayseasonswhitfirstmessage)
      } 
    }, [temporadas,temporadaName])

    const checkTemporadaData =()=>{
      if(temporadaName!="Mostrar todos las Temporadas"){
        UploadEventtoFirestore(testigoName, latitude, longitude, temporadaData ,testigoDescripcion, 
          setTestigoName, setTestigoDescripcion, userID, userMail, userName, pendingWork, dispatch)
          setTemporadaName(newTemporadas['0'].temporadaNombre)
          setLatitude("")
          setLongitude("")
      }else{
        Alert.alert("Selecciona una temporada")
      }
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.inputContainer}>
            <MyTextInput param={testigoName} placeholder='Nombre del Evento' functionParam={setTestigoName}/>
              <View style={styles.view}>
              <View style={styles.space} />
                <Image source={require("../../assets/Testigo.jpg")} style={styles.image}/>
              </View>
                <View style={styles.space} />
                <MyTextInput param={testigoDescripcion} placeholder='Descripcion' functionParam={setTestigoDescripcion}/>
                <View style={styles.space} />
                <MyTextInput param={latitude} placeholder='Coordenada Latitud' functionParam={setLatitude}/>
                <View style={styles.space} />
                <MyTextInput param={longitude} placeholder='Coordenada Longitud' functionParam={setLongitude}/>
                  <View style={styles.space} />
                  <View style={styles.space} />
                  <View style={styles.space} />
                    <Text style={styles.text}>{'Seleccione su Temporada '}</Text>
                    <MyPickerAlternative param={temporadaName} groupParam={newTemporadas} functionParam={setTemporadaName} functionParam2={setTemporadaData} attribute={collectionValue} />    
                    <View style={styles.space} />
                <Button
                  title='Ingresar Testigo' color='#1894F8'
                  onPress={() =>checkTemporadaData()} />
              </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

export default NewEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  inputContainer: {
    margin: 30
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
  view:{ 
    alignItems: "center" 
  },
  image:{
    width: "35%",
    height: 100,
    resizeMode: "contain",
    margin: 10,
  
  },
  text:{
    fontSize: 18.5,
    textAlign: 'left',
    color: "#B3B3B3 ",
  },
  space:{
    marginBottom:19
  }
})