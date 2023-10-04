import React, {useEffect, useState} from 'react';
import { View, Button, StyleSheet, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'

import { deleteNew, deleteSeason, SearchAndUpdate, CloseSeason, deleteEvent, UploadEventtoFirestore,UploadSeasontoFirestore } from '../functions/firebase-firestore-funtions'
import { useDispatch } from 'react-redux'
import { GetCollectionFromAsyncStorage, deleteRegisterFromAsync, GetSpecificValueFromAsyncStorage  } from '../storage/storage-functions'
import { GetCurrentUserSpecificInfo } from '../functions/firebase-auth-functions'
import { CheckConnectivity } from '../functions/general-functions'

const NoConectionScreen = ({navigation}) => {

  const [pendingWork, setPendingWork] = useState([])
  const [userName, setUserName] = useState('userfullname')
  const [userMail, setUserMail] = useState('useremail')
  const [userID, setUserID] = useState('userid')

  const dispatch = useDispatch()
  let [update , setUpdate] = useState(false)  

  useEffect(()=>{ 
  GetCollectionFromAsyncStorage('pendingWork', setPendingWork)

  if(CheckConnectivity()){
    GetCurrentUserSpecificInfo('id', setUserID)
    GetCurrentUserSpecificInfo('userCompleteName', setUserName)
    GetCurrentUserSpecificInfo('email', setUserMail)
  } else {
    GetSpecificValueFromAsyncStorage('id', setUserID)
    GetSpecificValueFromAsyncStorage('userCompleteName', setUserName)
    GetSpecificValueFromAsyncStorage('email', setUserMail)
  }
  },[update])

  const renderItem =(item)=>{

      const dateNumber = Number( item['item'].fecha.toString().length ) - Number(6)
      let finalDate = ""
      let i = 0

      for(const letra of item['item'].fecha ){
        if(Number(i)  > Number(dateNumber)){
          break
        } else{
          i= i + 1
          if(i!=11){
            finalDate = finalDate + letra
          }else{
            finalDate = finalDate + " "
          }
        }}

        switch(item['item'].Operation){
          case 'Creacion de Temporada' :
            return (
              <View style={styles.item} >
                  <Text style={styles.title}> 
                                Usuario Responsable : {item['item'].userName} {"\n"} {"\n"}
                                Operacion : {item['item'].Operation} {"\n"} 
                                Email :{item['item'].userMail} {"\n"}
                                User ID : {item['item'].userID} {"\n"}  {"\n"} 
                                Nombre : {item['item'].temporadaNombre} {"\n"}
                                Tipo : {item['item'].tipoProduccion} {"\n"} {"\n"}
                                {finalDate } {"\n"}    
                        </Text>
                  <TouchableOpacity style={{right:20, marginTop:2}}  onPress={()=>{deleteRegisterFromAsync(pendingWork, item.index, update, setUpdate)}} >
                    <Entypo name={'cross'} size={20}color={'#000000'} />
                  </TouchableOpacity>   
                      </View>
            )
            case 'Creacion de Evento' :
            return (
              <View style={styles.item} >
                  <Text style={styles.title}> 
                                Usuario Responsable : {item['item'].userName} {"\n"} {"\n"}
                                Operacion : {item['item'].Operation} {"\n"} 
                                Email :{item['item'].userMail} {"\n"}
                                User ID : {item['item'].userID} {"\n"}  {"\n"}
                                Nombre : {item['item'].testigoName} {"\n"} 
                                Latitude : {item['item'].latitude} {"\n"}
                                longitude : {item['item'].longitude} {"\n"}
                                Temporada Data : {'Cargada y validada.'} {"\n"} {"\n"}
                                {finalDate } {"\n"}
                        </Text>
                        <TouchableOpacity style={{right:20, marginTop:2}}  onPress={()=>{deleteRegisterFromAsync(pendingWork, item.index, update, setUpdate)}} >
                    <Entypo name={'cross'} size={20}color={'#000000'} />
                  </TouchableOpacity>   
                  </View>
            )
            case 'Actualizacion de Producciones' :
            return (
              <View style={styles.item} >
                  <Text style={styles.title}> 
                                Usuario Responsable : {item['item'].userName} {"\n"} {"\n"}
                                Operacion : {item['item'].Operation} {"\n"} 
                                Email :{item['item'].userMail} {"\n"}
                                User ID : {item['item'].userID} {"\n"}  {"\n"}
                                Nuevo Nombre : {item['item'].temporadaName} {"\n"}
                                Produccion Bruta   :   {item['item'].temporadaProduccionBruta} {"\n"}   
                                Produccion Perdida :   {item['item'].temporadaProduccionPerdida} {"\n"}   
                                Temporada Data : {'Cargada y validada.'} {"\n"} {"\n"}
                                {finalDate } {"\n"}    
                        </Text>
                        <TouchableOpacity style={{right:20, marginTop:2}}  onPress={()=>{deleteRegisterFromAsync(pendingWork, item.index, update, setUpdate)}} >
                    <Entypo name={'cross'} size={20}color={'#000000'} />
                  </TouchableOpacity>    
                  </View>
            )
            case 'Eliminacion de Evento' :
            return (
              <View style={styles.item} >
                  <Text style={styles.title}> 
                                Usuario Responsable : {item['item'].userName} {"\n"} {"\n"}
                                Operacion : {item['item'].Operation} {"\n"} 
                                Email :{item['item'].userMail} {"\n"}
                                User ID : {item['item'].userID} {"\n"}
                                Temporada Data : {'Cargada y validada.'} {"\n"} {"\n"}
                                {finalDate } {"\n"}    
                        </Text>
                  <TouchableOpacity style={{right:20, marginTop:2}}  onPress={()=>{deleteRegisterFromAsync(pendingWork, item.index, update, setUpdate)}} >
                    <Entypo name={'cross'} size={20}color={'#000000'} />
                  </TouchableOpacity>    
                  </View>
            )
            case 'Cerrar Temporada' :
            return (
              <View style={styles.item} >
                  <Text style={styles.title}> 
                                Usuario Responsable : {item['item'].userName} {"\n"} {"\n"}
                                Operacion : {item['item'].Operation} {"\n"} 
                                Email :{item['item'].userMail} {"\n"}
                                User ID : {item['item'].userID} {"\n"}  {"\n"}
                                Nombre Temporada : {item['item'].SeasonName} {"\n"} 
                                Temporada Data : {'Cargada y validada.'} {"\n"} {"\n"}
                                {finalDate } {"\n"}    
                        </Text>
                  <TouchableOpacity style={{right:20, marginTop:2}}  onPress={()=>{deleteRegisterFromAsync(pendingWork, item.index, update, setUpdate)}} >
                    <Entypo name={'cross'} size={20}color={'#000000'} />
                  </TouchableOpacity>     
                  </View>
            )
              case 'Eliminacion de Temporada':
                return (
                  <View style={styles.item} >
                      <Text style={styles.title}> 
                                    Usuario Responsable : {item['item'].userName} {"\n"} {"\n"}
                                    Operacion : {item['item'].Operation} {"\n"} 
                                    Email :{item['item'].userMail} {"\n"}
                                    User ID : {item['item'].userID} {"\n"}  {"\n"}
                                    Nombre Temporada : {item['item'].SeasonName} {"\n"}
                                    Temporada ID : {item['item'].SeasonID} {"\n"} {"\n"}
                                    {finalDate } {"\n"}    
                            </Text>
                            <TouchableOpacity style={{right:20, marginTop:2}}  onPress={()=>{deleteRegisterFromAsync(pendingWork, item.index, update, setUpdate)}} >
                    <Entypo name={'cross'} size={20}color={'#000000'} />
                  </TouchableOpacity>    
                      </View>
                )
                case 'Eliminacion de Noticia':
                  return (
                    <View style={styles.item} >
                        <Text style={styles.title}> 
                                      Usuario Responsable : {item['item'].userName} {"\n"} {"\n"}
                                      Operacion : {item['item'].Operation} {"\n"} 
                                      Email :{item['item'].userMail} {"\n"}
                                      User ID : {item['item'].userID} {"\n"}  {"\n"}
                                      Noticia Data : {'Cargada y validada.'} {"\n"} {"\n"}
                                      {finalDate } {"\n"}    
                              </Text>
                  <TouchableOpacity style={{right:20, marginTop:2}}  onPress={()=>{deleteRegisterFromAsync(pendingWork, item.index, update, setUpdate)}} >
                    <Entypo name={'cross'} size={20}color={'#000000'} />
                  </TouchableOpacity>    
                        </View>
                  )
        }
  }

  const uploadData =(pendingWork)=>{

    for(const item of pendingWork){

      if(CheckConnectivity){
        switch(item.Operation){
          case 'Eliminacion de Noticia':
            console.log("info "  + JSON.stringify(item.NewData) )
             deleteNew(item.NewData, userID, userMail, userName, pendingWork, dispatch)
             deleteRegisterFromAsync(pendingWork, item.index, update, setUpdate)
          break

          case 'Eliminacion de Temporada':
            deleteSeason(item.temporadaData, "Temporadas", userID, userMail, userName, pendingWork, dispatch)
            deleteRegisterFromAsync(pendingWork, item.index, update, setUpdate)
          break

          case 'Actualizacion de Producciones' :
            SearchAndUpdate(item.temporadaData, "Temporadas", null, null, item.temporadaProduccionBruta,
              item.temporadaProduccionPerdida, null, null, userID, userMail, userName, pendingWork, dispatch)
            deleteRegisterFromAsync(pendingWork, item.index, update, setUpdate)
          break

          case 'Cerrar Temporada' :
            CloseSeason(item.temporadaData, "Temporadas", null, null, null, null, userID, userMail, userName, pendingWork, dispatch)
            deleteRegisterFromAsync(pendingWork, item.index, update, setUpdate)
  
          break

          case 'Eliminacion de Evento' :
            deleteEvent(item.mainIndex, item.temporadaID, null, userID, userMail, userName, pendingWork, dispatch)
            deleteRegisterFromAsync(pendingWork, item.index, update, setUpdate)
          break
          
          case 'Creacion de Evento' :
            UploadEventtoFirestore(item.testigoName, item.latitude, item.longitude, item.temporadaData ,item.testigoDescripcion, 
              null, null, userID, userMail, userName, pendingWork, dispatch)
            deleteRegisterFromAsync(pendingWork, item.index, update, setUpdate)
          break
          
          case 'Creacion de Temporada' :
            UploadSeasontoFirestore(item.temporadaNombre, item.tipoProduccion,
              null, null, userID, userMail, userName, pendingWork, dispatch)
            deleteRegisterFromAsync(pendingWork, item.index, update, setUpdate)
          break
        }
      } else {
        Alert.alert("No hay Conexion ...", " ", [{ text: "Continuar", onPress: () => {return null}}])
      }
    }
  }

  return (
    <>
    { pendingWork ?
      <>
      <FlatList
      data={pendingWork}
      renderItem={(item, index)=>renderItem(item, index)}
      keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.button} >
        <Button 
        title='Intentar Subir' color='#1894F8'
        onPress={() => uploadData(pendingWork) } />   
      </View>
      </>
      :
      <ActivityIndicator style={styles.activityStyle} />
    }
    </>
)}

export default NoConectionScreen;

const styles = StyleSheet.create({
  activityStyle:{
    size:"large",
    color:"#0000ff"
  },
  item: {
    backgroundColor: '#C4C4C4',
    padding: 0,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:10,
    flexDirection:'row',
    borderWidth: 1,
  },
  title: {
    marginTop:10,
    fontSize: 15,
    alignSelf:'center',
    marginLeft:40
  },
  button:{
    marginBottom:20,
  //  height:'100%',
    width:'95%',
    borderRadius:10,
    alignSelf:'center'
  },
  deleteRegister: {
    borderRadius: 30,
    backgroundColor: '#0080ff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    elevation: 5,
    left:10,
    marginTop:5
  },
  
})