import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native'

import { Logout } from '../functions/firebase-auth-functions'
 
const ProfileButton = ({title, closeFunction, navigation}) => {
  return (
    <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={()=>closeFunction(navigation)}
            >
              <Text style={styles.textStyle}> {title} </Text>
            </TouchableOpacity>
  );
};

export default ProfileButton;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "#2F7FF3",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 180,
  },
  textStyle: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 10
  },
});
