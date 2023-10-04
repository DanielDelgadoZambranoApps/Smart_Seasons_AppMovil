import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import RNPrint from 'react-native-print'

import DateProductionTimeLineGraphic_1 from '../components/DateProductionTimeLineGraphic_1'
import DateProductionTimeLineGraphic_2 from '../components/DateProductionTimeLineGraphic_2'
import DateProductionTimeLineGraphic_3 from '../components/DateProductionTimeLineGraphic_3'

import { downloadImageWhitRNFetchBlob ,CheckConnectivity} from '../functions/general-functions'
import { GetSpecificValueFromAsyncStorage } from '../storage/storage-functions'
import { GetCurrentSpecificInfo, } from '../functions/firebase-auth-functions'
import { GetCollection } from '../functions/firebase-firestore-funtions'
import MyStadistics from '../components/MyStadistics';

const MainLogoUrl= "https://firebasestorage.googleapis.com/v0/b/apptitulacion2.appspot.com/o/MainLogo%2FMainLogo%2FMainLogo.png?alt=media&token=46472f88-907c-4255-96cf-e25f78adf5ce"

const StadisticsGraphicScreen = ({route, navigation}) => {

  let [ cantidadesBruta, setCantidadesBruta ] = useState([])
  let [ cantidadesNeta, setCantidadesNeta ] = useState([])
  let [ cantidadesPerdida, setCantidadesPerdida ] = useState([])
  let [ productionsDates, setProductionsDates ] = useState([])
  const [logoImage, setLogoImage] = useState(null)

  const [userID, setUserID] = useState('userid')
  const [userMail, setUserMail] = useState('useremail')
  const [userName, setUserName] = useState('userfullname')

  const [data_1, setData_1] = useState(null)
  const [data_2, setData_2] = useState(null)
  const [data_3, setData_3] = useState(null)
  const [data_4, setData_4] = useState(null)



  let [temporadas, setTemporadas] = useState([])
  let collection = 'Temporadas'
  const date  = new Date()

  
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

  useEffect(() => { 
     setCantidadesBruta(route.params.temporada.temporadaProduccionBruta)
     setCantidadesNeta(route.params.temporada.temporadaProduccionNeta)
     setCantidadesPerdida(route.params.temporada.temporadaProduccionPerdida)
     setProductionsDates(route.params.temporada.productionDates)
     downloadImageWhitRNFetchBlob(MainLogoUrl, setLogoImage)
  }, [])

  useEffect(()=>{
  
    setData_1(route.params.temporada.temporadaProduccionBruta)
    setData_2(route.params.temporada.temporadaProduccionNeta)
    setData_3(route.params.temporada.temporadaProduccionPerdida)
    setData_4(route.params.temporada.productionDates)

  },[])

  const GenerateProductionPDF = async ()=>{

    const dateNumber =Number(date.toString().length ) - Number(19)
      let finalDate=""
      let i=0

      let text_1 = ""
      let text_2 = ""
      let text_3 = ""
      let text_4 = ""

        for(const letra of  date.toString()){
            finalDate = finalDate +letra
            if(Number(i)  > Number(dateNumber)){
                break
              } else{
                i= i + 1
              }
        }

        for(const date of data_1){
          text_1 = text_1 +  '<th scope="col">'+  date + '</th>' +'<br>'
        }
        for(const item2 of data_2){
          text_2 = text_2 + '<td>' + item2 + '  (kg)' + '</td>'
        }
        for(const item3 of data_3){
          text_3 = text_3 + '<td>' + item3 + '  (kg)' +  '</td>'
        }
        for(const item4 of data_4){
          text_4 = text_4 + '<td>' + item4 + '  (kg)' +  '</td>'
        }
        
        await RNPrint.print({
          html:
          '<!doctype html>'+
          '<html lang="en">'+
          '<head>'+
          '<meta charset="utf-8">'+
          '<meta name="viewport" content="width=1024">'+
          '<title>Example 01: No CSS</title>'+
          '</head>'+
    
          '<body>'+
          '<div id="wrapper">'+
          '<div class="chart">'+

          '<h1 align="center" >Informe de Producciones</h1>'+
          '<img src="data:image/png;base64,'+ logoImage  +'"  width="100%" height="90%"  />"'+
          '<br>'+
          '<br>'+
          '<h3 align="center" >Fecha de Emision :' +  finalDate + '</h3>'+
              '<h3 align="center" >' + userName + '</h3>'+
              '<h3 align="center" >Empresa : Uvas S.A</h3>'+
              '<br>'+ '<br>'+'<br>'+

          '<table  align="center"  id="data-table" border="1" cellpadding="15" cellspacing="10"'+
          'summary="The effects of the zombie outbreak on the populations'+
         

          'of endangered species from 2012 to 2016">'+
          
          '<thead>'+
          '<tr>'+
          '<td>&nbsp;</td>'+
          '<h3 align="center" >Produccion medida en Kilogramos </h3>'+
          
    
          text_4+
    
          '</tr>'+
          '</thead>'+
          '<tbody>'+
          '<tr>'+
          '<th scope="row">Produccion Total </th>'+
    
          text_2+
    
          '</tr>'+
          '<tr>'+
          '<th scope="row">Produccion Neta </th>'+
    
          text_3+

          '</tr>'+
          '<tr>'+
          '<th scope="row">Produccion Perdida </th>'+
    
          text_1+
          
          '</tr>'+
          '</tbody>'+
          '</table>'+
          '</div>'+
          '</div>'+
         '</body>'+
         '<br>'+'<br>'+'<br>'+
              '<h4 align="center" >Fecha de Emision :' +  date + '</h4>'+
         '</html>'
        })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
            
                <ScrollView>
                <Text style={styles.heading}> Produccion Bruta </Text>
                <DateProductionTimeLineGraphic_1 temporada={route.params.temporada} />
                <Text>{"\n"}</Text>
                <Text style={styles.heading}> Produccion Neta </Text>
                <DateProductionTimeLineGraphic_3 temporada={route.params.temporada} />
                <Text>{"\n"}</Text>
                <Text style={styles.heading}> Produccion Perdida </Text>
                <DateProductionTimeLineGraphic_2 temporada={route.params.temporada} />

                <View style={{ alignSelf:'center', marginBottom:30,marginTop:30}} >
                <View  style={{right:10,top:20}} >
                  <TouchableOpacity  onPress={()=>{GenerateProductionPDF()} } >
                  <FontAwesome5 name={'file-pdf'} size={26} color={'#FF4D4D'}/> 
                    <Text style={{fontSize:16,bottom:20}} >        Generar informe de Produccion</Text>
                  </TouchableOpacity>
                  </View> 
                </View>
                </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )}

export default StadisticsGraphicScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5, 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  },
  inputContainer: {
    flexDirection: 'row',
  },
  inputStyle: {
    flex: 1,
    maxWidth: 350,
    borderColor: 'black',
    height: 40,
    borderWidth: 0.5,
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
  },
  card: {
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#1894F8',
    borderWidth: 1,
    borderBottomColor: '#1894F8',
    borderBottomWidth: 1,
    borderRadius: 2,
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    color:'#000000',
  },
  subheading: {
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 10,
  },
  image:{
    width: "50%",
    height: "50%",
    resizeMode: "contain",
    margin: 30,
  },
})
