import React, { useState, createRef } from "react";
import { SafeAreaView, StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView } from "react-native";

import { LoginAuthentification } from '../functions/firebase-auth-functions'
import SpecialTextInput from "../components/SpecialTextInput"

import { useDispatch } from 'react-redux'

const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errortext, setErrortext] = useState("");
  const passwordInputRef = createRef();
  const dispatch = useDispatch()

  return (
    <SafeAreaView style={styles.mainBody}>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollview}>
      <KeyboardAvoidingView enabled>
        <Image source={require("../../assets/LogoSegundario.jpg")} style={styles.image}/>
        <View style={styles.sectionStyle}>
          <SpecialTextInput setData={setUserEmail} refer={passwordInputRef} type='caso 1' />
        </View>
        <View style={styles.sectionStyle}>
          <SpecialTextInput setData={setUserPassword} refer={passwordInputRef} type='caso 2'/>   
        </View>
        {errortext != "" ? (
          <Text style={styles.errorTextStyle}>{" "}{errortext}{" "}</Text>) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={()=>LoginAuthentification(userEmail, userPassword, navigation, setErrortext, dispatch)}>
              <Text style={styles.buttonTextStyle}> Ingresar ! </Text>
            </TouchableOpacity>
              <Text style={styles.registerTextStyle} onPress={() => navigation.navigate("RegisterScreen")}>
                Nuevo usuario ? Registrate !
              </Text>
      </KeyboardAvoidingView>
    </ScrollView>
  </SafeAreaView>
)}

export default LoginScreen;

const styles = StyleSheet.create({
mainBody: {
  flex: 1,
  justifyContent: "center",
  backgroundColor: "#1894F8",
  alignContent: "center",
},
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
  marginTop: 20,
  marginBottom: 25,
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
registerTextStyle: {
  color: "#FFFFFF",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: 14,
  alignSelf: "center",
  padding: 10,
},
errorTextStyle: {
  color: "red",
  textAlign: "center",
  fontSize: 14,
},
image:{
  width: "80%",
  height: 100,
  resizeMode: "contain",
  margin: 30,
  alignItems: "center"
},
scrollview:{
  flex: 1,
  justifyContent: "center",
  alignContent: "center",
}})
