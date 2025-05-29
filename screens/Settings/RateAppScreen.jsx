import React, { useState } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import {
  Box,
  VStack,
  Text,
  useColorModeValue,
  Icon,
  HStack,
  Center,
  Pressable,
  useToast,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const RateAppScreen = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const toast = useToast();

  const bgColor = useColorModeValue('#FFFAF0', '#1A1A1A');
  const textColor = useColorModeValue('#666666', '#D3D3D3');
  const titleColor = useColorModeValue('#FF4500', '#FF6347');
  const cardBgColor = useColorModeValue('white', '#2D2D2D');
  const iconBgColor = useColorModeValue('rgba(255,69,0,0.1)', 'rgba(255,99,71,0.2)');

  const handleRating = (value) => {
    setRating(value);
    toast.show({
      title: "Teşekkürler!",
      description: "Değerlendirmeniz için teşekkür ederiz.",
      placement: "top",
      bg: "success.500",
    });
  };

  const getRatingText = (value) => {
    switch (value) {
      case 1:
        return 'Çok Kötü';
      case 2:
        return 'Kötü';
      case 3:
        return 'Orta';
      case 4:
        return 'İyi';
      case 5:
        return 'Mükemmel';
      default:
        return 'Değerlendirin';
    }
  };

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
              <Icon as={Ionicons} name="star" size="5xl" color={titleColor} />
            </Box>
          </Center>
          <Text color={titleColor} fontSize="2xl" fontWeight="bold" textAlign="center" mb={2}>
            Uygulamayı Değerlendir
          </Text>
          <Text color={textColor} fontSize="md" textAlign="center">
            VoiceWatch deneyiminizi değerlendirin ve gelişmemize katkıda bulunun.
          </Text>
        </Box>

        {/* Rating Section */}
        <Box bg={cardBgColor} p={6} rounded="xl" shadow={2}>
          <Center>
            <HStack space={2} mb={4}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Pressable
                  key={star}
                  onPress={() => handleRating(star)}
                  onPressIn={() => setHoveredRating(star)}
                  onPressOut={() => setHoveredRating(0)}
                >
                  <Icon
                    as={Ionicons}
                    name={star <= (hoveredRating || rating) ? "star" : "star-outline"}
                    size="4xl"
                    color={star <= (hoveredRating || rating) ? "#FFD700" : titleColor}
                    style={styles.star}
                  />
                </Pressable>
              ))}
            </HStack>
            <Text color={titleColor} fontSize="xl" fontWeight="bold" mb={2}>
              {getRatingText(hoveredRating || rating)}
            </Text>
            <Text color={textColor} fontSize="md" textAlign="center">
              {rating > 0 ? "Değerlendirmeniz için teşekkür ederiz!" : "Lütfen yıldızların üzerine tıklayarak değerlendirin."}
            </Text>
          </Center>
        </Box>

        {/* Features Section */}
        <Box bg={cardBgColor} p={6} rounded="xl" shadow={2}>
          <Text color={titleColor} fontSize="lg" fontWeight="bold" mb={4}>
            Öne Çıkan Özellikler
          </Text>
          <VStack space={4}>
            {[
              { icon: 'shield-checkmark', text: 'Güvenli Ses Analizi' },
              { icon: 'notifications', text: 'Anlık Bildirimler' },
              { icon: 'color-palette', text: 'Özelleştirilebilir Arayüz' },
              { icon: 'settings', text: 'Gelişmiş Ayarlar' }
            ].map((feature, index) => (
              <HStack key={index} space={3} alignItems="center">
                <Center bg={iconBgColor} p={2} rounded="lg">
                  <Icon as={Ionicons} name={feature.icon} size="md" color={titleColor} />
                </Center>
                <Text color={textColor} fontSize="md">
                  {feature.text}
                </Text>
              </HStack>
            ))}
          </VStack>
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
  star: {
    marginHorizontal: 4,
  },
});

export default RateAppScreen; 