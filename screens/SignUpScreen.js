import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const SignUpScreen = ({ navigation }) => {
    // State variables for form fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tcNumber, setTcNumber] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [contacts, setContacts] = useState([{ nickname: '', number: '' }, { nickname: '', number: '' }]); // Initialize with 2 contacts
    const [isAccordionOpen, setIsAccordionOpen] = useState(false); // State to manage accordion visibility

    const handleSignUp = () => {
        // Handle sign-up logic here
    };

    const addContact = () => {
        if (contacts.length < 2) {
            setContacts([...contacts, { nickname: '', number: '' }]);
        }
    };

    const handleContactChange = (index, field, value) => {
        const newContacts = [...contacts];
        newContacts[index][field] = value;
        setContacts(newContacts);
    };

    const formatPhoneNumber = (number) => {
        // Remove all non-digit characters
        const cleaned = ('' + number).replace(/\D/g, '');
        // Format the number as (0xx) xxx xx xx
        if (cleaned.length > 10) {
            return cleaned.slice(0, 10); // Limit to 10 digits
        }
        const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
        if (match) {
            return `${match[1] ? `(${match[1]}` : ''}${match[2] ? `) ${match[2]}` : ''}${match[3] ? ` ${match[3]}` : ''}${match[4] ? ` ${match[4]}` : ''}`.trim();
        }
        return number;
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Kayıt Ol</Text>
            <TextInput
                style={styles.input}
                placeholder="İsim"
                placeholderTextColor="#FF8C00"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Soyisim"
                placeholderTextColor="#FF8C00"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                style={styles.input}
                placeholder="TC Kimlik Numarası"
                placeholderTextColor="#FF8C00"
                value={tcNumber}
                onChangeText={setTcNumber}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Yaş"
                placeholderTextColor="#FF8C00"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Parola"
                placeholderTextColor="#FF8C00"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Kan Grubu"
                placeholderTextColor="#FF8C00"
                value={bloodType}
                onChangeText={setBloodType}
            />
           

            {/* Accordion Header */}
            <TouchableOpacity style={styles.accordionHeader} onPress={() => setIsAccordionOpen(!isAccordionOpen)}>
                <Text style={styles.accordionTitle}>Acil Durum Kişileri Bilgileri</Text>
            </TouchableOpacity>

            {/* Accordion Content */}
            {isAccordionOpen && (
                <View style={styles.accordionContent}>
                    {contacts.map((contact, index) => (
                        <View key={index} style={styles.contactInputContainer}>
                            <TextInput
                                style={styles.input} // Use the same style as other inputs
                                placeholder={`${index + 1}. Kontağın İsmi`}
                                placeholderTextColor="#FF8C00"
                                value={contact.nickname}
                                onChangeText={(value) => handleContactChange(index, 'nickname', value)}
                            />
                            <TextInput
                                style={styles.input} // Use the same style as other inputs
                                placeholder={`${index + 1}. Telefon Numarası`}
                                placeholderTextColor="#FF8C00"
                                value={contact.number}
                                onChangeText={(value) => handleContactChange(index, 'number', value)}
                                keyboardType="phone-pad"
                            />
                        </View>
                    ))}
                    {contacts.length < 2 && (
                        <TouchableOpacity style={styles.addButton} onPress={addContact}>
                            <Text style={styles.addButtonText}>Acil Durum Kontağı Ekle</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Kayıt Ol</Text>
            </TouchableOpacity>
            <View style={styles.switchContainer}>
                <Text style={styles.switchText}>
                    Zaten hesabınız var mı? 
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.switchLink}> Giriş Yap</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start', // Align items to the top
        alignItems: 'center',
        backgroundColor: '#FFFAF0', // Light background
        padding: 20,
    },
    title: {
        fontSize: 36,
        marginTop:120,
        marginBottom:28,
        
        color: '#FF4500', // Bright red-orange for title
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        borderColor: '#FF4500', // Bright red-orange for the border
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        width: '100%', // Full width for all input fields
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        
    },
    
    accordionHeader: {
        backgroundColor: '#FF4500',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        marginBottom: 10,
    },
    accordionTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    accordionContent: {
        width: '100%',
        padding: 10,
        backgroundColor: '#FFFAF0',
        borderRadius: 10,
    },
    contactInputContainer: {
        flexDirection: 'column', // Stack inputs vertically
        alignItems: 'flex-start',
        marginBottom: 15,
        width: '100%',
    },
    addButton: {
        backgroundColor: '#FF8C00', // Bright orange for the add button
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#FF4500', // Bright red-orange for the button
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    switchContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    switchText: {
        fontSize: 14,
        color: '#FF8C00', // Bright red-orange for the switch text
    },
    switchLink: {
        color: '#FF4500', // Soft blue for the link
        fontWeight: 'bold',
    },
});

export default SignUpScreen;