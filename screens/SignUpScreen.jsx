import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import CustomPicker from '../components/CustomPicker';
import {useColorModeValue} from 'native-base';
import {styles} from '../styles/SignUpScreen.styles';
import {useSignup} from '../services/requests/authRequest';

const SignUpScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [tcNumber, setTcNumber] = useState('');
  const [tcNumberError, setTcNumberError] = useState('');
  const [age, setAge] = useState('');
  const [ageError, setAgeError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [bloodTypeError, setBloodTypeError] = useState('');
  const [contacts, setContacts] = useState([
    {nickname: '', number: ''},
    {nickname: '', number: ''},
  ]);
  const [contactPhoneErrors, setContactPhoneErrors] = useState(['', '']);
  const [contactNicknameErrors, setContactNicknameErrors] = useState(['', '']);
  const [isAgreed, setIsAgreed] = useState(false);
  const [step, setStep] = useState(1);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [isAgreedError, setIsAgreedError] = useState('');

  const signupData = useSignup();

  // Dark mode renkleri
  const bgColor = useColorModeValue('#FFFAF0', '#121212');
  const inputBgColor = useColorModeValue('rgba(255, 255, 255, 0.9)', '#1E1E1E');
  const inputBorderColor = useColorModeValue('#FF4500', '#FF6347');
  const textColor = useColorModeValue('#000000', '#E8E8E8');
  const placeholderColor = useColorModeValue('#FF8C00', '#FF6347');
  const secondaryTextColor = useColorModeValue('#FF8C00', '#B0B0B0');
  const buttonBgColor = useColorModeValue('#FF4500', '#FF6347');
  const errorColor = useColorModeValue('#FF0000', '#FF6666');

  const handleSignUp = async () => {
    let isValid = true;
    setFirstNameError('');
    setLastNameError('');
    setTcNumberError('');
    setAgeError('');
    setPasswordError('');
    setPhoneNumberError('');
    setContactPhoneErrors(['', '']);
    setContactNicknameErrors(['', '']);
    setBloodTypeError('');
    setIsAgreedError('');

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
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/.test(
        password,
      )
    ) {
      setPasswordError(
        'Parola en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir.',
      );
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
      setContactNicknameErrors(prev => {
        const newErrors = [...prev];
        newErrors[0] = '1. Kontağın ismi boş geçilemez.';
        return newErrors;
      });
      isValid = false;
    }

    if (!contacts[0].number || contacts[0].number.trim() === '') {
      setContactPhoneErrors(prev => {
        const newErrors = [...prev];
        newErrors[0] = '1. Kontak telefon numarası boş olamaz.';
        return newErrors;
      });
      isValid = false;
    } else if (contacts[0].number.length < 16) {
      setContactPhoneErrors(prev => {
        const newErrors = [...prev];
        newErrors[0] = '1. Kontak telefon numarası eksik girilmiştir.';
        return newErrors;
      });
      isValid = false;
    } else if (!contacts[0].number.startsWith('+90 5')) {
      setContactPhoneErrors(prev => {
        const newErrors = [...prev];
        newErrors[0] = '1. Kontak telefon numarası +90 5 ile başlamalıdır.';
        return newErrors;
      });
      isValid = false;
    }

    // 2. Kontak için doğrulama
    if (!contacts[1].nickname || contacts[1].nickname.trim() === '') {
      setContactNicknameErrors(prev => {
        const newErrors = [...prev];
        newErrors[1] = '2. Kontağın ismi boş geçilemez.';
        return newErrors;
      });
      isValid = false;
    }

    if (!contacts[1].number || contacts[1].number.trim() === '') {
      setContactPhoneErrors(prev => {
        const newErrors = [...prev];
        newErrors[1] = '2. Kontak telefon numarası boş olamaz.';
        return newErrors;
      });
      isValid = false;
    } else if (contacts[1].number.length < 16) {
      setContactPhoneErrors(prev => {
        const newErrors = [...prev];
        newErrors[1] = '2. Kontak telefon numarası eksik girilmiştir.';
        return newErrors;
      });
      isValid = false;
    } else if (!contacts[1].number.startsWith('+90 5')) {
      setContactPhoneErrors(prev => {
        const newErrors = [...prev];
        newErrors[1] = '2. Kontak telefon numarası +90 5 ile başlamalıdır.';
        return newErrors;
      });
      isValid = false;
    }

    // Telefon numaralarının birbirleriyle aynı olup olmadığının kontrolü
    if (
      phoneNumber &&
      contacts[0].number &&
      phoneNumber === contacts[0].number
    ) {
      setPhoneNumberError('Telefon numarası ve kontak numarası aynı olamaz.');
      setContactPhoneErrors(prev => {
        const newErrors = [...prev];
        newErrors[0] = 'Telefon numarası ve kontak numarası aynı olamaz.';
        return newErrors;
      });
      isValid = false;
    }

    if (
      phoneNumber &&
      contacts[1].number &&
      phoneNumber === contacts[1].number
    ) {
      setPhoneNumberError('Telefon numarası ve kontak numarası aynı olamaz.');
      setContactPhoneErrors(prev => {
        const newErrors = [...prev];
        newErrors[1] = 'Telefon numarası ve kontak numarası aynı olamaz.';
        return newErrors;
      });
      isValid = false;
    }

    if (
      contacts[0].number &&
      contacts[1].number &&
      contacts[0].number === contacts[1].number
    ) {
      setContactPhoneErrors(prev => {
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
      try {
        const userData = {
          name: firstName,
          surname: lastName,
          tcKimlik: tcNumber,
          age: parseInt(age),
          password: password,
          phoneNumber: phoneNumber,
          bloodGroup: bloodType,
          emergencyContacts: contacts.map(contact => ({
            contactInfo: contact.nickname,
            contactNumber: contact.number,
          })),
        };

        await signupData.mutateAsync(userData);
        navigation.navigate('SignIn');
      } catch (error) {
        console.error('Kayıt hatası:', error);
      }
    }
  };

  const formatPhoneNumber = number => {
    // Rakam olmayan karakterleri temizle
    const cleaned = number.replace(/\D/g, '');

    // Boş giriş için direkt dönüş yap
    if (cleaned.length === 0) {
      return '';
    }

    // + ekleyerek başlat
    let formatted = '+' + cleaned;

    // Boşlukları ekle
    if (cleaned.length > 2)
      formatted = formatted.slice(0, 3) + ' ' + formatted.slice(3);
    if (cleaned.length > 5)
      formatted = formatted.slice(0, 7) + ' ' + formatted.slice(7);
    if (cleaned.length > 8)
      formatted = formatted.slice(0, 11) + ' ' + formatted.slice(11);
    if (cleaned.length > 10)
      formatted = formatted.slice(0, 14) + ' ' + formatted.slice(14);

    return formatted; // Son karakter için limit kaldırıldı
  };

  const handlePhoneNumberChange = value => {
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
      setContactNicknameErrors(prev => {
        const newErrors = [...prev];
        newErrors[index] = '';
        return newErrors;
      });
    } else if (field === 'number') {
      setContactPhoneErrors(prev => {
        const newErrors = [...prev];
        newErrors[index] = '';
        return newErrors;
      });
    }
  };

  const capitalizeFirstLetter = text => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const handleFirstNameChange = text => {
    const capitalizedText = capitalizeFirstLetter(text);
    setFirstName(capitalizedText);
  };

  const handleLastNameChange = text => {
    const capitalizedText = capitalizeFirstLetter(text);
    setLastName(capitalizedText);
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, {backgroundColor: bgColor}]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.title, {color: buttonBgColor}]}>Kayıt Ol</Text>
      </View>

      {step === 1 ? (
        <>
          <View style={styles.contactInputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: inputBgColor,
                  borderColor: inputBorderColor,
                  color: textColor,
                },
              ]}
              placeholder="İsim"
              placeholderTextColor={placeholderColor}
              value={firstName}
              onChangeText={handleFirstNameChange}
            />
            {firstNameError ? (
              <Text style={[styles.errorText2, {color: errorColor}]}>
                {firstNameError}
              </Text>
            ) : null}
          </View>
          <View style={styles.contactInputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: inputBgColor,
                  borderColor: inputBorderColor,
                  color: textColor,
                },
              ]}
              placeholder="Soyisim"
              placeholderTextColor={placeholderColor}
              value={lastName}
              onChangeText={handleLastNameChange}
            />
            {lastNameError ? (
              <Text style={[styles.errorText2, {color: errorColor}]}>
                {lastNameError}
              </Text>
            ) : null}
          </View>
          <View style={styles.contactInputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: inputBgColor,
                  borderColor: inputBorderColor,
                  color: textColor,
                },
              ]}
              placeholder="TC Kimlik Numarası"
              placeholderTextColor={placeholderColor}
              value={tcNumber}
              onChangeText={setTcNumber}
              keyboardType="numeric"
              maxLength={11}
            />
            {tcNumberError ? (
              <Text style={[styles.errorText2, {color: errorColor}]}>
                {tcNumberError}
              </Text>
            ) : null}
          </View>
          <View style={styles.rowContainer}>
            <TextInput
              style={[
                styles.rowInput,
                {
                  backgroundColor: inputBgColor,
                  borderColor: inputBorderColor,
                  color: textColor,
                },
              ]}
              placeholder="Yaş"
              placeholderTextColor={placeholderColor}
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />
            <CustomPicker
              selectedValue={bloodType}
              onValueChange={setBloodType}
              options={[
                {label: 'A+', value: 'A+'},
                {label: 'A-', value: 'A-'},
                {label: 'B+', value: 'B+'},
                {label: 'B-', value: 'B-'},
                {label: 'AB+', value: 'AB+'},
                {label: 'AB-', value: 'AB-'},
                {label: '0+', value: '0+'},
                {label: '0-', value: '0-'},
              ]}
            />
          </View>
          <View style={styles.errorRowContainer}>
            {ageError ? (
              <Text style={[styles.errorText, {color: errorColor}]}>
                {ageError}
              </Text>
            ) : null}
            {bloodTypeError ? (
              <Text
                style={[
                  styles.errorText2,
                  {marginRight: 18, color: errorColor},
                ]}>
                {bloodTypeError}
              </Text>
            ) : null}
          </View>
          <View style={styles.contactInputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: inputBgColor,
                  borderColor: inputBorderColor,
                  color: textColor,
                },
              ]}
              placeholder="Parola"
              placeholderTextColor={placeholderColor}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {passwordError ? (
              <Text style={[styles.errorText2, {color: errorColor}]}>
                {passwordError}
              </Text>
            ) : null}
          </View>
          <View style={styles.contactInputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: inputBgColor,
                  borderColor: inputBorderColor,
                  color: textColor,
                },
              ]}
              placeholder="Telefon Numarası"
              placeholderTextColor={placeholderColor}
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              keyboardType="phone-pad"
              maxLength={17}
            />
            {phoneNumberError ? (
              <Text style={[styles.errorText2, {color: errorColor}]}>
                {phoneNumberError}
              </Text>
            ) : null}
          </View>
          <View style={styles.stepIndicator}>
            <View
              style={[
                styles.stepCircle,
                step === 1 && [
                  styles.activeStep,
                  {backgroundColor: buttonBgColor},
                ],
                {backgroundColor: secondaryTextColor},
              ]}
            />
            <View
              style={[
                styles.stepCircle,
                step === 2 && [
                  styles.activeStep,
                  {backgroundColor: buttonBgColor},
                ],
                {backgroundColor: secondaryTextColor},
              ]}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, {backgroundColor: buttonBgColor}]}
            onPress={() => setStep(2)}>
            <Text style={styles.buttonText}>Devam Et</Text>
          </TouchableOpacity>

          <View style={styles.agreementContainer}>
            <TouchableOpacity
              onPress={() => setIsAgreed(!isAgreed)}
              style={styles.checkbox}>
              {isAgreed ? (
                <Icon name="check-square" size={20} color={inputBorderColor} />
              ) : (
                <Icon name="square-o" size={20} color={inputBorderColor} />
              )}
            </TouchableOpacity>
            <Text style={[styles.agreementText, {color: textColor}]}>
              Gizlilik sözleşmesini onaylıyorum.
            </Text>
          </View>
          {isAgreedError ? (
            <View style={styles.errorOuterContainer}>
              <View
                style={[
                  styles.errorContainer,
                  {
                    backgroundColor: 'rgba(255, 69, 0, 0.1)', // Turuncu opak arka plan
                    borderColor: buttonBgColor, // Turuncu border
                  },
                ]}>
                <Icon
                  name="exclamation-circle"
                  size={20}
                  color={buttonBgColor}
                  style={styles.errorIcon}
                />
                <Text style={[styles.errorText4, {color: buttonBgColor}]}>
                  {isAgreedError}
                </Text>
              </View>
            </View>
          ) : null}
        </>
      ) : (
        <>
          <View style={styles.contactInputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: inputBgColor,
                  borderColor: inputBorderColor,
                  color: textColor,
                },
              ]}
              placeholder="1. Kontağın İsmi"
              placeholderTextColor={placeholderColor}
              value={contacts[0].nickname}
              onChangeText={value => handleContactChange(0, 'nickname', value)}
            />
            {contactNicknameErrors[0] ? (
              <Text style={[styles.errorText2, {color: errorColor}]}>
                {contactNicknameErrors[0]}
              </Text>
            ) : null}
          </View>

          <View style={styles.contactInputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: inputBgColor,
                  borderColor: inputBorderColor,
                  color: textColor,
                },
              ]}
              placeholder="1. Telefon Numarası"
              placeholderTextColor={placeholderColor}
              value={contacts[0].number}
              onChangeText={value => handleContactChange(0, 'number', value)}
              keyboardType="phone-pad"
              maxLength={17}
            />
            {contactPhoneErrors[0] ? (
              <Text style={[styles.errorText2, {color: errorColor}]}>
                {contactPhoneErrors[0]}
              </Text>
            ) : null}
          </View>

          <View style={styles.contactInputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: inputBgColor,
                  borderColor: inputBorderColor,
                  color: textColor,
                },
              ]}
              placeholder="2. Kontağın İsmi"
              placeholderTextColor={placeholderColor}
              value={contacts[1].nickname}
              onChangeText={value => handleContactChange(1, 'nickname', value)}
            />
            {contactNicknameErrors[1] ? (
              <Text style={[styles.errorText2, {color: errorColor}]}>
                {contactNicknameErrors[1]}
              </Text>
            ) : null}
          </View>

          <View style={styles.contactInputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: inputBgColor,
                  borderColor: inputBorderColor,
                  color: textColor,
                },
              ]}
              placeholder="2. Telefon Numarası"
              placeholderTextColor={placeholderColor}
              value={contacts[1].number}
              onChangeText={value => handleContactChange(1, 'number', value)}
              keyboardType="phone-pad"
              maxLength={17}
            />
            {contactPhoneErrors[1] ? (
              <Text style={[styles.errorText2, {color: errorColor}]}>
                {contactPhoneErrors[1]}
              </Text>
            ) : null}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setStep(1)}>
              <Icon name="arrow-left" size={20} color={buttonBgColor} />
            </TouchableOpacity>
            <View style={styles.stepIndicator}>
              <View
                style={[
                  styles.stepCircle,
                  step === 1 && [
                    styles.activeStep,
                    {backgroundColor: buttonBgColor},
                  ],
                  {backgroundColor: secondaryTextColor},
                ]}
              />
              <View
                style={[
                  styles.stepCircle,
                  step === 2 && [
                    styles.activeStep,
                    {backgroundColor: buttonBgColor},
                  ],
                  {backgroundColor: secondaryTextColor},
                ]}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, {backgroundColor: buttonBgColor}]}
            onPress={handleSignUp}>
            <Text style={styles.buttonText}>Kayıt Ol</Text>
          </TouchableOpacity>

          <View style={styles.agreementContainer}>
            <TouchableOpacity
              onPress={() => setIsAgreed(!isAgreed)}
              style={styles.checkbox}>
              {isAgreed ? (
                <Icon name="check-square" size={20} color={inputBorderColor} />
              ) : (
                <Icon name="square-o" size={20} color={inputBorderColor} />
              )}
            </TouchableOpacity>
            <Text style={[styles.agreementText, {color: textColor}]}>
              Gizlilik sözleşmesini onaylıyorum.
            </Text>
          </View>
          {isAgreedError ? (
            <View style={styles.errorOuterContainer}>
              <View
                style={[
                  styles.errorContainer,
                  {
                    backgroundColor: 'rgba(255, 69, 0, 0.1)', // Turuncu opak arka plan
                    borderColor: buttonBgColor, // Turuncu border
                  },
                ]}>
                <Icon
                  name="exclamation-circle"
                  size={20}
                  color={buttonBgColor}
                  style={styles.errorIcon}
                />
                <Text style={[styles.errorText4, {color: buttonBgColor}]}>
                  {isAgreedError}
                </Text>
              </View>
            </View>
          ) : null}
        </>
      )}
      <View style={styles.switchContainer}>
        <Text style={[styles.switchText, {color: secondaryTextColor}]}>
          Zaten hesabınız var mı?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={[styles.switchLink, {color: buttonBgColor}]}>
            {' '}
            Giriş Yap
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
