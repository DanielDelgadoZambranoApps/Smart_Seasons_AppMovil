import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const MyTextInput = ({param, placeholder, functionParam, hasMultiline=false, hasAutoComplete}) => {
  return (
    <TextInput 
            value={param}
            placeholder={placeholder}
            style={styles.textInput}
            multiline = {hasMultiline}
            autoComplete= {hasAutoComplete}
            onChangeText={(value) => functionParam(value)}/>
  )
}

export default MyTextInput;

const styles = StyleSheet.create({
  textInput: {
    height: 42,
    textAlign: "center",
    color: "#000000",
    fontSize: 18,
    borderWidth: 1,
    borderBottomColor: "#111111",
    borderRadius:5
  }
})