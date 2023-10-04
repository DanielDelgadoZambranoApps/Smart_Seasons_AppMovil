// React Navigation Drawer with Sectioned Menu Options & Footer
// https://aboutreact.com/navigation-drawer-sidebar-menu-with-sectioned-menu-options-footer/

import React from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

const CustomSidebarMenu = (props) => {
  const {state, descriptors, navigation} = props;
  let lastGroupName = '';
  let newGroup = true;

  return (
       <SafeAreaView style={{flex: 1}}>
          <DrawerContentScrollView {...props}>
            {state.routes.map((route, _index) => {
              const {
                drawerLabel,
                activeTintColor,
                groupName } = descriptors[route.key].options;
                  if (lastGroupName !== groupName) {
                    newGroup = true;
                    lastGroupName = groupName;
                  } else newGroup = false;
                    return (
                     <React.Fragment key={route.key} >
                        {newGroup ? (
                          <View style={styles.sectionContainer}>
                            <Text key={groupName} style={{marginLeft: 16}}> {groupName} </Text>
                          <View style={styles.sectionLine} />
                        </View> ) : null}
                        <DrawerItem
                          key={route.key}
                          label={({color}) =>
                            <Text style={{color}}> {drawerLabel} </Text>}
                          focused={state.routes.findIndex(
                          (e) => e.name === route.name) === state.index}
                          activeTintColor={activeTintColor}
                          onPress={() => navigation.navigate(route.name)}/>
                </React.Fragment > 
              )})}
      </DrawerContentScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  sectionLine: {
    backgroundColor: 'gray',
    flex: 1,
    height: 1,
    marginLeft: 10,
    marginRight: 20,
  },
});

export default CustomSidebarMenu;


