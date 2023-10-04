import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NewEventScreenAuto from '../screens/NewEventScreenAuto'
import NewEventScreen from '../screens/NewEventScreen'

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {

  return(
    <>
      <Tab.Navigator
      initialRouteName='ItemsScreen'
      screenOptions={({route}) =>({
        tabBarActiveTintColor:'#1894F8',
        headerStyle:{backgroundColor:'#1894F8'},
        headerTitleAlign:'center',
        tabBarInactiveBackgroundColor:'#39A6FE',
        tabBarLabelStyle:{color:'black'},
        tabBarActiveBackgroundColor:'#1894F8',
        tabBarShowLabel:true,
        headerShown:false,
        tabBarIcon: ({focused, size, color })=>{
          let iconName;
          if(route.name === 'Crear Evento'){
            iconName = 'pencil-square-o'
            size = focused ? 26 :28
            return (<FontAwesome name={iconName} size={size} color="black" />)
          }
          if(route.name === 'Crear Evento Auto'){
            iconName = 'enviroment'
            size = focused ? 26 :28
            return (<AntDesign name={iconName} size={size} color="black" />)
          }
        }})
      }>
      <Tab.Screen name='Crear Evento'   component={NewEventScreen} options={{ tabBarLabel: 'Manual', unmountOnBlur:true}} />
      <Tab.Screen name='Crear Evento Auto'component={NewEventScreenAuto} options={{ tabBarLabel: 'Auto',unmountOnBlur:true}} />
      </Tab.Navigator>
    </>
  )
};


export default TabsNavigator;