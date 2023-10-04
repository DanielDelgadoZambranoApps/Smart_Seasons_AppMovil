import React from 'react';
import { TextInput, StyleSheet, Keyboard } from 'react-native';

const SpecialTextInput = ({setData, refer, type, emailInputRef } )  => {

  switch(type){

    case 'caso 1':
    return (
          <TextInput style={styles.inputStyle}
            onChangeText={(UserEmail) =>
                setData(UserEmail)
            }
            placeholder="Correo Electronico"
            placeholderTextColor="#ffffff"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() =>
              refer.current &&
              refer.current.focus()
            }
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
                />)

    case 'caso 2':
    return (
          <TextInput
            style={styles.inputStyle}
            onChangeText={(UserPassword) =>
                setData(UserPassword)
            }
            placeholder="Contraseña"
            placeholderTextColor="#ffffff"
            keyboardType="default"
            ref={refer}
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={true}
            underlineColorAndroid="#f000"
            returnKeyType="next"
                />)

    case 'caso 3':
    return (
          <TextInput
            style={styles.inputStyle}
            onChangeText={(UserName) =>
              setData(UserName)
            }
            underlineColorAndroid="#f000"
            placeholder="Nombre Completo"
            placeholderTextColor="#ffffff"
            autoCapitalize="sentences"
            returnKeyType="next"
            onSubmitEditing={() =>
              emailInputRef.current &&
              emailInputRef.current.focus()
            }
            blurOnSubmit={false}
                  />)

    case 'caso 4':
    return (
          <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) =>
                setData(UserEmail)
              }
              underlineColorAndroid="#f000"
              placeholder="Ingresar Email"
              placeholderTextColor="#ffffff"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                refer.current &&
                refer.current.focus()
              }
              blurOnSubmit={false}
                  />)

    case 'caso 5':
    return (
          <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setData(UserPassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Ingresar Contraseña"
              placeholderTextColor="#ffffff"
              ref={refer}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
                  />)
    case 'caso 6':
      return (
            <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setData(UserPassword)
                }
                underlineColorAndroid="#f000"
                placeholder="Repetir Contraseña "
                placeholderTextColor="#ffffff"
                ref={refer}
                returnKeyType="next"
                secureTextEntry={true}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                    />)
}}

export default SpecialTextInput;

const styles = StyleSheet.create({
    inputStyle: {
        flex: 1,
        color: "white",
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: "#dadae8",
      },
})