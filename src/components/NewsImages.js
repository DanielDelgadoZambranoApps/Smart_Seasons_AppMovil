import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, ActivityIndicator, Modal } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'

import { getFullStorageItemPath, listFilesAndDirectoriesGeneric } from '../functions/firebase-storage-functions'

const NewsImages = ({collection, itemId, hasImage}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [visible, setVisible] = useState(false)
    const [listData, setListData] = useState(null)
    let [imagesArray, setImagesArray] = useState(null)

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
      }
      setImagesArray(imagesUrlsArray)
      },[listData])

  return (
    <>
        { hasImage ?
          <>
            { isLoading || !imagesArray ?
                <ActivityIndicator style={styles.activityStyle} />
                :
                <>
                <Text style={styles.hasImage} onPress={()=>{setVisible(!visible)}} > Ver Mas </Text>
                    <Modal visible={visible} transparent={true}>
                        <ImageViewer enableSwipeDown onSwipeDown={()=>setVisible(!visible)} imageUrls={imagesArray}/>
                     </Modal>
                </>   
             }
          </>
          :
          <>
          <Text style={styles.hasImage}> Sin Foto </Text>
          </>            
          }
    </>
  )
}

export default NewsImages;

const styles = StyleSheet.create({
    image:{
        width: 80,
        height: 80,
        resizeMode: "contain",
        marginLeft:-10,
        alignItems: "center",
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
    }
})