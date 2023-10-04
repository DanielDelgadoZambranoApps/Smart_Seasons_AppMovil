import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import { useDispatch } from 'react-redux'

import { GetCollectionFromAsyncStorage, GetSpecificValueFromAsyncStorage  } from '../storage/storage-functions'
import { GetCollectionOrderByDate, deleteNew } from '../functions/firebase-firestore-funtions'
import { GetCurrentUserSpecificInfo } from '../functions/firebase-auth-functions'

import NewsImages from '../components/NewsImages';
import { CheckConnectivity } from '../functions/general-functions'

const NewsScreen = ({navigation, route}) => {
  const [infoNoticias, setInfoNoticias] = useState(null)
  const [pendingWork, setPendingWork] = useState([])
  const [userID, setUserID] = useState('userid')
  const [userMail, setUserMail] = useState('useremail')
  const [userName, setUserName] = useState('userfullname')
  const dispatch = useDispatch()

  let collection = 'Noticias'

  useEffect(() => {
    GetCollectionOrderByDate(collection, setInfoNoticias)
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

const ItemSeparatorView = () => { return <View style={styles.view_alternative}/> }

const ItemView = ({ item }) => {

  var transformDate = new Date(1970, 0, 1); // Epoch
      transformDate.setSeconds(item.fecha.seconds)

      const dateNumber =Number(transformDate.toString().length ) - Number(17)
      let finalDate = ""
      let i = 0

      for(const letra of transformDate.toString()){
      finalDate = finalDate + letra
      if(Number(i)  > Number(dateNumber)){
        break
      } else{
        i= i + 1
      }}

  return (
    <>
      <ScrollView>
        <View style={styles.container} >
          <Text style={styles.titulo} >  { item.tituloNoticia } </Text>
          <Text style={styles.contenido}>  {item.contenidoNoticia} </Text>
          <Text style={styles.fecha}>  { finalDate } </Text>
          <NewsImages collection={collection} itemId={item.id}  hasImage={item.hasImage} />
          <TouchableOpacity
                style={styles.deleteNew} onPress={()=>deleteNew(item, userID, userMail, userName, pendingWork, dispatch)} >
                  <Entypo
                        name={'cross'}
                        size={20}
                        color={'#ffffff'}/>
                </TouchableOpacity>
        </View>
      </ScrollView>
    </>
)}

  return (
    <>
    { !infoNoticias ?
        <ActivityIndicator style={styles.activityStyle} />
        :
        <View style={styles.primaryContainer}  > 
          <FlatList
              data={infoNoticias}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={(item)=>ItemView(item)}
              keyExtractor={(item, index) => index.toString()} />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>navigation.navigate('Redactar Noticia') }>
                    <FontAwesome5
                        name={'plus'}
                        size={20}
                        color={'#ffffff'}/>
                </TouchableOpacity>
        </View>
        
    }
    </>
)}

export default NewsScreen;

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
    backgroundColor: "#E1F3FF",
    marginBottom:10,
  },
  titulo:{
    fontSize:20,
    color:'#000000',
    alignSelf:'center',
    marginTop:10,
    textDecorationLine:'underline'
  },
  contenido:{
    marginTop:30,
    alignSelf:'center',
    alignItems:'center',
    marginLeft:20,
    marginRight:30,
    justifyContent:'center',
    alignContent:'center',
    textAlign:'center',
    fontWeight: 'bold',

  },
  fixingview:{
    marginBottom:10
  },
  box:{
    marginLeft:10
  },
  hasImage:{
    marginLeft:300,
    marginTop:10,
    color:'#1894F8',
    marginBottom:10,    
  },
  view:{
    height: 0.5,
    width: "100%",
    backgroundColor: "#C8C8C8",
  },
  container: {
    marginTop: 16,
    paddingVertical: -4,
    borderWidth: 1,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#B8E0FC",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginLeft:10,
    marginRight:10
  },
  fecha:{
    marginTop:10,
    alignSelf:'center'
  },
  activityStyle:{
    size:"large",
    color:"#0000ff",
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0080ff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
    right: 20,
    elevation: 5,
},
deleteNew: {
  borderRadius: 30,
  backgroundColor: '#0080ff',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  right: 0,
  elevation: 5,
  right:5,
  marginTop:5
},
})



