import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomPicker from '../components/CustomPicker';

const SignUpScreen = ({ navigation }) => {
    // State variables for form fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tcNumber, setTcNumber] = useState('');
    const [tcNumberError, setTcNumberError] = useState(''); // TC kimlik numarası için hata mesajı
    const [age, setAge] = useState('');
    const [ageError, setAgeError] = useState(''); // Yaş için hata mesajı
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(''); // Parola için hata mesajı
    const [bloodType, setBloodType] = useState('');
    const [bloodTypeError, setBloodTypeError] = useState(''); // State for blood type error
    const [contacts, setContacts] = useState([{ nickname: '', number: '' }, { nickname: '', number: '' }]); // Initialize with 2 contacts
    const [contactPhoneErrors, setContactPhoneErrors] = useState(['', '']); // Kontakların telefon numarası için hata mesajları
    const [contactNicknameErrors, setContactNicknameErrors] = useState(['', '']); // Kontakların ismi için hata mesajları
    const [isAgreed, setIsAgreed] = useState(false); // State for privacy policy agreement
    const [step, setStep] = useState(1); // Step state to manage the current step
    const [firstNameError, setFirstNameError] = useState(''); // Hata mesajı için state
    const [lastNameError, setLastNameError] = useState(''); // Hata mesajı için state
    const [isAgreedError, setIsAgreedError] = useState(''); // State for privacy policy agreement error

    const handleSignUp = () => {
        let isValid = true;
        setFirstNameError(''); // Hata mesajını sıfırla
        setLastNameError(''); // Hata mesajını sıfırla
        setTcNumberError(''); // Hata mesajını sıfırla
        setAgeError(''); // Hata mesajını sıfırla
        setPasswordError(''); // Hata mesajını sıfırla
        setPhoneNumberError(''); // Hata mesajını sıfırla
        setContactPhoneErrors(['', '']); // Kontakların telefon numarası için hata mesajlarını sıfırla
        setContactNicknameErrors(['', '']); // Kontakların ismi için hata mesajlarını sıfırla
        setBloodTypeError(''); // Reset error message
        setIsAgreedError(''); // Reset error message for privacy policy agreement

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
        }   else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/.test(password)) {
            setPasswordError('Parola en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir.');
            isValid = false;
        }
        if (!phoneNumber || phoneNumber.trim() === '') {
            setPhoneNumberError('Telefon numarası boş olamaz.');
            isValid = false;
        } else if (phoneNumber.length < 16) {
            setPhoneNumberError('Telefon numarası eksik girilmiştir.');
            isValid = false;
        } else if (!phoneNumber.startsWith('+90 5')) {
            setPhoneNumberError('Telefon numarası +90 5 ile başlamalıdır.');
            isValid = false;
        }

        // 1. Kontak için doğrulama
        if (!contacts[0].nickname || contacts[0].nickname.trim() === '') {
            setContactNicknameErrors((prev) => {
                const newErrors = [...prev];
                newErrors[0] = '1. Kontağın ismi boş geçilemez.';
                return newErrors;
            });
            isValid = false;
        }

        if (!contacts[0].number || contacts[0].number.trim() === '') {
            setContactPhoneErrors((prev) => {
                const newErrors = [...prev];
                newErrors[0] = '1. Kontak telefon numarası boş olamaz.';
                return newErrors;
            });
            isValid = false;
        } else if (contacts[0].number.length < 16) {
            setContactPhoneErrors((prev) => {
                const newErrors = [...prev];
                newErrors[0] = '1. Kontak telefon numarası eksik girilmiştir.';
                return newErrors;
            });
            isValid = false;
        } else if (!contacts[0].number.startsWith('+90 5')) {
            setContactPhoneErrors((prev) => {
                const newErrors = [...prev];
                newErrors[0] = '1. Kontak telefon numarası +90 5 ile başlamalıdır.';
                return newErrors;
            });
            isValid = false;
        }

        // 2. Kontak için doğrulama
        if (!contacts[1].nickname || contacts[1].nickname.trim() === '') {
            setContactNicknameErrors((prev) => {
                const newErrors = [...prev];
                newErrors[1] = '2. Kontağın ismi boş geçilemez.';
                return newErrors;
            });
            isValid = false;
        }

        if (!contacts[1].number || contacts[1].number.trim() === '') {
            setContactPhoneErrors((prev) => {
                const newErrors = [...prev];
                newErrors[1] = '2. Kontak telefon numarası boş olamaz.';
                return newErrors;
            });
            isValid = false;
        } else if (contacts[1].number.length < 16) {
            setContactPhoneErrors((prev) => {
                const newErrors = [...prev];
                newErrors[1] = '2. Kontak telefon numarası eksik girilmiştir.';
                return newErrors;
            });
            isValid = false;
        } else if (!contacts[1].number.startsWith('+90 5')) {
            setContactPhoneErrors((prev) => {
                const newErrors = [...prev];
                newErrors[1] = '2. Kontak telefon numarası +90 5 ile başlamalıdır.';
                return newErrors;
            });
            isValid = false;
        }

        // Telefon numaralarının birbirleriyle aynı olup olmadığının kontrolü
        if (phoneNumber && contacts[0].number && phoneNumber === contacts[0].number) {
            setPhoneNumberError('Telefon numarası ve kontak numarası aynı olamaz.');
            setContactPhoneErrors((prev) => {
                const newErrors = [...prev];
                newErrors[0] = 'Telefon numarası ve kontak numarası aynı olamaz.';
                return newErrors;
            });
            isValid = false;
        }

        if (phoneNumber && contacts[1].number && phoneNumber === contacts[1].number) {
            setPhoneNumberError('Telefon numarası ve kontak numarası aynı olamaz.');
            setContactPhoneErrors((prev) => {
                const newErrors = [...prev];
                newErrors[1] = 'Telefon numarası ve kontak numarası aynı olamaz.';
                return newErrors;
            });
            isValid = false;
        }

        if (contacts[0].number && contacts[1].number && contacts[0].number === contacts[1].number) {
            setContactPhoneErrors((prev) => {
                const newErrors = [...prev];
                newErrors[0] = '1. ve 2. kontak numaraları aynı olamaz.';
                newErrors[1] = '1. ve 2. kontak numaraları aynı olamaz.';
                return newErrors;
            });
            isValid = false;
        }

        // Blood type validation
        if (!bloodType) {
            setBloodTypeError('Kan grubu seçilmelidir.');
            isValid = false;
        }

        // Privacy policy agreement validation
        if (!isAgreed) {
            setIsAgreedError('Gizlilik sözleşmesini onaylamalısınız.');
            isValid = false;
        }

        // Navigate to Main if valid
        if (isValid) {
            navigation.navigate('Main');
        }
    };

    const formatPhoneNumber = (number) => {
        // Rakam olmayan karakterleri temizle
        const cleaned = number.replace(/\D/g, '');
    
        // Boş giriş için direkt dönüş yap
        if (cleaned.length === 0) {
            return '';
        }
    
        // + ekleyerek başlat
        let formatted = '+' + cleaned;
    
        // Boşlukları ekle
        if (cleaned.length > 2) formatted = formatted.slice(0, 3) + ' ' + formatted.slice(3);
        if (cleaned.length > 5) formatted = formatted.slice(0, 7) + ' ' + formatted.slice(7);
        if (cleaned.length > 8) formatted = formatted.slice(0, 11) + ' ' + formatted.slice(11);
        if (cleaned.length > 10) formatted = formatted.slice(0, 14) + ' ' + formatted.slice(14);

        return formatted; // Son karakter için limit kaldırıldı
    };
    
    const handlePhoneNumberChange = (value) => {
        // Kullanıcı girdisini işle
        const formattedNumber = formatPhoneNumber(value);
        
        // Son karakterin kaybolmasını önlemek için doğrudan güncelle
        setPhoneNumber(formattedNumber);
    };

    const handleContactChange = (index, field, value) => {
        const newContacts = [...contacts];
        if (field === 'number') {
            if (value.length === 0) {
                newContacts[index].number = '';
            } else {
                newContacts[index].number = formatPhoneNumber(value);
            }
        } else {
            newContacts[index][field] = value;
        }
        setContacts(newContacts);

        // Hata mesajlarını sıfırlama
        if (field === 'nickname') {
            setContactNicknameErrors((prev) => {
                const newErrors = [...prev];
                newErrors[index] = '';
                return newErrors;
            });
        } else if (field === 'number') {
            setContactPhoneErrors((prev) => {
                const newErrors = [...prev];
                newErrors[index] = '';
                return newErrors;
            });
        }
    };

    const capitalizeFirstLetter = (text) => {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    const handleFirstNameChange = (text) => {
        const capitalizedText = capitalizeFirstLetter(text);
        setFirstName(capitalizedText);
    };

    const handleLastNameChange = (text) => {
        const capitalizedText = capitalizeFirstLetter(text);
        setLastName(capitalizedText);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Kayıt Ol</Text>

            {step === 1 ? (
                <>
                    <View style={styles.contactInputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="İsim"
                            placeholderTextColor="#FF8C00"
                            value={firstName}
                            onChangeText={handleFirstNameChange}
                        />
                        {firstNameError ? <Text style={styles.errorText2}>{firstNameError}</Text> : null}
                    </View>
                    <View style={styles.contactInputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Soyisim"
                            placeholderTextColor="#FF8C00"
                            value={lastName}
                            onChangeText={handleLastNameChange}
                        />
                        {lastNameError ? <Text style={styles.errorText2}>{lastNameError}</Text> : null}
                    </View>
                    <View style={styles.contactInputContainer}>
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
                    </View>
                    <View style={styles.rowContainer}>
                        <TextInput
                            style={styles.rowInput}
                            placeholder="Yaş"
                            placeholderTextColor="#FF8C00"
                            value={age}
                            onChangeText={setAge}
                            keyboardType="numeric"
                        />
                        <CustomPicker
                            selectedValue={bloodType}
                            onValueChange={setBloodType}
                            options={[
                                { label: 'A+', value: 'A+' },
                                { label: 'A-', value: 'A-' },
                                { label: 'B+', value: 'B+' },
                                { label: 'B-', value: 'B-' },
                                { label: 'AB+', value: 'AB+' },
                                { label: 'AB-', value: 'AB-' },
                                { label: '0+', value: '0+' },
                                { label: '0-', value: '0-' },
                            ]}
                        />
                    </View>
                    <View style={styles.errorRowContainer}>
                        {ageError ? <Text style={styles.errorText}>{ageError}</Text> : null}
                        {bloodTypeError ? <Text style={[styles.errorText2, { marginRight: 18, }]}>{bloodTypeError}</Text> : null}

                    </View>
                    <View style={styles.contactInputContainer}>

                    <TextInput
                        style={styles.input}
                        placeholder="Parola"
                        placeholderTextColor="#FF8C00"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    {passwordError ? <Text style={styles.errorText2}>{passwordError}</Text> : null}
                    </View>
                    <View style={styles.contactInputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Telefon Numarası"
                            placeholderTextColor="#FF8C00"
                            value={phoneNumber}
                            onChangeText={handlePhoneNumberChange}
                            keyboardType="phone-pad"
                            maxLength={17}
                        />
                        {phoneNumberError ? <Text style={styles.errorText2}>{phoneNumberError}</Text> : null}
                    </View>
                    <View style={styles.stepIndicator}>
                        <View style={[styles.stepCircle, step === 1 && styles.activeStep]} />
                        <View style={[styles.stepCircle, step === 2 && styles.activeStep]} />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => setStep(2)}>
                        <Text style={styles.buttonText}>Devam Et</Text>
                    </TouchableOpacity>

                    {/* Privacy Policy Agreement for Step 1 */}
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
                    {isAgreedError ? <Text style={styles.errorText4}>{isAgreedError}</Text> : null}
                </>
            ) : (
                <>
                    <View style={styles.contactInputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="1. Kontağın İsmi"
                            placeholderTextColor="#FF8C00"
                            value={contacts[0].nickname}
                            onChangeText={(value) => handleContactChange(0, 'nickname', value)}
                        />
                        {contactNicknameErrors[0] ? <Text style={styles.errorText2}>{contactNicknameErrors[0]}</Text> : null}
                    </View>

                    <View style={styles.contactInputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="1. Telefon Numarası"
                            placeholderTextColor="#FF8C00"
                            value={contacts[0].number}
                            onChangeText={(value) => handleContactChange(0, 'number', value)}
                            keyboardType="phone-pad"
                            maxLength={17}
                        />
                        {contactPhoneErrors[0] ? <Text style={styles.errorText2}>{contactPhoneErrors[0]}</Text> : null}
                    </View>

                    <View style={styles.contactInputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="2. Kontağın İsmi"
                            placeholderTextColor="#FF8C00"
                            value={contacts[1].nickname}
                            onChangeText={(value) => handleContactChange(1, 'nickname', value)}
                        />
                        {contactNicknameErrors[1] ? <Text style={styles.errorText2}>{contactNicknameErrors[1]}</Text> : null}
                    </View>

                    <View style={styles.contactInputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="2. Telefon Numarası"
                            placeholderTextColor="#FF8C00"
                            value={contacts[1].number}
                            onChangeText={(value) => handleContactChange(1, 'number', value)}
                            keyboardType="phone-pad"
                            maxLength={17}
                        />
                        {contactPhoneErrors[1] ? <Text style={styles.errorText2}>{contactPhoneErrors[1]}</Text> : null}
                    </View>

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

                    {/* Privacy Policy Agreement for Step 2 */}
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
                    {isAgreedError ? <Text style={styles.errorText4}>{isAgreedError}</Text> : null}
                </>
            )}
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFFAF0',
        padding: 20,
    },
    title: {
        fontSize: 36,
        marginTop: 90,
        marginBottom: 28,
        color: '#FF4500',
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        borderColor: '#FF4500',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
        borderColor: '#FF4500',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        width: '48%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    contactInputContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
    },
    button: {
        backgroundColor: '#FF4500',
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
        color: 'black',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'left',
        marginTop: -10,
    },
    stepIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
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
    switchContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    switchText: {
        fontSize: 14,
        color: '#FF8C00',
    },
    switchLink: {
        color: '#FF4500',
        fontWeight: 'bold',
    },
    errorText2: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'left',
        marginTop: -10,
    },
    errorText4: {
        color: 'red',
        marginTop: 10,
        textAlign: 'left',
    },
    errorRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
});

export default SignUpScreen;