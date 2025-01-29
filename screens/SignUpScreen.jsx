import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import CheckBox from '@react-native-community/checkbox';// Import the icon library

const SignUpScreen = ({ navigation }) => {
    // State variables for form fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tcNumber, setTcNumber] = useState('');
    const [tcNumberError, setTcNumberError] = useState(''); // TC kimlik numarası için hata mesajı
    const [age, setAge] = useState('');
    const [ageError, setAgeError] = useState(''); // Yaş için hata mesajı
    const [phoneNumber, setPhoneNumber] = useState(''); // Telefon numarası için state
    const [phoneNumberError, setPhoneNumberError] = useState(''); // Telefon numarası için hata mesajı
    const [secondPhoneNumber, setSecondPhoneNumber] = useState(''); // İkinci telefon numarası için state
    const [secondPhoneNumberError, setSecondPhoneNumberError] = useState(''); // İkinci telefon numarası için hata mesajı
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(''); // Parola için hata mesajı
    const [bloodType, setBloodType] = useState('');
    const [contacts, setContacts] = useState([{ nickname: '', number: '' }, { nickname: '', number: '' }]); // Initialize with 2 contacts
    const [contactPhoneErrors, setContactPhoneErrors] = useState(['', '']); // Kontakların telefon numarası için hata mesajları
    const [isAccordionOpen, setIsAccordionOpen] = useState(false); // State to manage accordion visibility
    const [isAgreed, setIsAgreed] = useState(false); // State for privacy policy agreement
    const [step, setStep] = useState(1); // Step state to manage the current step
    const [firstNameError, setFirstNameError] = useState(''); // Hata mesajı için state
    const [lastNameError, setLastNameError] = useState(''); // Hata mesajı için state

    const handleSignUp = () => {
        let isValid = true;
        setFirstNameError(''); // Hata mesajını sıfırla
        setLastNameError(''); // Hata mesajını sıfırla
        setTcNumberError(''); // Hata mesajını sıfırla
        setAgeError(''); // Hata mesajını sıfırla
        setPasswordError(''); // Hata mesajını sıfırla
        setPhoneNumberError(''); // Hata mesajını sıfırla
        setSecondPhoneNumberError(''); // Hata mesajını sıfırla
        setContactPhoneErrors(['', '']); // Kontakların telefon numarası için hata mesajlarını sıfırla

        // Doğrulama
        if (!firstName) {
            setFirstNameError('İsim alanı boş olamaz.');
            isValid = false;
        }
        if (!lastName) {
            setLastNameError('Soyisim alanı boş olamaz.');
            isValid = false;
        }
        if (!tcNumber) {
            setTcNumberError('TC Kimlik Numarası boş olamaz.');
            isValid = false;
        } else if (tcNumber.length < 11) {
            setTcNumberError('TC Kimlik Numarası 11 haneli olmalıdır.');
            isValid = false;
        } else if (!/^\d+$/.test(tcNumber)) {
            setTcNumberError('TC Kimlik Numarası sadece rakamlardan oluşmalıdır.');
            isValid = false;
        }
        if (!age) {
            setAgeError('Yaş alanı boş olamaz.');
            isValid = false;
        } else if (!/^\d+$/.test(age)) {
            setAgeError('Yaş sadece rakamlardan oluşmalıdır.');
            isValid = false;
        }
        if (!password) {
            setPasswordError('Parola alanı boş olamaz.');
            isValid = false;
        } else if (password.length < 8) {
            setPasswordError('Parola en az 8 karakter olmalıdır.');
            isValid = false;
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(password)) {
            setPasswordError('Parola en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir.');
            isValid = false;
        }
        if (!phoneNumber) {
            setPhoneNumberError('Telefon numarası boş olamaz.');
            isValid = false;
        } else if (phoneNumber.length !== 11) {
            setPhoneNumberError('Telefon numarası 11 haneli olmalıdır.');
            isValid = false;
        } else if (!/^0\d{10}$/.test(phoneNumber)) {
            setPhoneNumberError('Telefon numarası "0" ile başlamalıdır.');
            isValid = false;
        }
        if (!secondPhoneNumber) {
            setSecondPhoneNumberError('İkinci telefon numarası boş olamaz.');
            isValid = false;
        } else if (secondPhoneNumber.length !== 11) {
            setSecondPhoneNumberError('İkinci telefon numarası 11 haneli olmalıdır.');
            isValid = false;
        } else if (!/^0\d{10}$/.test(secondPhoneNumber)) {
            setSecondPhoneNumberError('İkinci telefon numarası "0" ile başlamalıdır.');
            isValid = false;
        }

        // Kontakların telefon numaraları için doğrulama
        contacts.forEach((contact, index) => {
            if (!contact.nickname) {
                setContactPhoneErrors((prev) => {
                    const newErrors = [...prev];
                    newErrors[index] = 'Kontağın ismi boş geçilemez.'; // Hata mesajı
                    return newErrors;
                });
                isValid = false;
            }
            if (!contact.number) {
                setContactPhoneErrors((prev) => {
                    const newErrors = [...prev];
                    newErrors[index] = 'Telefon numarası boş olamaz.'; // Hata mesajı
                    return newErrors;
                });
                isValid = false;
            } else if (contact.number.length !== 11) {
                setContactPhoneErrors((prev) => {
                    const newErrors = [...prev];
                    newErrors[index] = 'Telefon numarası 11 haneli olmalıdır.'; // Hata mesajı
                    return newErrors;
                });
                isValid = false;
            } else if (!/^0\d{10}$/.test(contact.number)) {
                setContactPhoneErrors((prev) => {
                    const newErrors = [...prev];
                    newErrors[index] = 'Telefon numarası "0" ile başlamalıdır.'; // Hata mesajı
                    return newErrors;
                });
                isValid = false;
            }
        });

        if (isValid) {
            navigation.navigate('SignIn');
        }
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
                    {firstNameError ? <Text style={styles.errorText2}>{firstNameError}</Text> : null}
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Soyisim"
                        placeholderTextColor="#FF8C00"
                        value={lastName}
                        onChangeText={setLastName}
                    />
                    {lastNameError ? <Text style={styles.errorText2}>{lastNameError}</Text> : null}
                    
                    <TextInput
                        style={styles.input}
                        placeholder="TC Kimlik Numarası"
                        placeholderTextColor="#FF8C00"
                        value={tcNumber}
                        onChangeText={setTcNumber}
                        keyboardType="numeric"
                        maxLength={11}
                    />
                    {tcNumberError ? <Text style={styles.errorText2}>{tcNumberError}</Text> : null}
                    
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
                    {ageError ? <Text style={[styles.errorText, { textAlign: 'left', width: '100%' }]}>{ageError}</Text> : null}
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Parola"
                        placeholderTextColor="#FF8C00"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    {passwordError ? <Text style={styles.errorText2}>{passwordError}</Text> : null}
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Telefon Numarası" // Telefon numarası için placeholder
                        placeholderTextColor="#FF8C00"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad" // Telefon numarası girişi için klavye türü
                        maxLength={11} // 11 hanelik kısıtlama
                    />
                    {phoneNumberError ? <Text style={styles.errorText2}>{phoneNumberError}</Text> : null}
                    
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
                    {/* İkinci adımda kontak bilgileri */}
                    {contacts.map((contact, index) => (
                        <View key={index} style={styles.contactInputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder={`${index + 1}. Kontağın İsmi`}
                                placeholderTextColor="#FF8C00"
                                value={contact.nickname}
                                onChangeText={(value) => handleContactChange(index, 'nickname', value)}
                            />
                            {contactPhoneErrors[index] ? <Text style={styles.errorText2}>{contactPhoneErrors[index]}</Text> : null}
                            <TextInput
                                style={styles.input}
                                placeholder={`${index + 1}. Telefon Numarası`}
                                placeholderTextColor="#FF8C00"
                                value={contact.number}
                                onChangeText={(value) => handleContactChange(index, 'number', value)}
                                keyboardType="phone-pad"
                                maxLength={11} // 11 hanelik kısıtlama
                            />
                            {contactPhoneErrors[index] ? <Text style={styles.errorText2}>{contactPhoneErrors[index]}</Text> : null}
                        </View>
                    ))}
                    {contacts.length < 2 && (
                        <TouchableOpacity style={styles.addButton} onPress={addContact}>
                            <Text style={styles.addButtonText}>Acil Durum Kontağı Ekle</Text>
                        </TouchableOpacity>
                    )}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                        <TouchableOpacity style={styles.backButton} onPress={() => setStep(1)}>
                            <Icon name="arrow-left" size={20} color="#FF4500" />
                        </TouchableOpacity>
                        <View style={styles.stepIndicator}>
                            <View style={[styles.stepCircle, step === 1 && styles.activeStep]} />
                            <View style={[styles.stepCircle, step === 2 && styles.activeStep]} />
                        </View>
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
        marginBottom: 15,
    },
    rowInput: {
        height: 50,
        borderColor: '#FF4500', // Bright red-orange for the border
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 0,
        width: '48%',
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
        color: '#FF8C00',
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
    errorText: {
        color: 'red', // Hata mesajı için kırmızı renk
        marginBottom: 10, // Hata mesajının altındaki boşluğu artırıyoruz
        textAlign: 'left', // Hata mesajını sola hizala
        width: '100%', // Hata mesajının genişliğini ayarla
    },
    errorText2: {
        color: 'red', // Hata mesajı için kırmızı renk
        marginBottom: 10, 
        textAlign: 'left', // Hata mesajını sola hizala
    },
});

export default SignUpScreen;