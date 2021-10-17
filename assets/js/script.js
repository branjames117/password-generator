// get reference to the #generate button element
var generateBtn = document.querySelector('#generate')

// generate a password based on user inputs
function generatePassword() {
  // get user inputs from DOM
  var passwordLength = document.getElementById('password-length').value
  var includeLowercase = document.getElementById('include-lowercase').checked
  var includeUppercase = document.getElementById('include-uppercase').checked
  var includeNumeric = document.getElementById('include-numeric').checked
  var includeSpecial = document.getElementById('include-special').checked

  // begin validation, set to valid by default
  var invalidLength = false
  var invalidCharacters = false

  // check if password length is valid
  if (passwordLength < 8 || passwordLength > 128) {
    invalidLength = true
  }

  // check if at least one character type is selected
  if (
    !includeLowercase &&
    !includeUppercase &&
    !includeNumeric &&
    !includeSpecial
  ) {
    invalidCharacters = true
  }

  // return unique error message based on whether both or just one validation check failed, and add error class to text-box if any inputs are invalid
  var passwordText = document.querySelector('#password')
  if (invalidLength && invalidCharacters) {
    passwordText.classList.add('invalid-password')
    return 'Invalid inputs: must enter a length between 8 and 128 and choose at least one character type.'
  } else if (invalidLength) {
    passwordText.classList.add('invalid-password')
    return 'Invalid input: must enter a length between 8 and 128.'
  } else if (invalidCharacters) {
    passwordText.classList.add('invalid-password')
    return 'Invalid input: must choose at least one character type.'
  } else {
    // remove error class from text-box if all inputs are valid
    passwordText.classList.remove('invalid-password')
  }

  // create the character pools
  var lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz'.split('')
  var uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  var numericCharacters = '0123456789'.split('')
  var specialCharacters = ' !"#$%&()*+,-./:;<=>?@[]^_`{|}~'
    .split('')
    .concat("'")

  // add the chosen character pools to the master pool of characters to randomize
  var chosenCharacters = []
  if (includeLowercase) {
    chosenCharacters = chosenCharacters.concat(lowercaseCharacters)
  }
  if (includeUppercase) {
    chosenCharacters = chosenCharacters.concat(uppercaseCharacters)
  }
  if (includeNumeric) {
    chosenCharacters = chosenCharacters.concat(numericCharacters)
  }
  if (includeSpecial) {
    chosenCharacters = chosenCharacters.concat(specialCharacters)
  }

  // initialize password variable
  var password = ''

  for (var i = 0; i < passwordLength; i++) {
    password +=
      chosenCharacters[Math.floor(Math.random() * chosenCharacters.length)]
  }

  return password
}

// write password to the #password input
function writePassword() {
  var password = generatePassword()
  var passwordText = document.querySelector('#password')

  passwordText.value = password
}

// add event listener to generate button
generateBtn.addEventListener('click', writePassword)
