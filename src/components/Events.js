import React from 'react';
import { StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps'

const Events = ({ allEvents }) => {

    const ShowEvent = (doc, index) => {
        return (
          <Marker
                draggable
                coordinate={{
                  latitude: doc.latitude,
                  longitude: doc.longitude,
                }}
                onDragEnd={
                  (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                }
                title={doc.testigoName}
                pinColor={doc.testigoColor}
                description={doc.testigoDescripcion}
                key={index}
              />
        )
    }
    return (
        <>
        {  allEvents &&  // ------------> sacado desde firebase / asyncstorage
             allEvents.map((doc, index) => ShowEvent(doc, index)) 
        }
        </>
    )  
}

const styles = StyleSheet.create({
    
})

export default Events;

