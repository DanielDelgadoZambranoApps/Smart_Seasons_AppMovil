import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SeasonStadisticsScreen from '../screens/SeasonStadisticsScreen'
import ProductionRegisterScreen from '../screens/ProductionRegisterScreen'
import ScreenOptionsScreen from '../screens/SeasonOptinosScreen'
import CreateSeasonScreen from '../screens/CreateSeasonScreen'
import NoConectionScreen from '../screens/NoConectionScreen'
import CustomSidebarMenu from '../../CustomSideBarMenu'
import TabsNavigator from '../navigators/TabsNavigator'
import SeasonsScreen from '../screens/SeasonsScreen'
import CloseSession from '../screens/CloseSession'
import NewsScreen from '../screens/NewsScreen'
 import MapsScreen from '../screens/MapsScreen'

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

  return(
      <Drawer.Navigator
        initialRouteName="NewsScreen"
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
          screenOptions={({route}) =>({
            headerTintColor:'white',
            activeTintColor: '#1894F8',
            headerTitleAlign:'center',
            headerStyle:{backgroundColor:'#1894F8'},
            drawerStyle:{width:220},
            headerTitleStyle:{fontSize:20},
            drawerLabel:route.name 
          })}>
          <Drawer.Screen name='Noticias' component={NewsScreen} options={{ groupName: 'Agronomia', unmountOnBlur:true}} />
          <Drawer.Screen name='Mapa en Terreno'component={MapsScreen} options={{ groupName: 'Agronomia', unmountOnBlur:true}} />
          <Drawer.Screen name='Ver Temporadas' component={SeasonsScreen} options={{ groupName: 'Agronomia', unmountOnBlur:true }}  />
          <Drawer.Screen name='Nueva Temporada'component={CreateSeasonScreen} options={{ groupName: 'Agronomia', unmountOnBlur:true}} />
          <Drawer.Screen name='Administrar Temporada'component={ScreenOptionsScreen} options={{ groupName: 'Agronomia', unmountOnBlur:true}} />
          <Drawer.Screen name='Crear Eventos' component={TabsNavigator} options={{ groupName: 'Agronomia', unmountOnBlur:true}} />
          <Drawer.Screen name='Registros' component={ProductionRegisterScreen} options={{ groupName: 'Agronomia', unmountOnBlur:true}} />
          <Drawer.Screen name='Tareas Sin Conexion' component={NoConectionScreen} options={{ groupName: 'Agronomia', unmountOnBlur:true}} />
          <Drawer.Screen name='Ver Estadisticas'component={SeasonStadisticsScreen} options={{ groupName: 'Agronomia', unmountOnBlur:true}} />
          <Drawer.Screen name='Mi Cuenta'component={CloseSession} options={{ groupName: 'Preferencias', unmountOnBlur:true}} />
      </Drawer.Navigator> 
  )}

export default DrawerNavigator;
