import React, { useState, useEffect } from "react";
import { SafeAreaView, ActivityIndicator, View, StyleSheet, Image} from "react-native";

import { GetCollection } from '../functions/firebase-firestore-funtions'
import { UpdateAllInternMemory } from  '../functions/general-functions'
import { Close } from  '../functions/firebase-auth-functions'
import { SaveInRedux } from '../redux/redux-functions'
import { useDispatch } from "react-redux"

const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true)

  const [temporadas, setTemporadas] = useState()
  const [noticias, setNoticias] = useState()
  const [frutasyVegetales, setFrutasyVegetales] = useState()
  const [testigos, setTestigos] = useState()
  const [empresas, setEmpresas] = useState()

  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  let collection = 'Temporadas'
  let collection2 = 'Testigos'
  let collection3 = 'FrutasyVegetales'
  let collection4 = 'Noticias'
  let collection5 = 'Empresas'

  useEffect(() => {
    UpdateAllInternMemory(dispatch)
   /* GetCollection(collection, setTemporadas, false)
    GetCollection(collection2, setTestigos, false)
    GetCollection(collection3, setFrutasyVegetales,false)
    GetCollection(collection4, setNoticias, false)
    GetCollection(collection5, setEmpresas, false) */
  }, [user])  
  
   useEffect(() => {
    Close(setUser)
    setTimeout(() => {
      setAnimating(false)
      if(user){
        navigation.replace("DrawerNavigator") 
      /*  SaveInRedux(collection, temporadas, dispatch )
        SaveInRedux(collection2, testigos, dispatch )
        SaveInRedux(collection3, frutasyVegetales, dispatch )
        SaveInRedux(collection4, noticias, dispatch )
        SaveInRedux(collection5, empresas, dispatch )*/
      }else{
        navigation.replace("LoginScreen")
      }
    }, 5000);
  }, [user])  

  return (
    <SafeAreaView style={styles.stylesheet}>
      <View style={styles.container}>
        <Image source={require("../../assets/LogoPrincipal.png")} style={styles.image} />
        <ActivityIndicator animating={animating} color="#FFFFFF"size="large" style={styles.activityIndicator}/>
      </View>
    </SafeAreaView>
  )}

export default SplashScreen;

const styles = StyleSheet.create({
  stylesheet:{
    flex:1,
    backgroundColor:'#1894F8'
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
  image:{
    width: "90%",
    resizeMode: "contain",
    margin: 30,
  }
})