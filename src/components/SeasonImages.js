import React, { useState, useEffect } from 'react'
import { StyleSheet, Modal, TouchableOpacity, Image, View, Text, Alert } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import ImageViewer from 'react-native-image-zoom-viewer'
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import RNPrint from 'react-native-print'

import { getFullStorageItemPath, listFilesAndDirectoriesGeneric } from '../functions/firebase-storage-functions'
import { CheckConnectivity, downloadImageWhitRNFetchBlob ,downloadImagesWhitRNFetchBlob} from '../functions/general-functions'
import { GetSpecificValueFromAsyncStorage } from '../storage/storage-functions'
import { GetCurrentSpecificInfo } from '../functions/firebase-auth-functions'

const MainLogoUrl= "https://firebasestorage.googleapis.com/v0/b/apptitulacion2.appspot.com/o/MainLogo%2FMainLogo%2FMainLogo.png?alt=media&token=46472f88-907c-4255-96cf-e25f78adf5ce"

const SeasonImages = ({collection, itemId, testigoName, descripcion, longitud, latitude}) => {
    const [userID, setUserID] = useState('userid')
    const [userMail, setUserMail] = useState('useremail')
    const [userName, setUserName] = useState('userfullname')

    const [isLoading, setIsLoading] = useState(true)
    const [visible, setVisible] = useState(false)
    const [listData, setListData] = useState(null)

    let [imagesUrlsArray, setImagesUrlsArray] = useState(null)
    let [imagesEventsData, setImagesEventsData] = useState(null)
    const [logoImage, setLogoImage] = useState(null)
    const [state, setState] = useState(true)
    
    const date  = new Date()

    useEffect(()=>{
      downloadImageWhitRNFetchBlob(MainLogoUrl, setLogoImage)
    },[])

    useEffect(()=>{
      if(CheckConnectivity()){ 
        GetCurrentSpecificInfo('id', setUserID)
        GetCurrentSpecificInfo('userCompleteName', setUserName)
        GetCurrentSpecificInfo('email', setUserMail)
      } else {  
        GetSpecificValueFromAsyncStorage('id', setUserID)
        GetSpecificValueFromAsyncStorage('userCompleteName', setUserName)
        GetSpecificValueFromAsyncStorage('email', setUserMail)  
      }
    }, [])

    useEffect(()=>{
        listFilesAndDirectoriesGeneric("", collection, itemId, setListData)
    },[])

    useEffect(()=>{
      let imagesUrlsArray = []
        if(listData){
          let filename 
          for (const subitem of listData){
            filename = subitem.path.substring(subitem.path.lastIndexOf('/') + 1)
            getFullStorageItemPath(collection, itemId, filename, imagesUrlsArray, setIsLoading )
          }
          setImagesUrlsArray(imagesUrlsArray)
        }
      },[listData]) 


    const generatePDF =()=>{

      const dateNumber =Number(date.toString().length ) - Number(19)
      let finalDate=""
      let i=0

      if(imagesUrlsArray) {
        downloadImagesWhitRNFetchBlob(imagesUrlsArray , setImagesEventsData)
      }

    for(const letra of  date.toString()){
        finalDate = finalDate +letra
        if(Number(i)  > Number(dateNumber)){
            break
          } else{
            i= i + 1
          }
    }

    let text = ""
    let index = 0 
    let side = "left"

    if(imagesEventsData){
      for(const image of imagesEventsData){
        if(side = "left"){
          text =  text + '<img src="data:image/png;base64,'+ image  +'"  width="32%" height="32%"/>"'
          side="right"
        } else {
          text = text + '<img src="data:image/png;base64,'+ image  +'"  width="32%" height="32%" align="right"/>"'
          side="left"
        }
        index= index + 1
      }
    }
    
    if(logoImage && imagesEventsData ){
         RNPrint.print({
            html:
            '<html>'+
              '<h1 align="center" >Informe de Eventos</h1>'+
                '<img src="data:image/png;base64,'+ logoImage  +'"  width="100%" height="90%"  />"'+
            '<br>'+
            '<br>'+
              '<h3 align="center" >Fecha de Emision :' +  finalDate + '</h3>'+
              '<h3 align="center" >' + userName + '</h3>'+
              '<h3 align="center" >Empresa : Uvas S.A</h3>'+
              '<br>'+ '<br>'+'<br>'+'<br>'+'<br>'+
            '<body>'+
              '<h3 align="center" > '+ testigoName + '</h3>'+
              '<br>'+
              '<p> Descripcion : '+ descripcion + '</p>'+
              '<p> Latitud : '+ latitude + '</p>'+
              '<p> Longitud : '+ longitud + '</p>'+
              '<br>'+
                text+
            '</body> '+ 
              '<br>'+'<br>'+'<br>'+
              '<h5 align="left" >Fecha de Emision :' +  date + '</h5>'+
            '</html>',
            })
    }
  }

  return ( 
    <>
            { isLoading || !imagesUrlsArray || !imagesUrlsArray['0'] || !imagesUrlsArray['0'].url ?

                <View style={{flexDirection:'column'}} >
                  <TouchableOpacity >
                    <Image source={require('../../assets/no-photo.png')} style={styles.image} />
                  </TouchableOpacity> 
                  <TouchableOpacity style={styles.pdfSecondStyle} onPress={()=>{ generatePDF()}} >
                    <View style={{flexDirection:'column'}}>
                    <View style={{left:30}} > 
                      <FontAwesome5 name={'file-pdf'} size={21} color={'#FF4D4D'}/>
                     </View> 
                     <View style={{marginBottom:10}} >
                       <Text>Generar PDF</Text>
                     </View>
                    </View>
                  </TouchableOpacity> 
                </View>
               
                :
                <>

                 <View style={{flexDirection:'column'}} >
                <TouchableOpacity onPress={()=>{setVisible(!visible)}} >  
                  <Image source={{uri:imagesUrlsArray['0'].url}} style={styles.image2} />
                </TouchableOpacity>
                  <Modal visible={visible} transparent={true}>
                    <ImageViewer enableSwipeDown onSwipeDown={()=>setVisible(!visible)} imageUrls={imagesUrlsArray}/>
                  </Modal> 
                  <TouchableOpacity style={styles.pdfStyle} onPress={()=>{ generatePDF()}} >
                    <View style={{flexDirection:'column'}}>
                    <View style={{left:30}} > 
                      <FontAwesome5 name={'file-pdf'} size={21} color={'#FF4D4D'}/>
                     </View>
                     <View style={{marginBottom:10}} >
                       <Text>Generar PDF</Text>
                     </View>
                    </View>
                  </TouchableOpacity>
                  </View>
                </>   
             }
        </>
  )
}

export default SeasonImages;

const styles = StyleSheet.create({
    image:{
      width: 80,
      height:80,
      resizeMode: "contain",
      marginLeft:8,
      alignItems: "center",
      marginTop:35
      },
      activityStyle:{
        size:"large",
        color:"#0000ff"
      },
      hasImage:{
        marginLeft:300,
        marginTop:10,
        color:'#1894F8',
        marginBottom:10,    
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
    image2:{
        width: 80,
        height:100,
        resizeMode: "contain",
        marginLeft:10,
        alignItems: "center",
        marginTop:20,
        borderRadius:5,
        marginRight:2,
        marginBottom:35
      },
      pdfStyle:{
        left:12,
        bottom:15
      },
      pdfSecondStyle:{
        left:12,
        marginTop:15
      }
})