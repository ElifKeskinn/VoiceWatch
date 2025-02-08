import React from 'react';
import { VStack, Box, Text, Icon, HStack, Center, Pressable, useColorModeValue } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import SettingsSection from '../SettingsSection';

const AboutSection = () => {
  const boxBgColor = useColorModeValue('rgba(255,69,0,0.1)', 'rgba(255,99,71,0.2)');
  const textColor = useColorModeValue('#666666', '#D3D3D3');
  const titleColor = useColorModeValue('#FF4500', '#FF6347');
  const iconBgColor = useColorModeValue('white', '#3D3D3D');
  const pressableBgColor = useColorModeValue('rgba(255,69,0,0.05)', 'rgba(255,99,71,0.1)');
  const iconColor = useColorModeValue('#FF4500', '#FF6347');

  return (
    <SettingsSection title="Hakkında & Destek" icon="information-circle">
      <VStack space={4} mt={4}>
        <Box bg={boxBgColor} p={4} rounded="xl">
          <Text color={titleColor} fontSize="md" fontWeight="600" mb={2}>
            VoiceWatch
          </Text>
          <Text color={textColor} fontSize="sm">
            Çevrenizdeki sesleri analiz ederek size güvenli bir deneyim sunan akıllı ses asistanı.
          </Text>
          <Text color={textColor} fontSize="sm" mt={2}>
            Versiyon: 1.0.0
          </Text>
        </Box>
        
        <VStack space={3}>
          <Pressable onPress={() => {}}>
            <Box 
              bg={boxBgColor}
              p={4} 
              rounded="xl"
              _pressed={{ bg: pressableBgColor }}
            >
              <HStack space={4} alignItems="center">
                <Center bg={iconBgColor} p={2} rounded="lg">
                  <Icon as={Ionicons} name="mail" size="md" color={iconColor} />
                </Center>
                <VStack flex={1}>
                  <Text fontSize="md" fontWeight="600" color={titleColor}>
                    İletişime Geç
                  </Text>
                  <Text fontSize="sm" color={textColor}>
                    Sorularınız ve önerileriniz için
                  </Text>
                </VStack>
                <Icon as={Ionicons} name="chevron-forward" size="sm" color={iconColor} />
              </HStack>
            </Box>
          </Pressable>

          <Box bg={pressableBgColor} p={4} rounded="xl">
            <Text color={textColor} fontSize="sm" fontWeight="600" mb={3}>
              Diğer
            </Text>
            <VStack space={4}>
              {[
                { icon: "star", title: "Uygulamayı Değerlendir" },
                { icon: "document-text", title: "Kullanım Koşulları" },
                { icon: "shield-checkmark", title: "Gizlilik Politikası" }
              ].map((item, index) => (
                <Pressable key={index} onPress={() => {}}>
                  <HStack space={3} alignItems="center">
                    <Center bg={boxBgColor} p={2} rounded="lg">
                      <Icon as={Ionicons} name={item.icon} size="sm" color={iconColor} />
                    </Center>
                    <Text flex={1} color={textColor}>{item.title}</Text>
                    <Icon as={Ionicons} name="chevron-forward" size="sm" color={iconColor} />
                  </HStack>
                </Pressable>
              ))}
            </VStack>
          </Box>
        </VStack>
      </VStack>
    </SettingsSection>
  );
};

export default AboutSection;
