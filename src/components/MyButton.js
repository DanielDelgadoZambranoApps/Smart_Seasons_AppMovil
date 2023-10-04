import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const MyButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.customClick}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#1894F8',
    color: '#ffffff',
    padding: 10,
    height: 40,
    marginVertical: 10,
    borderRadius:10
  },
  text: {
    color: '#ffffff',
  },
})

export default MyButton;