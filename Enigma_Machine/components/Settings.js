import { View, Text, Picker, TouchableOpacity, StyleSheet } from 'react-native';
import { common_styles, palette, konst } from './Styles';

//Rotors
const I = Array.from('EKMFLGDQVZNTOWYHXUSPAIBRCJ');
const II = Array.from('AJDKSIRUXBLHWTMCQGZNPYFVOE');
const III = Array.from('BDFHJLCPRTXVZNYEIWGAKMUSQO');
const IV = Array.from('ESOVPZJAYQUIRHXLNFTGKDCMWB');
const V = Array.from('VZBRGITYUPSDNHLXAWMJQOFECK');
const rotorNames = ['I', 'II', 'III', 'IV', 'V'];
const rotorVariable = [I, II, III, IV, V];

//Reflectors
const reflectorNames = ['UKW_B', 'UKW_C']
const UKW_B = Array.from('YRUHQSLDPXNGOKMIEBFZCWVJAT');
const UKW_C = Array.from('FVPJIAOYEDRZXWGCTKUQSBNMHL');

//Alphabet and deafultPlugboard and Notches
const defaultPlugboard = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
const alphabet = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
let allNotches = [16, 4, 21, 9, 25];
let letterPerRow = 6;

//Configurations
let configuration = {
  rotors: [I, II, III],
  notches: [16, 4, 21],
  reflector: [...UKW_B],
  ring_positions: [0, 0, 0],
  rotor_positions: [0, 0, 0],
  plug_board: [...defaultPlugboard],
};

//Main screen rendering function
function Setting({ navigation }) {
  return (
    <View style={common_styles.container}>
      {/*The begining text*/}
      <Text style={common_styles.big_text}>Enigma Machine{'\n'}        Settings</Text>

      {/*Reflector Picker*/}
      <View style={{...styles.big_view, marginTop: 30}}>
        <Text style={{...common_styles.button_text, marginLeft: 38}}>Choose Reflector :</Text>
        <View style={{flexDirection: konst.dir}}>
          {/*Makes a picker for reflector and giving the value change to the handler*/}
          <Picker style={{...styles.lefting, width: 148}} selectedValue={configuration.reflector} onValueChange={(value) => {
            configuration.reflector = value.split(',');
            navigation.replace("Setting");
          }}>
            //Iterates through each picker and populates the choices from reflectors array
            {reflectorNames.map((reflectorName) => (
              //Setting the choice from name and changing value accordingly
              <Picker.Item label={reflectorName} value={eval(reflectorName)} />
            ))}
          </Picker>
        </View>
      </View>

      {/*Rotor Picker*/}
      <View style={styles.big_view}>
        <Text style={{...common_styles.button_text, marginLeft: 60}}>Choose Rotors :</Text>
        <View style={{flexDirection: konst.dir}}>
          {/*Iterates through each rotor*/}
          {configuration.rotors.map((rotor, index) => (
            //Makes a picker list for each rotor and giving the value change to the handler
            <Picker style={styles.lefting} selectedValue={rotor} onValueChange={(value) => {
              configuration.rotors[index] = value.split(',');

              //Using the arrays index to find the Notch replacement var
              configuration.notches[index] = allNotches[
                rotorVariable.findIndex(rotor => 
                  //Findind the index using the value and rotor
                  rotor.toString() === value
                )
              ];

              navigation.replace("Setting");
            }}>
              //Iterates through each picker and populates the choices from rotors array
              {rotorNames.map((rotorName) => (
                //Setting the choice from name and changing value accordingly
                <Picker.Item label={rotorName} value={eval(rotorName)} />
              ))}
            </Picker>
          ))}
        </View>
      </View>

      {/*Ring Positions Picker*/}
      <View style={styles.big_view}>
        <Text style={{...common_styles.button_text, ...styles.lefting}}>Chose Ring positions :</Text>
        <View style={{flexDirection: konst.dir}}>
          {/*Iterates through each Ring position*/}
          {configuration.ring_positions.map((ringPosition, index) => (
            //Makes a picker list for each rotor and giving the value change to the handler
            <Picker style={styles.lefting} selectedValue={ringPosition} onValueChange={(value) => {
              configuration.ring_positions[index] = parseInt(value);
              navigation.replace("Setting");
            }}>
              //Iterates through each picker and populates the choices from alphabet array
              {alphabet.map((letter) => (
                //Setting the choice from Position and changing value accordingly
                <Picker.Item label={letter} value={alphabet.indexOf(letter)} />
              ))}
            </Picker>
          ))}
        </View>
      </View>

      {/*Rotor Positions Picker*/}
      <View style={styles.big_view}>
        <Text style={common_styles.button_text}>Chose Rotor positions :</Text>
        <View style={{flexDirection: konst.dir}}>
          {/*Iterates through each Rotor position*/}
          {configuration.rotor_positions.map((rotor_position, index) => (
            //Makes a picker list for each rotor and giving the value change to the handler
            <Picker style={styles.lefting} selectedValue={rotor_position} onValueChange={(value) => {
              configuration.rotor_positions[index] = parseInt(value);
              navigation.replace("Setting");
            }}>
              //Iterates through each picker and populates the choices from alphabet array
              {alphabet.map((letter) => (
                //Setting the choice from Position and changing value accordingly
                <Picker.Item label={letter} value={alphabet.indexOf(letter)} />
              ))}
            </Picker>
          ))}
        </View>
      </View>

      {/*Plug_board mappings*/}
      <View style={{marginTop: 28}}>
        {/*Iterates through each set of letters in alphabet and groups them into rows*/}
        {Array.from({length: Math.ceil(alphabet.length /letterPerRow)}).map((_, rowIndex) => (
          <View style={{flexDirection: konst.dir, marginBottom: 10}}>
            {/*Render each letter pair in the current row*/}
            {alphabet.slice(rowIndex *letterPerRow, rowIndex *letterPerRow +letterPerRow).map((letter) => (
              //Creating each view for letter-input pair
              <View style={{marginRight: 10}}>
                {/*Display the current alphabet letter*/}
                <Text style={{...common_styles.button_text, paddingLeft: 12}}>{letter}</Text>
                {/*picker for plugboard mapping*/}
                <Picker style={[{...common_styles.button_text, width: 45},
                  //Check if the plugboard letter is different from the letter (if yes change it)
                  configuration.plug_board[alphabet.indexOf(letter)] != letter? 
                  {backgroundColor: palette.primary, color: palette.secondery} : null
                ]} 

                //Change the plugboard according to user
                onValueChange={(value) => {
                  //Check if the plug_board contains more than 1 instance of the value
                  for (let i=0; i<configuration.plug_board.length; i++) {
                    //If the current element is mapped to the selected value, revert it
                    if (configuration.plug_board[i] === value) {
                      configuration.plug_board[i] = alphabet[i];
                    }
                  } //Switch the plug_boards letter to the value
                  configuration.plug_board[alphabet.indexOf(letter)] = value;

                  //Check if the plug_board contains more than 1 instance of the letter
                  for (let j=0; j<configuration.plug_board.length; j++) {
                    //If the current element is mapped to the selected letter, revert it
                    if (configuration.plug_board[j] === letter) {
                      configuration.plug_board[j] = alphabet[j];
                    }
                  } //Switch the plug_boards value to the letter
                  configuration.plug_board[alphabet.indexOf(value)] = letter;

                  navigation.replace("Setting");
                }} selectedValue={configuration.plug_board[alphabet.indexOf(letter)]} >

                  //Iterates through each picker and populates the choices from alphabet array
                  {alphabet.map((letter) => (
                    //Setting the choice from Position and changing value accordingly
                    <Picker.Item label={letter} value={letter} />
                  ))}
                </Picker>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/*The reset button for the plug_board*/}
      <View>
        <TouchableOpacity style={styles.reset_buttom} onPress={() => {
          configuration.plug_board = [...defaultPlugboard];
          navigation.replace('Setting');
        }}>
          <Text style={{...common_styles.button_text, paddingLeft: 5, width: 148}}>Reset the plugs</Text>
        </TouchableOpacity>
      </View>

      {/*Going back to the main screen button*/}
      <View>
        <TouchableOpacity style={{...common_styles.button_field, width: 150}} onPress={() => navigation.navigate('ShowTime')}>
          <Text style={{...common_styles.button_text, color: palette.secondery}}>{String.raw`>> Go Back <<`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

//Styles of this screen
const styles = StyleSheet.create({
  lefting: {
    marginLeft: 5
  },
  big_view: {
    marginTop: 10,
    flexDirection: konst.dir, 
  },
  reset_buttom: {
    left: 62, 
    bottom: 38, 
    borderWidth: 1, 
    borderRadius: 20,
  },
});

//Exporting the Utilitis for other files usages
export { alphabet, configuration, Setting };
