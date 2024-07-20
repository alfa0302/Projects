const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '1234567890';
const symbols = '~!@#$%^&*_+={?}:<>,.';
const allChar = upperCase + lowerCase + numbers + symbols;
const passwordLength = 12;

function createPass(){
  let password ='';
  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  while(password.length < passwordLength){
    password += allChar[Math.floor(Math.random() * allChar.length)];
  }

  document.querySelector('.password').value = password;
}

function copyPass(){
  document.querySelector('.password').select();
  document.execCommand('copy');
}