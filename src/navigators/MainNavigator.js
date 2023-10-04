import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StadisticsGraphicScreen from '../screens/StadisticsGraphicScreen'
import WriteNewsScreen from '../screens/WriteNewsScreen'
import RegisterScreen from '../screens/RegisterScreen'
import SplashScreen from '../screens/SplashScreen'
import LoginScreen from '../screens/LoginScreen'
import DrawerNavigator from './DrawerNavigator'

import { Provider } from 'react-redux'
import { Store } from '../redux/store'

const Stack = createStackNavigator();

const MainNavigator = () => {

  return(
    <Provider store={Store}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={({route}) =>({
          headerTintColor:'white',
          activeTintColor: '#1894F8',
          headerTitleAlign:'center',
          headerStyle:{backgroundColor:'#1894F8'},
          drawerStyle:{width:220},
          headerTitleStyle:{fontSize:20},
         // drawerLabel:route.name
         headerShown:false
        })}>
          <Stack.Screen name='Redactar Noticia'component={WriteNewsScreen} options={{ groupName: 'Agronomia', headerShown:true, unmountOnBlur:true}} />
          <Stack.Screen name='StadisticsGraphicScreen' component={StadisticsGraphicScreen} options= {{title:'Estadisticas', headerShown:true}} />
          <Stack.Screen name='DrawerNavigator' component={DrawerNavigator} />
          <Stack.Screen name='RegisterScreen' component={RegisterScreen} options= {{title:' Registro', headerShown:true}} />
          <Stack.Screen name='SplashScreen' component={SplashScreen} />
          <Stack.Screen name='LoginScreen' component={LoginScreen} />   
      </Stack.Navigator>
    </NavigationContainer> 
    </Provider>
  )}

export default MainNavigator;