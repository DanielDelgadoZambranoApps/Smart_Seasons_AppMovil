import React, { useEffect, useState } from 'react'  
import {StyleSheet, View, Text, Button, Image, SafeAreaView, ScrollView, Alert } from 'react-native'  

import { GetCollectionFromAsyncStorage, GetSpecificValueFromAsyncStorage  } from '../storage/storage-functions'
import { UploadSeasontoFirestore, GetCollection } from '../functions/firebase-firestore-funtions'
import { GetCurrentUserSpecificInfo } from '../functions/firebase-auth-functions'

import MyTextInput from '../components/MyTextInput'
import MyPickerAlternative from '../components/MyPickerAlternative'

import { useDispatch } from 'react-redux'
import { CheckConnectivity } from '../functions/general-functions'

const CreateSeasonScreen = ({ navigation }) => {

    const [temporadaNombre, setTemporadaNombre ] = useState(null)
    const [tipoProduccion, setTipoProduccion ] = useState(null)
    const [pendingWork, setPendingWork ] = useState([])
    const [frutasVegetales, setFrutasVegetales ] = useState([])
    let [frutasVegetalesNew, setFrutasVegetalesNew ] = useState([])
    let [tipoProduccionData, setTipoProduccionData] =useState(null)

    const [userID, setUserID] = useState('userid')
    const [userMail, setUserMail] = useState('usremail')
    const [userName, setUserName] = useState('userfullname')
    const dispatch = useDispatch()
    
    let collection = 'FrutasyVegetales'
    let collectionValue = 'TipoProduccion'

    useEffect(() => {
      GetCollection(collection, setFrutasVegetales)
      if(CheckConnectivity()){
      GetCurrentUserSpecificInfo('id', setUserID)
      GetCurrentUserSpecificInfo('userCompleteName', setUserName)
      GetCurrentUserSpecificInfo('email', setUserMail)
      } else {
      GetSpecificValueFromAsyncStorage("userCompleteName", setUserName)
      GetSpecificValueFromAsyncStorage("id", setUserID)
      GetSpecificValueFromAsyncStorage("email", setUserMail)
      }
      GetCollectionFromAsyncStorage('pendingWork' , setPendingWork)
    }, []) 

    useEffect(() => {
      if(frutasVegetales){
        let arrayseasonswhitfirstmessage = [] 
            arrayseasonswhitfirstmessage.push({TipoProduccion:"Seleccionar Tipo Produccion"})
              for(const item of frutasVegetales){
                arrayseasonswhitfirstmessage.push(item)
              }
              setFrutasVegetalesNew(arrayseasonswhitfirstmessage)
      } 
    }, [frutasVegetales, tipoProduccion])

    const checkToUpload =()=>{
      if(tipoProduccion!="Seleccionar Tipo Produccion"){
        UploadSeasontoFirestore(temporadaNombre, tipoProduccion,
          setTemporadaNombre, setTipoProduccion, userID, userMail, userName, pendingWork, dispatch)
          setTipoProduccion("Seleccionar Tipo Produccion")
          setTemporadaNombre("")
      }else{
        Alert.alert("Seleccione el tipo de produccion !")
      }
    }
 
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
          <View style={styles.inputContainer}>
              <MyTextInput param={temporadaNombre} placeholder='Nombre de la Temporada' functionParam={setTemporadaNombre}/>
              <View style={styles.imageView}>
              <Image source={require("../../assets/Temporada.jpg")} style={styles.image} /> 
              </View>
                  <View style={{marginTop:80}} />
                  <Text style={styles.text}>Tipo de Produccion</Text>
                  <MyPickerAlternative param={tipoProduccion} groupParam={frutasVegetalesNew} functionParam={setTipoProduccion} functionParam2={setTipoProduccionData} attribute={collectionValue} />    
                  <View style={styles.button} />
                  <View style={{marginTop:50}} />
                  <Button
                  title='Crear Nueva Temporada' color='#1894F8'
                  onPress={() => checkToUpload()} />   
                  <View style={styles.button} />
              </View>
              <View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )}

export default CreateSeasonScreen;

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
      color: '#000000',  
      justifyContent: 'center',  
  },
  text:{
    fontSize: 19,
    textAlign: 'left',
    marginBottom: 10,
    marginTop: 0,
    color: "#000000",
  },
  image:{
    width: "80%",
    height: 130,
    resizeMode: "contain",
    margin: 10,
    marginBottom:80
  },
  button:{
    marginTop:30
  },
  picker:{
    marginBottom:20
  },
  imageView:{ 
  alignItems: "center",
  marginTop:40 }
})