import React from 'react';
import { StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const MyPicker = ({param, groupParam, functionParam}) => {

    return (
        <Picker
            style={styles.picker}
            selectedValue={param}
            onValueChange={(value) => functionParam(value) }>
            {groupParam.map((value, index) => renderPicker(value, index))}
        </Picker>     
    )}

    const renderPicker = (value, index ) => {
        const convertedValue =  value
        return <Picker.Item label={convertedValue} value={convertedValue} key={index} color='#555555'/>
    }

const styles = StyleSheet.create({
    picker:{
        marginBottom:20
    }
});

export default MyPicker;

