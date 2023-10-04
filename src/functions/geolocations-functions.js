import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const GetRealTimeLocation = (setLongitude, setLatitude, setLocationStatus) =>{ 
    const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
          getOneTimeLocation(setLongitude, setLatitude, setLocationStatus);
          subscribeLocationLocation(setLongitude, setLatitude, setLocationStatus);
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Location Access Required',
                message: 'This App needs to Access your location',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              //To Check, If Permission is granted
              getOneTimeLocation(setLongitude, setLatitude, setLocationStatus);
              subscribeLocationLocation(setLongitude, setLatitude, setLocationStatus);
            } else {
              setLocationStatus('Permission Denied');
            }
          } catch (err) {
            console.warn(err);
          }}}
          requestLocationPermission();
          return () => {
          Geolocation.clearWatch(watchID)}
}

const getOneTimeLocation = (setLongitude, setLatitude, setLocationStatus) => {
  setLocationStatus('Obteniendo su actual localizacion ...');
  Geolocation.getCurrentPosition(
    (position) => {
      setLocationStatus('Cargando ...');
      const currentLongitude = JSON.stringify(position.coords.longitude);
      const currentLatitude = JSON.stringify(position.coords.latitude);
      setLongitude(currentLongitude)
      setLatitude(currentLatitude)},
    (error) => {
      setLocationStatus(error.message);
    },
    {
      enableHighAccuracy: false,
      timeout: 30000,
      maximumAge: 1000
    },
  )
}

const subscribeLocationLocation = (setLongitude, setLatitude, setLocationStatus) => {
    watchID = Geolocation.watchPosition(
    (position) => {
      setLocationStatus('');
      const currentLongitude = JSON.stringify(position.coords.longitude)
      const currentLatitude = JSON.stringify(position.coords.latitude)
      setLongitude(currentLongitude);
      setLatitude(currentLatitude);
    },
    (error) => {
      setLocationStatus(error.message);
    },
    {
      enableHighAccuracy: false,
      maximumAge: 1000
})}