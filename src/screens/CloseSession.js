import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { GetSpecificValueFromAsyncStorage } from '../storage/storage-functions'
import { GetCurrentSpecificInfo } from '../functions/firebase-auth-functions'
import { lauchCameraOrLibrary} from '../functions/general-functions'
import { CheckConnectivity } from '../functions/general-functions'

import { Logout } from '../functions/firebase-auth-functions'
import ProfileButton from '../components/ProfileButton'

const CloseSession = ({ navigation }) => { 
const [userCompleteName, setUserCompleteName] = useState('Profile Screen')
const [userEmail, setUserEmail] = useState('email')
const [update, setUpdate] = useState(false)
const [finalUrl, setFinalUrl] = useState(null)

useEffect(()=>{

    if(CheckConnectivity()){
        GetCurrentSpecificInfo('userCompleteName', setUserCompleteName)
        GetCurrentSpecificInfo('email', setUserEmail)
      } else { 
        GetSpecificValueFromAsyncStorage('userCompleteName', setUserCompleteName)
        GetSpecificValueFromAsyncStorage('email', setUserEmail)
      }
},[]) 

useEffect(()=>{ 
    GetSpecificValueFromAsyncStorage('ProfilePicturePath', setFinalUrl)
},[update]) 

return( 
    <View style={styles.container} >
        <View style={styles.box} > 
        { !finalUrl ?
            <Image style={styles.userImg} source={require('../../assets/ProfilePic.png')} /> 
            :
            <Image style={styles.userImg} source={{uri: finalUrl}} /> 
        }
        <Text style={styles.text}> {userCompleteName} </Text>
        <Text style={styles.credits}> Correo : {userEmail} </Text>
        <TouchableOpacity
            style={styles.plusButton}
            onPress={()=>lauchCameraOrLibrary(null, "Profile", null, null, null, null, null, update, setUpdate) }>
                <FontAwesome5
                    name={'plus'}
                    size={20}
                    color={'#ffffff'}/>
            </TouchableOpacity  >
  
            <ProfileButton title='Cerrar Sesion' closeFunction={Logout} navigation={navigation} />
          
        </View>
    </View>
)
}

export default CloseSession

const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:"#ffffff"
},
text:{
    fontSize:20,
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    alignSelf:'center',
    marginTop:90,
    marginBottom:20
},
credits:{
    fontSize:16,
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    alignSelf:'flex-start',
    marginTop:10,
    marginLeft:40
},
email:{
    fontSize:14,
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    alignSelf:'center',
    marginTop:20
},
userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
    alignSelf:'center',
    marginTop:30,
},
box:{
    marginTop: 30,
    paddingVertical: 8,
    borderWidth: 0,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#C5DEFF",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    height:'90%',
    width:'90%',
    alignSelf:'center'
  },
  plusButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#2F7FF3',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 415,
    right: 115,
    elevation: 5
  }
})
