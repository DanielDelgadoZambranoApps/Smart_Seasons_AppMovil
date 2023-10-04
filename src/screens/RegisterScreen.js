import React, { useState, createRef } from "react"
import { SafeAreaView, StyleSheet, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, ScrollView } from "react-native"
import { Picker } from '@react-native-picker/picker';

import { RegisterInFirebase } from '../functions/firebase-auth-functions'
import SpecialTextInput from '../components/SpecialTextInput'

const RegisterScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordAgain, setUserPasswordAgain] = useState("");
  const [errortext, setErrortext] = useState("")

  const [value, setValue] = useState("")

  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  return (
    <SafeAreaView style={styles.safeAreaView} >

        
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollview}>
          <View style={styles.view}>
            <Image source={require("../../assets/LogoSegundario.jpg")} style={styles.image} />
          </View>

          <Text style={{left:42, fontSize:16.5, color:'#ffffff', marginTop:15, marginBottom:10}} >
            Seleccione su Empresa</Text>
          <Picker
            selectedValue={value}
            style={{ height: 50, width: '80%', color:"#ffffff", left :28, marginBottom:10 }}
            onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
            >
            <Picker.Item label="Agronomos Inc" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker> 


          <KeyboardAvoidingView enabled>
          <View style={styles.sectionStyle}>
          <SpecialTextInput setData={setUserName} refer={passwordInputRef} type='caso 3' emailInputRef={emailInputRef} />   
          </View>
          <View style={styles.sectionStyle}>
          <SpecialTextInput setData={setUserEmail} refer={passwordInputRef} type='caso 4' emailInputRef={emailInputRef}/>   
          </View>
          <View style={styles.sectionStyle}>
          <SpecialTextInput setData={setUserPassword} refer={passwordInputRef} type='caso 5'/>   
          </View>
          <View style={styles.sectionStyle}>
          <SpecialTextInput setData={setUserPasswordAgain} refer={passwordInputRef} type='caso 6'/> 
       
  
          </View>
          {errortext != "" ? (
          <Text style={styles.errorTextStyle}>
            {" "}
            {errortext}{" "}
          </Text> ) : null}

          


          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={()=> RegisterInFirebase(userName, userEmail, userPassword, setErrortext, navigation,)}>
            <Text style={styles.buttonTextStyle}>
              Registrarme  
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )}

export default RegisterScreen;

const styles = StyleSheet.create({
  sectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 50,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  safeAreaView:{ 
    flex: 1, 
    backgroundColor: "#1894F8" 
  },
  view:{ 
    marginTop:50,
    alignItems: "center",
    marginBottom:10
  },
  image:{
    width: "50%",
    height: 100,
    resizeMode: "contain",
  },
  scrollview:{
    justifyContent: "center",
    alignContent: "center",
  }
})