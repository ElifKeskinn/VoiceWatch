import React, { useState } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Center, Text, VStack, Slider, Box, useToast } from 'native-base';
import Button from '../components/Button'; 

const { width, height } = Dimensions.get('window');

const SettingsScreen = () => {
  const [sensitivity, setSensitivity] = useState(50);
  const toast = useToast();

  const handleAboutSupport = () => {
    toast.show({
      title: "About & Support",
      description: "This feature is not implemented yet.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Center flex={1} width="100%">
        <VStack space={6} width="90%">
          <Text fontSize="2xl" fontWeight="bold">Hassasiyet Ayarı</Text>
          <Box width="100%">
            <Slider
              defaultValue={sensitivity}
              minValue={0}
              maxValue={100}
              step={1}
              onChange={v => setSensitivity(v)}
            >
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
          </Box>
          <Button mt={6} onPress={handleAboutSupport}>Hakkında & Destek</Button>
        </VStack>
      </Center>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFAF0',
    padding: 20,
    minHeight: height,
  },
});

export default SettingsScreen;