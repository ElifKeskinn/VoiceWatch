import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import CheckBox from '@react-native-community/checkbox';// Import the icon library

const SignUpScreen = ({ navigation }) => {
    // State variables for form fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tcNumber, setTcNumber] = useState('');
    const [age, setAge] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); // Telefon numarası için state
    const [password, setPassword] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [contacts, setContacts] = useState([{ nickname: '', number: '' }, { nickname: '', number: '' }]); // Initialize with 2 contacts
    const [isAccordionOpen, setIsAccordionOpen] = useState(false); // State to manage accordion visibility
    const [isAgreed, setIsAgreed] = useState(false); // State for privacy policy agreement
    const [step, setStep] = useState(1); // Step state to manage the current step

    const handleSignUp = () => {
        // Kullanıcıyı HomeScreen'e yönlendir
        navigation.navigate('Home');
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
           
            {step === 1 ? (
                <>
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
                    <View style={styles.rowContainer}>
                        <TextInput
                            style={styles.rowInput}
                            placeholder="Yaş"
                            placeholderTextColor="#FF8C00"
                            value={age}
                            onChangeText={setAge}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.rowInput}
                            placeholder="Kan Grubu"
                            placeholderTextColor="#FF8C00"
                            value={bloodType}
                            onChangeText={setBloodType}
                        />
                    </View>
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
                        placeholder="Telefon Numarası" // Telefon numarası için placeholder
                        placeholderTextColor="#FF8C00"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad" // Telefon numarası girişi için klavye türü
                    />
                       <View style={styles.stepIndicator}>
                <View style={[styles.stepCircle, step === 1 && styles.activeStep]} />
                <View style={[styles.stepCircle, step === 2 && styles.activeStep]} />
                </View>
                    
                    <TouchableOpacity style={styles.button} onPress={() => setStep(2)}>
                        <Text style={styles.buttonText}>Devam Et</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <TouchableOpacity style={styles.backButton} onPress={() => setStep(1)}>
                        <Icon name="arrow-left" size={20} color="#FF4500" />
                    </TouchableOpacity>
                    
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
                     <View style={styles.stepIndicator}>
                <View style={[styles.stepCircle, step === 1 && styles.activeStep]} />
                <View style={[styles.stepCircle, step === 2 && styles.activeStep]} />
            </View>
                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Kayıt Ol</Text>
                    </TouchableOpacity>
                </>
            )}
            {/* Privacy Policy Agreement */}
            <View style={styles.agreementContainer}>
                <TouchableOpacity onPress={() => setIsAgreed(!isAgreed)} style={styles.checkbox}>
                    {isAgreed ? (
                        <Icon name="check-square" size={20} color="#FF4500" />
                    ) : (
                        <Icon name="square-o" size={20} color="#FF4500" />
                    )}
                </TouchableOpacity>
                <Text style={styles.agreementText}>
                    Gizlilik sözleşmesini onaylıyorum.
                </Text>
            </View>
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
        marginTop: 90,
        marginBottom: 28,
        color: '#FF4500', // Bright red-orange for title
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 24,
        marginBottom: 20,
        color: '#FF4500',
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
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    rowInput: {
        height: 50,
        borderColor: '#FF4500', // Bright red-orange for the border
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        width: '48%', // Adjust width to fit two inputs side by side
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
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
    backButton: {
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    agreementContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    checkbox: {
        marginRight: 10,
    },
    agreementText: {
        fontSize: 14,
        color: '#FF4500',
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
    stepIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10 ,
        width: '100%',
        marginBottom: 20,
    },
    stepCircle: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: '#FF8C00',
        opacity: 0.4,
    },
    activeStep: {
        opacity: 1,
    },
});

export default SignUpScreen;