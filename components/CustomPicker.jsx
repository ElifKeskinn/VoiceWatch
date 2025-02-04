import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { useColorModeValue } from 'native-base';

const CustomPicker = ({ label, options, selectedValue, onValueChange }) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Dark mode renkleri
  const bgColor = useColorModeValue('#FFFAF0', '#121212');
  const inputBgColor = useColorModeValue('rgba(255, 255, 255, 0.9)', '#1E1E1E');
  const borderColor = useColorModeValue('#FF4500', '#FF6347');
  const textColor = useColorModeValue('#000000', '#E8E8E8');
  const placeholderColor = useColorModeValue('#FF8C00', '#FF6347');
  const modalBgColor = useColorModeValue('rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.7)');
  const modalContentBgColor = useColorModeValue('white', '#2D2D2D');

  const handleSelect = (value) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity
        style={[
          styles.picker,
          {
            backgroundColor: inputBgColor,
            borderColor: borderColor,
          },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text
          style={[
            selectedValue ? styles.selectedText : styles.placeholderText,
            {color: selectedValue ? textColor : placeholderColor},
          ]}>
          {selectedValue || 'Kan Grubu'}
        </Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.modalContainer, {backgroundColor: modalBgColor}]}>
          <View style={[styles.modalContent, {backgroundColor: modalContentBgColor}]}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    {
                      backgroundColor: modalContentBgColor,
                    },
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color: borderColor,
                      },
                    ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    
  },
  label: {
    fontSize: 16,
    color: '#FF8C00',
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  placeholderText: {
    color: '#FF8C00',
  },
  selectedText: {
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
  },
});

export default CustomPicker; 