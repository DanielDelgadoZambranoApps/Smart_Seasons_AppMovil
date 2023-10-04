
import React from 'react';
import { StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const MyPickerAlternative = ({param, groupParam, functionParam, functionParam2, attribute}) => {
 
   const setValues=(value, index)=>{
        functionParam(value)
        switch (attribute) {
            case "testigoName":
                functionParam2(groupParam[index].id)    
            break
            
            case "temporadaNombre":
                functionParam2(groupParam[index])    
            break

            case "TipoProduccion":
                functionParam2(groupParam[index])    
            break

            default:
            break
    }}

    return (
        <Picker
            style={styles.picker}
            selectedValue={param}
            onValueChange={(value, index) => setValues(value,index) }>
            {groupParam.map((value , index) => renderPicker(value, index, attribute))}
        </Picker>     
    )}

    const renderPicker = (value, index, attribute) => {
        let convertedValue 
        switch (attribute) {
            case "testigoName":
                convertedValue =  value.testigoName      
            break
            
            case "temporadaNombre":
                convertedValue =  value.temporadaNombre      
            break

            case "TipoProduccion":
                convertedValue =  value.TipoProduccion   
            break
            default:
            break
        }

        return <Picker.Item label={convertedValue} value={convertedValue} value2={value.id} key={index} color='#555555'/>
    }

const styles = StyleSheet.create({
    picker:{
        marginBottom:10
    }
});

export default MyPickerAlternative;