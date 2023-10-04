import React from 'react';
import { Text, StyleSheet, Image, View } from 'react-native'
import { VictoryPie } from "victory-native"

const MyStadistics = ({season}) => {
    const data = [
        { x:Number( season.temporadaProduccionBruta).toString() + " kg", y: Number( season.temporadaProduccionBruta) },
        { x:Number( season.temporadaProduccionPerdida).toString() + " (kg)" , y: Number( season.temporadaProduccionPerdida) },
        { x:Number( season.temporadaProduccionNeta) + " (kb)", y: Number( season.temporadaProduccionNeta) }]
    
    return (
      <>
      <VictoryPie colorScale={["#E0FFC2", "#FFD0C5", "#FEFFC5", "cyan", "navy" ]} data={data}/>
        <View style={{flexDirection:'row', marginLeft:10, marginBottom:10, marginTop:28}} >
          <Image  style={styles.image}  source={require('../../assets/greenbox.png')}   /> 
            <Text style={styles.subheading}>        Produccion Total </Text>
        </View>
        <View style={{flexDirection:'row', marginLeft:10, marginBottom:10}} >
          <Image  style={styles.image}  source={require('../../assets/yellowbox.jpg')}   /> 
            <Text style={styles.subheading}>        Produccion Neta </Text>
        </View>
        <View style={{flexDirection:'row', marginLeft:10, marginBottom:10}} >
          <Image  style={styles.image}  source={require('../../assets/redbox.jpg')}   /> 
            <Text style={styles.subheading}>        Produccion Perdida </Text>
        </View>
      </>
  )
}

const styles = StyleSheet.create({
    image:{
        resizeMode: "contain", 
      },
      subheading: {
        fontSize: 15,
        textAlign: 'center',
        marginVertical: 10,
        color:'#000000',
      }
});

export default MyStadistics;