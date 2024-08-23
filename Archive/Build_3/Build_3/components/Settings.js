import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { common_styles, palette } from './Styles';

//Variables and constants needed for the runTime
const defaultPlugboard = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
const alphabet = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
const rotorNames = ['I', 'II', 'III', 'IV', 'V'];
let allNotches = ['Q', 'E', 'V', 'J', 'Z'];
const reflectorNames = ['UKW_B', 'UKW_C'];
let letterPerRow = 4;

//Configurations
let configuration = {
  reflector: 'UKW_B',
  notches: ['Q', 'E', 'V'],
  rotors: ['I', 'II', 'III'],
  ring_positions: ['A', 'A', 'A'],
  rotor_positions: ['A', 'A', 'A'],
  plug_board: [...defaultPlugboard],
};

//Main screen rendering function
function Setting({ navigation }) {
  return (
    <View style={common_styles.container}>
      {/*The begining text*/}
      <Text style={styles.big_text}>Enigma Machine{'\n'}        Settings</Text>

      {/*Reflector RNPickerSelectr*/}
      <View style={{...styles.big_view, marginTop: 45}}>
        <Text style={common_styles.button_text}>Choose Reflector :</Text>
        <View style={{...styles.pickers, width: 112}}> 
          <RNPickerSelect  
            //placeholder and deafult value
            placeholder={{}} 
            value={configuration.reflector}
            //Displaying the Items of this menu
            items={reflectorNames.map((reflectorName) => ({
              label: reflectorName, value: reflectorName,
            }))}
            //Changes handler
            onValueChange={(value) => {
              configuration.reflector = value;
              navigation.replace("Setting");
            }} 
            //Styling
            style={{ inputAndroid: {...styles.input_Android, width: 135} }}
          /> 
        </View>
      </View>

      {/*Rotor RNPickerSelectr*/}
      <View style={styles.big_view}>
        <Text style={common_styles.button_text}>Choose Rotors :</Text>
        <View style={{flexDirection: 'row'}}>
          {/*Iterates through each rotor*/}
          {configuration.rotors.map((rotor, index) => (
            <View style={styles.pickers} key={index}> 
              <RNPickerSelect  
                //placeholder and deafult value
                value={rotor}
                placeholder={{}} 
                //Displaying the Items of this menu
                items={rotorNames.map((rotorName) => ({
                  label: rotorName, value: rotorName,
                }))}
                //Changes handler
                onValueChange={(value) => {
                  configuration.rotors[index] = value;
                  //Change the notch based on the selected rotor
                  configuration.notches[index] = allNotches[rotorNames.indexOf(value)];
                  navigation.replace("Setting");
                }}
                //Styling
                style={{ inputAndroid: styles.input_Android }}
              />
            </View>
          ))}
        </View>
      </View>

      {/*Ring Positions RNPickerSelectr*/}
      <View style={{...styles.big_view, left: 1}}>
        <Text style={{...common_styles.button_text, ...styles.lefting}}>Choose Rings :</Text>
        <View style={{flexDirection: 'row'}}>
          {/*Iterates through each Ring position*/}
          {configuration.ring_positions.map((ringPosition, index) => (
            <View style={styles.pickers} key={index}> 
              <RNPickerSelect  
                //placeholder and deafult value
                placeholder={{}} 
                value={ringPosition}
                //Displaying the Items of this menu
                items={alphabet.map((letter) => ({
                  label: letter, value: letter,
                }))}
                //Changes handler
                onValueChange={(value) => {
                  configuration.ring_positions[index] = value;
                  navigation.replace("Setting");
                }} 
                //Styling
                style={{ inputAndroid: styles.input_Android }}
              /> 
            </View>
          ))}
        </View>
      </View>

      {/*Rotor Positions RNPickerSelectr*/}
      <View style={{...styles.big_view, right: 2}}>
        <Text style={common_styles.button_text}>Choose Starter :</Text>
        <View style={{flexDirection: 'row'}}>
          {/*Iterates through each Rotor position*/}
          {configuration.rotor_positions.map((rotor_position, index) => (
            <View style={styles.pickers} key={index}> 
              <RNPickerSelect  
                //placeholder and deafult value
                placeholder={{}} 
                value={rotor_position}
                //Displaying the Items of this menu
                items={alphabet.map((letter) => ({
                  label: letter, value: letter,
                }))}
                //Changes handler
                onValueChange={(value) => {
                  configuration.rotor_positions[index] = value;
                  navigation.replace("Setting");
                }} 
                //Styling
                style={{ inputAndroid: styles.input_Android }}
              /> 
            </View>
          ))}
        </View>
      </View>

      {/*Plug_board mappings*/}
      <View>
        {/*Iterates through each set of letters in alphabet and groups them into rows*/}
        {Array.from({ length: Math.ceil(alphabet.length /letterPerRow) }).map((_, rowIndex) => (
          <View style={{flexDirection: 'row', marginTop: 10, marginRight: 17}} key={rowIndex}>
            {/*Render each letter pair in the current row*/}
            {alphabet.slice(rowIndex *letterPerRow, rowIndex *letterPerRow +letterPerRow).map((letter) => (
              //Creating each view for letter-input pair
              <View style={{marginLeft: 10}} key={letter}>
                <Text style={{...common_styles.button_text, left: 32}}>{letter}</Text>
                {/*Set adaptive background*/}
                <View style={{...styles.pickers, backgroundColor: 
                  configuration.plug_board[alphabet.indexOf(letter)] !== letter
                  ? palette.primary : palette.secondery,}}
                > 
                  <RNPickerSelect
                    //placeholder and deafult value
                    placeholder={{}} 
                    value={configuration.plug_board[alphabet.indexOf(letter)]}
                    //Displaying the Items of this menu
                    items={alphabet.map((letter) => ({
                        label: letter,
                        value: letter,
                    }))}
                    //Changes handler
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
                    }} 
                    //Styling
                    style={{
                      inputAndroid: {right: 12, width: 95, bottom: 12,
                        //Adaptive colors
                        color: configuration.plug_board[alphabet.indexOf(letter)] !== letter 
                          ? palette.secondery : palette.primary,
                      },
                    }}
                  />
                </View>
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
      <View style={{bottom: 15}}>
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
    marginLeft: 5,
  },
  big_view: {
    marginTop: 10,
    flexDirection: 'row', 
  },
  input_Android: {
    right: 12,
    width: 95,
    bottom: 13,
  },
  pickers: {
    width: 70,  
    height: 30, 
    marginLeft: 5,
    borderWidth: 1, 
    backgroundColor: palette.secondery,
  },
  reset_buttom: {
    left: 83, 
    bottom: 28, 
    borderWidth: 1, 
    borderRadius: 20,
  },
  big_text: {
    top: 23,
    width: 165, 
    height: 67,
    fontSize: 20, 
    paddingTop: 8,
    borderWidth: 3, 
    paddingLeft: 7,
    borderRadius: 20,
    fontWeight: 'bold', 
  },
});

//Exporting the Utilitis for other files usages
export { alphabet, configuration, Setting };
