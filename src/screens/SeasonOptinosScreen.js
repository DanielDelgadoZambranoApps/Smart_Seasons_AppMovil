import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet,Image, Button, ScrollView, Alert } from 'react-native';
import { useDispatch } from 'react-redux'

import { SearchAndUpdate, deleteSeason, GetCollection, CloseSeason } from '../functions/firebase-firestore-funtions'
import { GetCollectionFromAsyncStorage, GetSpecificValueFromAsyncStorage  } from '../storage/storage-functions'
import { GetCurrentUserSpecificInfo } from '../functions/firebase-auth-functions'
import { CheckConnectivity } from '../functions/general-functions';

import MyPickerAlternative from '../components/MyPickerAlternative'
import MyTextInput from '../components/MyTextInput'

const SeasonOptionsScreen = ({navigation}) => {

  const [temporadaProduccionPerdida, setemporadaProduccionPerdida] = useState(0)
  const [temporadaProduccionBruta, setemporadaProduccionBruta] = useState(0)
  const [nombreTemporada, setNombreTemporada] = useState('')
  const [temporadaName, setTemporadaName] = useState(null)
  const [newTemporadas, setNewTemporadas ] = useState([])
  const [userID, setUserID] = useState('userid')
  const [userMail, setUserMail] = useState('usremail')
  const [userName, setUserName] = useState('userfullname')
  const [pendingWork, setPendingWork ] = useState([])

  const dispatch = useDispatch()
  
  let [temporadaData, setTemporadaData] = useState(null)
  let [temporadas, setTemporadas] = useState([])
  let collection = 'Temporadas'
  let collectionValue = 'temporadaNombre'
    
    useEffect(()=>{  
      GetCollection('Temporadas', setTemporadas)
      if(CheckConnectivity()){
        GetCurrentUserSpecificInfo('id', setUserID)
        GetCurrentUserSpecificInfo('userCompleteName', setUserName)
        GetCurrentUserSpecificInfo('email', setUserMail)
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
            arrayseasonswhitfirstmessage.push({temporadaNombre:"Seleccione una Temporada"})
              for(const item of temporadas){
                arrayseasonswhitfirstmessage.push(item)
              }
              setNewTemporadas(arrayseasonswhitfirstmessage)
      } 
    }, [temporadas, temporadaName])

  const actualizarTemporada = () =>{
    if(temporadaName != "Seleccione una Temporada"){
      if(temporadaData){ 
        SearchAndUpdate(temporadaData, collection, nombreTemporada, setNombreTemporada, temporadaProduccionBruta,
          temporadaProduccionPerdida, setemporadaProduccionBruta, setemporadaProduccionPerdida, userID, userMail, userName, pendingWork, dispatch)
          setTemporadaName(newTemporadas['0'].temporadaNombre)
      }
    } else {
      Alert.alert("Seleccione una Temporada !")
    }
  } 

  const cerrarTemporada = () =>{
    if(temporadaName != "Seleccione una Temporada"){
      if(temporadaData){ 
        CloseSeason(temporadaData, collection, nombreTemporada, setNombreTemporada, setemporadaProduccionBruta, setemporadaProduccionPerdida, userID, userMail, userName, pendingWork, dispatch)
          setTemporadaName(newTemporadas['0'].temporadaNombre)
        }
    } else {
      Alert.alert("Seleccione una Temporada !")
    }
  } 
  
  const  eliminarTemporada = () =>{
    if(temporadaName != "Seleccione una Temporada"){
      if(temporadaData){
        deleteSeason(temporadaData, collection, userID, userMail, userName, pendingWork, dispatch)
        }  
    }else {
      Alert.alert("Seleccione una Temporada !")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <View style={{marginTop:0}}>
          <View style={styles.space} />
            <Text style={styles.text}>{'Temporada Seleccionada'}</Text>
                  <View style={styles.space} />
                  <MyPickerAlternative param={temporadaName} groupParam={newTemporadas} functionParam={setTemporadaName} functionParam2={setTemporadaData} attribute={collectionValue} />
                  <View style={styles.space} />
                  <View style={styles.space} />
                  <MyTextInput param={nombreTemporada} placeholder='Nuevo Nombre (Opcional)' functionParam={setNombreTemporada}/>
                    <View style={styles.space} />
                    <View style={styles.space} />
                    <View style={styles.space} />
                    <MyTextInput param={temporadaProduccionBruta} placeholder='Agregar Produccion' functionParam={setemporadaProduccionBruta}/>
                    <View style={styles.space} />
                    <MyTextInput param={temporadaProduccionPerdida} placeholder='Produccion Perdida' functionParam={setemporadaProduccionPerdida}/>
                    <View style={styles.space} />
                  <View style={styles.view}>
                    <Image style={styles.image} source={require("../../assets/AdminTemporadas.jpg")} />
                  </View>
                  <View style={styles.space} />
                  <View style={styles.space} />
		                  <Button title="Actualizar Temporada" onPress={()=>actualizarTemporada()} />
                      <View style={styles.space} />
                      <Button title="Cerrar Temporada" onPress={()=>cerrarTemporada()} />
                      <View style={styles.space} />
                      <View style={styles.space} />
                      <View style={styles.space} />
		                  <Button title="Eliminar Temporada" onPress={()=>eliminarTemporada()} color ={'red'} />
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
    margin: 20
  },
  text:{
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 0,
    marginTop: 0,
    color: "#000000",
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center'
  },
  view:{ 
    alignItems: "center"
  },
  image:{
      width: "100%",
      height: 80,
      resizeMode: "contain",
      margin: 10,
      marginTop:30,
      marginBottom:30,
      marginLeft:250
  },
  space:{
    marginTop:12
  }
})

export default SeasonOptionsScreen;
