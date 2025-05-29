import React from 'react';
import { ScrollView, StyleSheet, Dimensions, Clipboard } from 'react-native';
import {
  Box,
  VStack,
  Text,
  Icon,
  HStack,
  Center,
  useColorModeValue,
  Pressable,
  Divider,
  useToast,
} from 'native-base';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Linking } from 'react-native';

const { width } = Dimensions.get('window');

const AboutSupportScreen = () => {
  const toast = useToast();
  const bgColor = useColorModeValue('#FFFAF0', '#1A1A1A');
  const boxBgColor = useColorModeValue('rgba(255,69,0,0.1)', 'rgba(255,99,71,0.2)');
  const textColor = useColorModeValue('#666666', '#D3D3D3');
  const titleColor = useColorModeValue('#FF4500', '#FF6347');
  const iconBgColor = useColorModeValue('white', '#3D3D3D');
  const cardBgColor = useColorModeValue('white', '#2D2D2D');
  const dividerColor = useColorModeValue('rgba(255,69,0,0.1)', 'rgba(255,255,255,0.1)');

  const emails = [
    {
      email: 'incialiyeva003@ogr.akdeniz.edu.tr',
      name: 'İnci Aliyeva',
      role: 'Geliştirici'
    },
    {
      email: 'elif.keskin233@gmail.com',
      name: 'Elif Keskin',
      role: 'Tasarımcı'
    },
    {
      email: 'lemanzakaryayeva@gmail.com',
      name: 'Leman Zakaryayeva',
      role: 'Proje Yöneticisi'
    }
  ];

  const handleEmailPress = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleCopyEmail = (email) => {
    Clipboard.setString(email);
    toast.show({
      title: "E-posta kopyalandı",
      placement: "top",
      bg: "success.500",
    });
  };

  const handleWebsitePress = () => {
    Linking.openURL('https://voice-watcher-web.vercel.app/');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: bgColor }]}>
      <VStack space={6} p={4}>
        {/* App Info Card */}
        <Box bg={boxBgColor} p={6} rounded="xl" shadow={2}>
          <Center mb={4}>
            <Box 
              bg={iconBgColor} 
              p={4} 
              rounded="full"
              shadow={3}
              style={styles.iconContainer}
            >
              <Icon as={Ionicons} name="information-circle" size="5xl" color={titleColor} />
            </Box>
          </Center>
          <Text color={titleColor} fontSize="2xl" fontWeight="bold" textAlign="center" mb={2}>
            VoiceWatch
          </Text>
          <Text color={textColor} fontSize="md" textAlign="center" mb={4}>
            Çevrenizdeki sesleri analiz ederek size güvenli bir deneyim sunan akıllı ses asistanı.
          </Text>
          <Center>
            <Text color={textColor} fontSize="sm" bg={cardBgColor} px={4} py={2} rounded="full">
              Versiyon: 1.0.0
            </Text>
          </Center>
        </Box>

        {/* Contact Info Card */}
        <Box bg={boxBgColor} p={6} rounded="xl" shadow={2}>
          <Text color={titleColor} fontSize="lg" fontWeight="bold" mb={4}>
            İletişim
          </Text>
          <VStack space={4}>
            {emails.map((item, index) => (
              <Pressable 
                key={index}
                onPress={() => handleEmailPress(item.email)}
                _pressed={{ opacity: 0.7 }}
              >
                <Box 
                  bg={cardBgColor}
                  p={4}
                  rounded="lg"
                >
                  <HStack space={3} alignItems="center" justifyContent="space-between">
                    <VStack flex={1}>
                      <Text color={titleColor} fontSize="md">
                        {item.name}
                      </Text>
                      <Text color={textColor} fontSize="sm">
                        {item.email}
                      </Text>
                    </VStack>
                    <Pressable 
                      onPress={() => handleCopyEmail(item.email)}
                      _pressed={{ opacity: 0.7 }}
                    >
                      <Icon as={Ionicons} name="copy" size="sm" color={titleColor} />
                    </Pressable>
                  </HStack>
                </Box>
              </Pressable>
            ))}
          </VStack>
        </Box>

        {/* Support Card */}
        <Box bg={boxBgColor} p={6} rounded="xl" shadow={2}>
          <Text color={titleColor} fontSize="lg" fontWeight="bold" mb={4}>
            Destek
          </Text>
          <Text color={textColor} fontSize="md" mb={4}>
            Sorularınız, önerileriniz veya geri bildirimleriniz için yukarıdaki e-posta adreslerinden bize ulaşabilirsiniz. En kısa sürede size dönüş yapacağız.
          </Text>
          <Divider bg={dividerColor} mb={4} />
          <Pressable 
            onPress={handleWebsitePress}
            _pressed={{ opacity: 0.7 }}
          >
            <HStack 
              space={3} 
              alignItems="center" 
              bg={cardBgColor} 
              p={4} 
              rounded="lg"
            >
              <Icon as={MaterialCommunityIcons} name="web" size="md" color={titleColor} />
              <Text color={textColor} fontSize="md" flex={1}>
                Web Sitemizi Ziyaret Edin
              </Text>
              <Icon as={Ionicons} name="chevron-forward" size="sm" color={titleColor} />
            </HStack>
          </Pressable>
        </Box>

        {/* Social Media Card */}
        <Box bg={boxBgColor} p={6} rounded="xl" shadow={2}>
          <Text color={titleColor} fontSize="lg" fontWeight="bold" mb={4}>
            Sosyal Medya
          </Text>
          <HStack space={4} justifyContent="center">
            {['logo-twitter', 'logo-facebook', 'logo-instagram'].map((icon, index) => (
              <Pressable 
                key={index}
                _pressed={{ opacity: 0.7 }}
              >
                <Center bg={cardBgColor} p={3} rounded="full">
                  <Icon as={Ionicons} name={icon} size="xl" color={titleColor} />
                </Center>
              </Pressable>
            ))}
          </HStack>
        </Box>
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

export default AboutSupportScreen; 