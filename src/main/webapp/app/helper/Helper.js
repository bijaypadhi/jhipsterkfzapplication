import { parsePhoneNumberFromString } from 'libphonenumber-js';

const isUndefined = value => {
  return value === '' ||
    value === undefined ||
    value === null ||
    value === 'undefined'
    ? true
    : false;
};

const checkAlphabeticOnly = text => {
  const regex = /^[a-zA-Z ]*$/;
  if (regex.test(text) === false) {
    return false;
  } else {
    return true;
  }
};
const checkIsValidEmail = text => {
  const regex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regex.test(text) === false) {
    return false;
  } else {
    return true;
  }
};

const checkIsValidPhone = (phoneNumber, countryCode = 'IN') => {
  try {
    const phone = parsePhoneNumberFromString(phoneNumber, countryCode);
    return phone?.isValid() || false; // Returns true if valid, otherwise false
  } catch (error) {
    return false; // Return false if there's an error in parsing
  }
};

const checkIsValidPassword = text => {
  const regex = /^.{6,}$/;
  if (regex.test(text) === false) {
    return false;
  } else {
    return true;
  }
};

const check40CharacterOnly = string => {
  return string.length > 40;
};

// Format time as MM:SS
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const Helper = {
  checkIsValidEmail,
  isUndefined,
  checkIsValidPhone,
  checkIsValidPassword,
  checkAlphabeticOnly,
  check40CharacterOnly,
  formatTime
};
