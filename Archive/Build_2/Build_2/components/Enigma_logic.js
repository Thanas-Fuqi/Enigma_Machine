//Importing important Configuartions from Constants.js
import { alphabet, configuration } from './Settings';

const reflectorArrays = {
  UKW_B: Array.from('YRUHQSLDPXNGOKMIEBFZCWVJAT'),
  UKW_C: Array.from('FVPJIAOYEDRZXWGCTKUQSBNMHL'),
};

const rotorArrays = {
  I: Array.from('EKMFLGDQVZNTOWYHXUSPAIBRCJ'),
  II: Array.from('AJDKSIRUXBLHWTMCQGZNPYFVOE'),
  III: Array.from('BDFHJLCPRTXVZNYEIWGAKMUSQO'),
  IV: Array.from('ESOVPZJAYQUIRHXLNFTGKDCMWB'),
  V: Array.from('VZBRGITYUPSDNHLXAWMJQOFECK'),
};

//Through the first three rotors order
function through_Rotor_normal(index, prevIndex, rotor_positions, ring_positions, rotors) {
  let index_input = rotor_positions[index] - ring_positions[index]
  let index_output = -rotor_positions[index] + ring_positions[index]
  return (rotors[index][(prevIndex+index_input +26) %26] +index_output +26) %26
}

//Through the last three rotors order
function through_Rotor_reverse(index, prevIndex, rotor_positions, ring_positions, rotors) {
  let index_input = rotor_positions[index] - ring_positions[index]
  let index_output = -rotor_positions[index] + ring_positions[index]
  return (rotors[index].indexOf((prevIndex+index_input +26) %26) +index_output +26) %26
}

//Main Runtime
export default function Encrypt(input){
  //Setting up the conponents using indencies
  let plug_board = configuration.plug_board.map(
    letter => alphabet.indexOf(letter)
  );
  let reflector = reflectorArrays[configuration.reflector].map(
    letter => alphabet.indexOf(letter)
  );
  let ring_positions = configuration.ring_positions.map(
    letter => alphabet.indexOf(letter)
  );
  let rotor_positions = configuration.rotor_positions.map(
    letter => alphabet.indexOf(letter)
  );
  let notches = configuration.notches.map(
    letter => alphabet.indexOf(letter)
  );
  let rotors = configuration.rotors.map(rotorName => 
    rotorArrays[rotorName].map(letter => alphabet.indexOf(letter))
  );

  let encryptedWords = [];
  //It runes for each word of the sentence given
  for (let i=0; i<input.length; i++) {
    //Skipping if the char is not a letter
    if (!alphabet.includes(input[i])) {
      encryptedWords.push(input[i]);
      continue;
    }

    //Stteping the rotor_positions from notches
    if (rotor_positions[1] === notches[1]) {
      rotor_positions[0] = (rotor_positions[0] +1) %26;
      if (rotor_positions[2] !== notches[2]) {
        rotor_positions[1] = (rotor_positions[1] +1) %26;
      }
    }
    if (rotor_positions[2] === notches[2]) {
      rotor_positions[1] = (rotor_positions[1] +1) %26;
    }
    rotor_positions[2] = (rotor_positions[2] +1) %26;

    //Encryption process
    let newIndex = alphabet.indexOf(input[i]);
    newIndex = plug_board[newIndex];
    for (let x=2; x>=0; x--) {
      newIndex = through_Rotor_normal(x, newIndex, rotor_positions, ring_positions, rotors);
    }
    newIndex = reflector[newIndex];
    for (let y=0; y<3; y++) {
      newIndex = through_Rotor_reverse(y, newIndex, rotor_positions, ring_positions, rotors);
    }
    let letter = alphabet[plug_board[newIndex]];
    encryptedWords.push(letter);
  }

  return encryptedWords.join("");
}
