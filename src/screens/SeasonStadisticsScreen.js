
import React, { useState, useEffect } from 'react'  
import { StyleSheet, View, Text, Button, Image, SafeAreaView, ScrollView, ImageBackground }  from 'react-native'  

import { GetCollection } from '../functions/firebase-firestore-funtions'
import MyPickerAlternative from '../components/MyPickerAlternative';

const SeasonStadisticsScreen = ({ navigation }) => {

  const [temporadas, setTemporadas] = useState([])
  const [temporadaName, setTemporadaName] = useState(null)
  let [temporadaData, setTemporadaData] = useState(null)
  let collection = 'Temporadas'
  let collectionValue = 'temporadaNombre'

    useEffect(() => {
      GetCollection(collection, setTemporadas, true)
    }, [])

      return (
          <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../../assets/Background.jpg')} resizeMode="cover" style={styles.imageback}>
            <ScrollView style={styles.scrollViewStyle}>
            <View style={styles.inputContainer}>
              <Text style={styles.heading}> Seleccione la Temporada </Text>
                <View style={styles.view}>
                  <Image source={require("../../assets/Estadisticas.jpg")} style={styles.image} />
                </View>
                  <View>  
                  <MyPickerAlternative param={temporadaName} groupParam={temporadas} functionParam={setTemporadaName} functionParam2={setTemporadaData} attribute={collectionValue} />
                      <View style={styles.space} />
                        <Button 
                        onPress={() =>  navigation.navigate('StadisticsGraphicScreen', { temporada: temporadaData})}                     
                        title='Ver Estadisticas de la Temporada' color='#1894F8' />    
                  </View> 
                  </View>
                </ScrollView>
                </ImageBackground>
            </SafeAreaView> 

  )}
  
  export default SeasonStadisticsScreen;
  
  const styles = StyleSheet.create({
  scrollViewStyle:{
    flex:1
  },
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  heading: {
     fontSize: 20,
     textAlign: 'center',
     marginVertical: 10,
     color:'#000000',
     marginBottom:60,
     marginTop:30
  },  
  inputContainer: {
     margin: 20
  },
  image:{
    width: "100%",
    height: 200,
    resizeMode: "contain",
    margin: 10,
    marginBottom:20
  },
  view:{ 
    alignItems: "center",
    marginBottom:30
  },
  space:{
    marginBottom:135
  },
    imageback: {
    flex: 1,
    justifyContent: "center"
  },
})
  
  
  
  
  
  
  
  