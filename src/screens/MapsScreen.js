import React, { useState, useEffect } from 'react'
import {SafeAreaView, StyleSheet, View} from 'react-native'
import MapView from 'react-native-maps'

import { GetRealTimeLocation } from '../functions/geolocations-functions'
import { GetCollection } from '../functions/firebase-firestore-funtions'
import { useSelector } from 'react-redux'
import Events from '../components/Events'
import { ask } from '../functions/permissions-functions'


import Geolocation from '@react-native-community/geolocation';
const MapsScreen = () => {
  
  let [listData, setListData] = useState([])
  const [longitude, setLongitude] = useState(0)
  const [latitude, setLatitude] = useState(0) 
  const [locationStatus, setLocationStatus]= useState() 
  const [allEvents, setAllEvents] = useState([])
  
  const temporadas = useSelector(state=>state.temporadasReducer.temporadas)   // --> forma A
  // const {temporadas} = useSelector(state=>state.temporadasReducer)       // --> forma B
  // console.log("temporadas desde redux -----------------> " + testigos )  
  // console.log("temporadas desde normal -----------------> " + listData)  

  useEffect(() => {
    GetCollection('Temporadas', setListData, false)
   // GetRealTimeLocation(setLongitude, setLatitude, setLocationStatus)
   Geolocation.getCurrentPosition(info =>{
    console.log("infooo --->  " +  JSON.stringify(info.coords))
    setLatitude(Number(info.coords.latitude))
    setLongitude(Number(info.coords.longitude))
  } )
    ask()
  }, []);


  useEffect(() => {
    let eventsArray =[]
    if(listData){
      for(const item of listData){
          for(const subitem of item.events){
            eventsArray.push(subitem)
          }
      }
      setAllEvents(eventsArray)
    }
  }, [listData])

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <MapView 
          style={styles.mapStyle}
          initialRegion={{  
            latitude:  -33.05146231233552,
              longitude: -71.4244657382369,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
          }}
          showsUserLocation
          customMapStyle={mapStyle}>
            
          { /*testigos &&  // ------------> sacado desde el redux
            JSON.parse(testigos).map((doc, index) => renderDoc(doc, index)) */
          }
 
          {  allEvents &&  // ------------> sacado desde firebase / asyncstorage
             <Events allEvents={allEvents} />
          }
        </MapView>
      </View>
    </SafeAreaView>
  )}

export default MapsScreen;

const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})