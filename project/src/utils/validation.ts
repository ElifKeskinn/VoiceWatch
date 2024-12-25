export const validateTCKN = (tckn: string): boolean => {
  return /^[1-9][0-9]{10}$/.test(tckn);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validatePhoneNumber = (phone: string): boolean => {
  return /^05[0-9]{9}$/.test(phone);
};