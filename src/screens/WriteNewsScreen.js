import React, {useEffect, useState} from 'react';
import { View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert, Text } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 
import { useDispatch } from 'react-redux'

import MyButton from '../components/MyButton'
import MyTextInput from '../components/MyTextInput'

import { lauchCameraOrLibrary } from '../functions/general-functions'
import { UploadNew } from '../functions/firebase-firestore-funtions';
import { ScrollView } from 'react-native-gesture-handler';

const WriteNewsScreen = ({navigation}) => {
    
  const [tituloNoticia, setTituloNoticia ] = useState('')
  const [contenidoNoticia, setContenidoNoticia ] = useState('')
  const [images, setImages] = useState(null)
  const dispatch = useDispatch()
  const [hasImage, setHasImage] = useState(false)
  let collectionName ='Noticias'

  useEffect(()=>{
    setImages(null)
  },[])

  return (
    <>
    <SafeAreaView style={styles.container}>
        <ScrollView>
            <View style={styles.inputContainer}> 
                <MyTextInput param={tituloNoticia} placeholder='Titulo de la Noticia' functionParam={setTituloNoticia}/>
                <TextInput style={styles.textInput2} 
                    value={contenidoNoticia}
                    placeholder='Descripcion de la Noticia'
                    onChangeText={(value) => setContenidoNoticia(value)}
                    autoComplete="off"
                    multiline />
            </View>
            { hasImage ? 
            <Text style={styles.text} >Contenido agregado con exito ! </Text>
            : <Text style={styles.text}>No hay contenido seleccionado </Text>
            }
            <View style={styles.view} >      
                <MyButton  title={'Subir Noticia'} customClick={()=> UploadNew(tituloNoticia, contenidoNoticia,
                     setTituloNoticia, setContenidoNoticia, hasImage, setHasImage, collectionName, images, navigation, dispatch) } />
                <TouchableOpacity
                style={styles.button}
                onPress={()=>lauchCameraOrLibrary(setHasImage, "News", null, collectionName, setImages) }>
                    <FontAwesome5
                        name={'camera'}
                        size={33}
                        color={'#ffffff'}/>
                </TouchableOpacity>
            </View>   
        </ScrollView>
    </SafeAreaView>  
</>
)}

export default WriteNewsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    },
    inputContainer: {
        margin: 30
    },
    textInput: {
        height: 42,
        textAlign: "center",
        color: "#333333",
        fontSize: 18,
        borderWidth: 1,
        borderBottomColor: "#111111",
        marginBottom:30,
        borderRadius:5
    },
    textInput2: {
        height: 300,
        textAlign: "center",
        color: "#333333",
        marginBottom: 10,
        fontSize: 18,
        borderWidth: 1,
        borderBottomColor: "#111111",
        borderRadius:10,
        marginTop:40
    },
    view:{
        alignSelf:'center',
        marginTop:120,
        width:350,
        
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#0080ff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 100,
        right: 15,
        elevation: 5,
    },
    text:{
        textAlign:'center'
    }
})