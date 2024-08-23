import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { common_styles, palette, konst } from './Styles';
import Encrypt from './Enigma_logic';
import { useState } from 'react';

//The exported function used for navigation
export default function ShowTime({ navigation }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  //The screen Render return
  return (
    <View style={common_styles.container}>
      {/*Begining Text*/}
      <Text style={common_styles.big_text}>Enigma Machine{'\n'}       Simulator</Text>

      {/*Input Text and Box*/}
      <View style={styles.margins}>
        <Text style={styles.show_text}>- Input -</Text>
        <TextInput style={styles.input_field} multiline={true}
          onChangeText={(text) => setInput(text)}
        />
      </View>

      {/*Submit Button*/}
      <View>
        <TouchableOpacity style={{...common_styles.button_field, width: 80}} onPress={() => 
          setOutput(Encrypt(input.toUpperCase()))
        }>
          <Text style={{...common_styles.button_text, color: palette.secondery}}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/*Output Text and Box*/}
      <View style={styles.margins}>
        <Text style={styles.show_text}>- Output -</Text>
        <View style={styles.views}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={common_styles.fields}>{output}</Text>
          </ScrollView>
        </View>
      </View>

      {/*Go to settings button*/}
      <View style={styles.margins}> 
        <TouchableOpacity style={{...common_styles.button_field, width: 200}} onPress={() => navigation.navigate("Setting")}>
          <Text style={{...common_styles.button_text, color: palette.secondery}}>{String.raw`>> Go To Settings <<`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

//Styles used in this screen
const styles = StyleSheet.create({
  margins: {
    marginTop: 30,
  },
  views: {
    width: 300,
    height: 180,
    borderWidth: 3,
  },
  show_text: {
    marginBottom: 10,
    alignSelf: konst.aligny,
    ...common_styles.button_text, 
  },
  input_field: {
    width: 300, 
    height: 180, 
    borderWidth: 3,
    overflow: 'hidden',
    backgroundColor: 'grey', 
    ...common_styles.fields,
    color: palette.secondery,
    borderColor: palette.primary,
  },
});
