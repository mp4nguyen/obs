// src/validators.js
import validUrl from 'valid-url';
import emailValidator from 'email-validator';

export function required(value) {
  return !value ? ['This field cannot be empty'] : [];
}

export function url(value) {
  if(value){
    return value && !validUrl.isWebUri(value) ? ['This URL is invalid'] : [];
  }else {
    return [];
  }
}

export function email(value) {
  //console.log('email validator value = ',value);
  if(value){
    //console.log('email validator value = ',value,'  return = ',(!emailValidator.validate(value) ? ['This email address is invalid']: []));
    return !emailValidator.validate(value) ? ['This email address is invalid']: [];
  }else {
    return [];
  }
}

export function phone(value) {
  if(value){
    var phoneno = /^\d{8,12}$/;
    return !phoneno.test(value) ? ['This phone number is invalid']: [];
  }else {
    return [];
  }
}

export function number(value){
  //console.log(value,' is number or not ? return = ',!isNaN(value));
  if(value){
    return !isNaN(value) ? []:['This number is invalid'];
  }else {
    return [];
  }
}
