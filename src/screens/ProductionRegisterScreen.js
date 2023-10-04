import React, { useEffect, useState } from 'react'  
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native' 

import { GetCollectionOrderByDate } from '../functions/firebase-firestore-funtions'

const ProductionRegisterScreen = ({navigation}) => {
  const [registros, setRegistros ] = useState(null)

  let collection = 'Registros'

  useEffect(() => {
    GetCollectionOrderByDate(collection, setRegistros)
   }, [])

   const renderItem =  ( event  ) => {
    var transformDate = new Date(1970, 0, 1); 
      transformDate.setSeconds(event['item'].fecha.seconds) 
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

    switch(event['item'].Operation) {

      case 'Creacion de Evento':
      return(    
        <View style={styles.itemEvent} >
        <Text style={styles.title}> 
                      Usuario Responsable : {event['item'].userName} {"\n"} {"\n"}
                      Tipo de Operacion :{event['item'].Operation} {"\n"} 
                      Email :{event['item'].userMail} {"\n"}
                      User ID : {event['item'].userID} {"\n"}  {"\n"} 
                      Evento Nombre: {event['item'].EventName} {"\n"} 
                      Evento ID : {event['item'].EventID} {"\n"}{"\n"}  
                      {finalDate } {"\n"}    
              </Text>
        </View>
        )
        case 'Actualizacion de Producciones' :
        return(
          <View style={styles.item} >
          <Text style={styles.title}> 
                        Usuario Responsable : {event['item'].userName} {"\n"} {"\n"}
                        Operacion : {event['item'].Operation} {"\n"} 
                        Email :{event['item'].userMail} {"\n"}
                        User ID : {event['item'].userID} {"\n"}  {"\n"} 
                        {finalDate } {"\n"}    
                </Text>
          </View>
        )
        case 'Cerrar Temporada' :
        return(
          <View style={styles.item} >
          <Text style={styles.title}> 
                        Usuario Responsable : {event['item'].userName} {"\n"} {"\n"}
                        Operacion : {event['item'].Operation} {"\n"} 
                        Email :{event['item'].userMail} {"\n"}
                        User ID : {event['item'].userID} {"\n"}  {"\n"} 
                        Temporada : {event['item'].SeasonName} {"\n"} 
                        Evento ID : {event['item'].SeasonID} {"\n"}{"\n"}  
                        {finalDate } {"\n"}    
                </Text>
          </View>
        )
        case 'Creacion de Temporada' :
        return(
          <View style={styles.item} >
          <Text style={styles.title}> 
                        Usuario Responsable : {event['item'].userName} {"\n"} {"\n"}
                        Operacion : {event['item'].Operation} {"\n"} 
                        Email :{event['item'].userMail} {"\n"}
                        User ID : {event['item'].userID} {"\n"}  {"\n"} 
                        Temporada : {event['item'].SeasonName} {"\n"} 
                        Evento ID : {event['item'].SeasonID} {"\n"}{"\n"}  
                        {finalDate } {"\n"}    
                </Text>
          </View>
        )
        case 'Eliminacion de Evento' :
        return(
          <View style={styles.itemDeleted} >
          <Text style={styles.title}> 
                        Usuario Responsable : {event['item'].userName} {"\n"} {"\n"}
                        Operacion : {event['item'].Operation} {"\n"} 
                        Email :{event['item'].userMail} {"\n"}
                        User ID : {event['item'].userID} {"\n"}  {"\n"} 
                        Evento : {event['item'].EventName} {"\n"}   
                        Evento ID : {event['item'].EventID} {"\n"}  {"\n"} 
                        {finalDate } {"\n"}    
                </Text>
          </View>
        ) 
        case 'Eliminacion de Temporada' :
        return(
          <View style={styles.itemDeleted} >
          <Text style={styles.title}> 
                        Usuario Responsable : {event['item'].userName} {"\n"} {"\n"}
                        Operacion : {event['item'].Operation} {"\n"} 
                        Email :{event['item'].userMail} {"\n"}
                        User ID : {event['item'].userID} {"\n"}  {"\n"} 
                        Temporada : {event['item'].SeasonName} {"\n"}   
                        Temporada ID : {event['item'].SeasonID} {"\n"}  {"\n"} 
                        {finalDate } {"\n"}    
                </Text>
          </View>
        )  
        case 'Eliminacion de Noticia' :
        return(
          <View style={styles.itemDeleted} >
          <Text style={styles.title}> 
                        Usuario Responsable : {event['item'].userName} {"\n"} {"\n"}
                        Operacion : {event['item'].Operation} {"\n"} 
                        Email :{event['item'].userMail} {"\n"}
                        User ID : {event['item'].userID} {"\n"}  {"\n"} 
                        Noticia : {event['item'].NewData.tituloNoticia} {"\n"}   {"\n"}   
                        Descripcion : {event['item'].NewData.contenidoNoticia} {"\n"}  
                        {finalDate } {"\n"}    
                </Text>
          </View>
        )                
    }
  }

  return (
    <>   
        { !registros ? 
              <>
                  <ActivityIndicator style={styles.activityStyle} />
              </>
            :
            <>
            <Text style={styles.heading}> Actividades Registradas </Text>
            <View style={{marginTop:20}} />
              <FlatList
                  data={registros}
                  renderItem={(item, index)=>renderItem(item, index)}
                  keyExtractor={(item, index) => index.toString()}
              /></>
          }
    </>

)}

export default ProductionRegisterScreen;

const styles = StyleSheet.create ({  
  item: {
      backgroundColor: '#E5FFD8',
      padding: 0,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius:10,
      flexDirection:'row',
      borderWidth: 1,
    },
    itemDeleted: {
      backgroundColor: '#FEC7C7',
      padding: 0,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius:10,
      flexDirection:'row',
      borderWidth: 1,
    },
    itemEvent: {
      backgroundColor: '#C7F3FE',
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
      marginLeft:40
    },
    heading: {
      fontSize: 20,
      textAlign: 'center',
      marginVertical: 10,
      color:'#000000',
      marginTop:20,
      marginBottom:-5
   },  
}) 