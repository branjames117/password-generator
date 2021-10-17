// Get references to the #generate button element
var generateBtn = document.querySelector('#generate')

// Prompt for user criteria then generate and return password based on input
function generatePassword() {
  // get user inputs from DOM
  var passwordLength = document.getElementById('password-length').value
  var includeLowercase = document.getElementById('include-lowercase').checked
  var includeUppercase = document.getElementById('include-uppercase').checked
  var includeNumeric = document.getElementById('include-numeric').checked
  var includeSpecial = document.getElementById('include-special').checked

  // validation
  var invalidLength = false
  var invalidCharacters = false

  // input validation: if invalid password length
  if (passwordLength < 8 || passwordLength > 128) {
    invalidLength = true
  }

  // input validation: if no character types selected
  if (
    !includeLowercase &&
    !includeUppercase &&
    !includeNumeric &&
    !includeSpecial
  ) {
    invalidCharacters = true
  }

  if (invalidLength && invalidCharacters) {
    return 'Invalid inputs: must enter a length between 8 and 128 and choose at least one character type.'
  } else if (invalidLength) {
    return 'Invalid input: must enter a length between 8 and 128.'
  } else if (invalidCharacters) {
    return 'Invalid input: must choose at least one character type.'
  }

  // create the character pools
  var lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz'.split('')
  var uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  var numericCharacters = '0123456789'.split('')
  var specialCharacters = ' !"#$%&()*+,-./:;<=>?@[]^_`{|}~'
    .split('')
    .concat("'")

  // add the chosen character pools to a master pool
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

// Write password to the #password input
function writePassword() {
  var password = generatePassword()
  var passwordText = document.querySelector('#password')

  passwordText.value = password
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword)
