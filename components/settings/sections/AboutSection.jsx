import React from 'react';
import { VStack, Box, Text, Icon, HStack, Center, Pressable } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import SettingsSection from '../SettingsSection';

const AboutSection = () => (
  <SettingsSection title="Hakkında & Destek" icon="information-circle">
    <VStack space={4}>
      <Box bg="rgba(255,69,0,0.1)" p={4} rounded="xl">
        <Text color="#FF4500" fontSize="md" fontWeight="600" mb={2}>
          VoiceWatch
        </Text>
        <Text color="#666666" fontSize="sm">
          Çevrenizdeki sesleri analiz ederek size güvenli bir deneyim sunan akıllı ses asistanı.
        </Text>
        <Text color="#666666" fontSize="sm" mt={2}>
          Versiyon: 1.0.0
        </Text>
      </Box>
      
      <VStack space={3}>
        <Pressable onPress={() => {}}>
          <Box 
            bg="rgba(255,69,0,0.1)"
            p={4} 
            rounded="xl"
            _pressed={{ bg: "rgba(255,69,0,0.2)" }}
          >
            <HStack space={4} alignItems="center">
              <Center bg="white" p={2} rounded="lg">
                <Icon as={Ionicons} name="mail" size="md" color="#FF4500" />
              </Center>
              <VStack flex={1}>
                <Text fontSize="md" fontWeight="600" color="#FF4500">
                  İletişime Geç
                </Text>
                <Text fontSize="sm" color="#666666">
                  Sorularınız ve önerileriniz için
                </Text>
              </VStack>
              <Icon as={Ionicons} name="chevron-forward" size="sm" color="#FF4500" />
            </HStack>
          </Box>
        </Pressable>

        <Box bg="rgba(255,69,0,0.05)" p={4} rounded="xl">
          <Text color="#666666" fontSize="sm" fontWeight="600" mb={3}>
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
                  <Center bg="rgba(255,69,0,0.1)" p={2} rounded="lg">
                    <Icon as={Ionicons} name={item.icon} size="sm" color="#FF4500" />
                  </Center>
                  <Text flex={1} color="#666666">{item.title}</Text>
                  <Icon as={Ionicons} name="chevron-forward" size="sm" color="#FF4500" />
                </HStack>
              </Pressable>
            ))}
          </VStack>
        </Box>
      </VStack>
    </VStack>
  </SettingsSection>
);

export default AboutSection;
