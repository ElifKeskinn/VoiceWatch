import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const BloodTypePicker = ({ selectedValue, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Kan Grubu</Text>
      <RNPickerSelect
        onValueChange={onValueChange}
        items={[
          { label: 'Seçiniz', value: '' },
          { label: 'A+', value: 'A+' },
          { label: 'A-', value: 'A-' },
          { label: 'B+', value: 'B+' },
          { label: 'B-', value: 'B-' },
          { label: 'AB+', value: 'AB+' },
          { label: 'AB-', value: 'AB-' },
          { label: '0+', value: '0+' },
          { label: '0-', value: '0-' },
        ]}
        style={pickerSelectStyles}
        value={selectedValue}
        placeholder={{}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#FF8C00',
    marginBottom: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    borderColor: '#FF4500',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 10,
    color: 'black',
  },
  inputAndroid: {
    height: 50,
    borderColor: '#FF4500',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 10,
    color: 'black',
  },
});

export default BloodTypePicker; 