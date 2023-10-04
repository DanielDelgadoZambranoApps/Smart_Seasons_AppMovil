import { Alert } from "react-native"
import auth from "@react-native-firebase/auth"

import { CheckConnectivity, SaveCredentials, DeleteCredentials, CredentialsExists, UpdateAllInternMemory } from "./general-functions"
import { GetAllPermissions } from "./permissions-functions"
import { SaveInRedux } from "../redux/redux-functions"
import { SaveInStorage } from "../storage/storage-functions"

export const Close = (setUser) =>{
    const subscriber = auth().onAuthStateChanged((user) => {
        console.log("user", JSON.stringify(user));
        setUser(user);
    })
      return subscriber;
}
  
export const Logout = (navigation) => {
    Alert.alert(
      "Cerrar Sesion",
      "¿Esta seguro que desea salir?",
      [
        {
          text: "Cancelar",
          onPress: () => {
            return null;
          },
        },
        {
          text: "Salir",
          onPress: () => {
            auth()
              .signOut()
              .then(() => navigation.navigate("LoginScreen"))
              .catch((error) => {
                console.log(error);
                if (error.code === "auth/no-current-user")
                  navigation.replace("LoginScreen");
                else alert(error);
              });
          },
        },
      ],
      { cancelable: false }
    )
  }

export const LoginAuthentification = (userEmail, userPassword, navigation, setErrortext, dispatch) => {
  if (CheckConnectivity()){
    setErrortext("")
      if (!userEmail) {
        alert("Rellene su correo electronico !");
        return
      }
      if (!userPassword) {
        alert("Please fill Password");
        return
      }
      auth()
        .signInWithEmailAndPassword(userEmail, userPassword)
        .then((user) => {
          console.log(user)
        GetAllPermissions()
        UpdateAllInternMemory(dispatch)
        SaveCredentials(userEmail, userPassword)
        SetCurrentUserSpecificInfo()
          if (user) navigation.navigate("DrawerNavigator")
        })
        .catch((error) => {
          console.log(error);
          if (error.code === "auth/invalid-email")
            setErrortext(error.message);
          else if (error.code === "auth/user-not-found")
            setErrortext("No se encontro el usuario");
          else {
            setErrortext(
              "Por favor comprueba su email/password"
            )}
    })
   } else {
    Alert.alert("No hay Conexion ...", " ", [{ text: "Continuar", onPress: () => {return null}}])
    if(CredentialsExists()){
      navigation.navigate("DrawerNavigator");
    }
  }
}

export const RegisterInFirebase = (userName, userEmail, userPassword, setErrortext, navigation) => {
    setErrortext("");
    if (!userName) return alert("Please fill Name")
    if (!userEmail) return alert("Please fill Email")
    if (!userPassword) return alert("Please fill Address")
    auth()
      .createUserWithEmailAndPassword(
        userEmail,
        userPassword
      )
      .then((user) => {
        console.log(
          "Registration Successful. Please Login to proceed"
        )
        console.log(user);
        if (user) {
          auth().currentUser.updateProfile({
              displayName: userName,
              photoURL:
                "https://aboutreact.com/profile.png",
            })
            .then(() => navigation.navigate("LoginScreen"))
            .catch((error) => {
              alert(error);
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
          setErrortext(
            "Existe una cuenta asosiada a este correo !"
          );
        } else {
          setErrortext(error.message);
}})}

export const GetCurrentUserSpecificInfo = (userValue, setFunction) =>{
  auth().onAuthStateChanged((user) => {
    if(user){
      switch(userValue){
        case 'id':
          setFunction(user.uid)
        break
        case 'userCompleteName':
          setFunction(user.displayName)
        break
        case 'email':
          setFunction(user.email)
        break
      }
    }
  })
}

export const SetCurrentUserSpecificInfo = () =>{
  auth().onAuthStateChanged((user) => {
    if(user){
      SaveInStorage('id', user.uid)
      SaveInStorage('userCompleteName', user.displayName)
      SaveInStorage('email', user.email)
      SaveInRedux('id', user.uid)
      SaveInRedux('userCompleteName', user.displayName)
      SaveInRedux('email', user.email) 
    }
  })
}

export const GetCurrentSpecificInfo = (userValue, setFunction) =>{
  auth().onAuthStateChanged((user) => {
    if(user){
      switch(userValue){
        case 'id':
          setFunction(user.uid)
        break
        case 'userCompleteName':
          setFunction(user.displayName)
        break
        case 'email':
          setFunction(user.email)
        break
      }
    }
  })
}
