import React, { useState } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Center, Button, Input } from 'native-base';
import ProfileCard from '../components/ProfileCard';
import GeneralModal from '../components/GeneralModal';

const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    tcNumber: '12345678901',
    age: '30',
    phoneNumber: '555-555-5555',
    bloodType: 'A+',
    profileImage: undefined,
    sensitivity: 'High',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const noProfile = require('../assets/noprofile.png');

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      alert('Password changed successfully!');
      setIsModalOpen(false);
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Center flex={1} width="100%">
        <ProfileCard 
          firstName={user.firstName}
          lastName={user.lastName}
          tcNumber={user.tcNumber}
          age={user.age}
          phoneNumber={user.phoneNumber}
          bloodType={user.bloodType}
          profileImage={user.profileImage || noProfile}
          sensitivity={user.sensitivity}
        />
        <Button onPress={() => setIsModalOpen(true)} style={styles.passwordButton}>
          Parola Değiştir
        </Button>
        <GeneralModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="Parola Değiştir" 
          onConfirm={handlePasswordChange}
        >
          <Input
            placeholder="Yeni Parola"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            borderColor="#FF4500"
            _focus={{ borderColor: "#FF4500" }}
          />
          <Input
            placeholder="Yeni Parola (Tekrar)"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            borderColor="#FF4500"
            _focus={{ borderColor: "#FF4500" }}
            mt={3}
          />
        </GeneralModal>
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
  passwordButton: {
    backgroundColor: '#FF4500',
    marginTop: 20,
    borderRadius: 12,
    paddingHorizontal: 25,
    paddingVertical: 12,
  },
});

export default ProfileScreen;
