// src/validators.js
import validUrl from 'valid-url';
import emailValidator from 'email-validator';

export function required(value) {
  return !value ? ['This field cannot be empty'] : [];
}

export function url(value) {
  return value && !validUrl.isWebUri(value) ? ['This URL is invalid'] : [];
}

export function email(value) {
  return !emailValidator.validate(value) ? ['This email address is invalid']: [];
}

export function phone(value) {
  var phoneno = /^\d{8,12}$/;
  return !phoneno.test(value) ? ['This phone number is invalid']: [];
}

export function number(value){
  console.log('check numeber or not ',isNaN(value));
  return isNaN(value) ? ['This number is invalid']:[];
}
