//Importing important Configuartions from Constants.js
import { alphabet, configuration } from './Settings';

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
  //Reseting the rotor_positions and encryptedWords declaration
  let rotor_positions = [...configuration.rotor_positions];
  let ring_positions = [...configuration.ring_positions];
  let notches = [...configuration.notches];
  let encryptedWords = [];

  //Setting up the rotors
  let rotors = configuration.rotors.map(rotor => 
    rotor.map(letter => alphabet.indexOf(letter))
  );

  //Setting up the reflector
  let reflector = configuration.reflector.map(
    letter => alphabet.indexOf(letter)
  );

  //Setting up the plug_board
  let plug_board = configuration.plug_board.map(
    letter => alphabet.indexOf(letter)
  );

  //It runes for each word of the sentence given
  for (let i=0; i<input.length; i++) {
    //Skipping if the char is not a letter
    if (!alphabet.includes(input[i])) {
      encryptedWords.push(input[i]);
      continue;
    }

    //Setting the index of the letter of input
    let letterIndex = alphabet.indexOf(input[i]);

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
    let newIndex = plug_board[letterIndex];
    for (let x=2; x>=0; x--) {
      newIndex = through_Rotor_normal(x, newIndex, rotor_positions, ring_positions, rotors);
    }
    newIndex = reflector[newIndex];
    for (let y=0; y<3; y++) {
      newIndex = through_Rotor_reverse(y, newIndex, rotor_positions, ring_positions, rotors);
    }
    newIndex = plug_board[newIndex];
    encryptedWords.push(alphabet[newIndex]);
  }

  //The encrypted sentence is returned
  return encryptedWords.join("");
}
