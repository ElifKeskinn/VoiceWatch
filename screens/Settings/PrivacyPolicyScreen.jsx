import React from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import {
  Box,
  VStack,
  Text,
  useColorModeValue,
  Icon,
  HStack,
  Center,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PrivacyPolicyScreen = () => {
  const bgColor = useColorModeValue('#FFFAF0', '#1A1A1A');
  const textColor = useColorModeValue('#666666', '#D3D3D3');
  const titleColor = useColorModeValue('#FF4500', '#FF6347');
  const cardBgColor = useColorModeValue('white', '#2D2D2D');
  const iconBgColor = useColorModeValue('rgba(255,69,0,0.1)', 'rgba(255,99,71,0.2)');

  const sections = [
    {
      title: 'Toplanan Veriler',
      icon: 'document-text',
      items: [
        'Ses kayıtları ve analiz sonuçları',
        'Cihaz bilgileri',
        'Konum bilgisi (izin verildiğinde)',
        'Kullanım istatistikleri'
      ]
    },
    {
      title: 'Verilerin Kullanımı',
      icon: 'analytics',
      items: [
        'Ses analizi ve güvenlik uyarıları',
        'Uygulama performansının iyileştirilmesi',
        'Kullanıcı deneyiminin geliştirilmesi'
      ]
    },
    {
      title: 'Veri Güvenliği',
      icon: 'shield-checkmark',
      items: [
        'Tüm veriler şifrelenerek saklanır',
        'Düzenli güvenlik güncellemeleri',
        'Sıkı erişim kontrolleri'
      ]
    },
    {
      title: 'Veri Paylaşımı',
      icon: 'share-social',
      items: [
        'Üçüncü taraflarla veri paylaşımı yapılmaz',
        'Yasal zorunluluklar dışında veriler paylaşılmaz'
      ]
    },
    {
      title: 'Kullanıcı Hakları',
      icon: 'person',
      items: [
        'Verilerinize erişim hakkı',
        'Veri düzeltme ve silme hakkı',
        'Veri işlemeye itiraz hakkı'
      ]
    }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: bgColor }]}>
      <VStack space={6} p={4}>
        {/* Header Section */}
        <Box bg={cardBgColor} p={6} rounded="xl" shadow={2}>
          <Center mb={4}>
            <Box 
              bg={iconBgColor} 
              p={4} 
              rounded="full"
              shadow={3}
              style={styles.iconContainer}
            >
              <Icon as={Ionicons} name="shield-checkmark" size="5xl" color={titleColor} />
            </Box>
          </Center>
          <Text color={titleColor} fontSize="2xl" fontWeight="bold" textAlign="center" mb={2}>
            Gizlilik Politikası
          </Text>
          <Text color={textColor} fontSize="md" textAlign="center">
            Bu gizlilik politikası, VoiceWatch uygulamasının kişisel verilerinizi nasıl topladığını, kullandığını ve koruduğunu açıklar.
          </Text>
        </Box>

        {/* Policy Sections */}
        {sections.map((section, index) => (
          <Box key={index} bg={cardBgColor} p={6} rounded="xl" shadow={2}>
            <HStack space={3} alignItems="center" mb={4}>
              <Center bg={iconBgColor} p={2} rounded="lg">
                <Icon as={Ionicons} name={section.icon} size="md" color={titleColor} />
              </Center>
              <Text color={titleColor} fontSize="lg" fontWeight="bold">
                {section.title}
              </Text>
            </HStack>
            <VStack space={3}>
              {section.items.map((item, itemIndex) => (
                <HStack key={itemIndex} space={3} alignItems="center">
                  <Icon as={Ionicons} name="checkmark-circle" size="sm" color={titleColor} />
                  <Text color={textColor} fontSize="md" flex={1}>
                    {item}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Box>
        ))}
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    width: width * 0.25,
    height: width * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrivacyPolicyScreen; 