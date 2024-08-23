import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, Appearance } from 'react-native';

//Defining the used conponents
import ShowTime from "./components/ShowTime";
import { Setting } from "./components/Settings";

//The stack navigator
const Enigma = createStackNavigator();

//Main function rendering the nav screens
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={Appearance.getColorScheme() === 'light' ? 'white' : 'black'}
        barStyle={Appearance.getColorScheme() === 'light' ? 'dark-content' : 'light-content'}
      />
      <Enigma.Navigator screenOptions={{headerShown: false}}>
        <Enigma.Screen name="ShowTime" component={ShowTime} />
        <Enigma.Screen name="Setting" component={Setting} />
      </Enigma.Navigator>
    </NavigationContainer>
  );
}

/* Availble screens
        <Enigma.Screen name="ShowTime" component={ShowTime} />
        <Enigma.Screen name="Setting" component={Setting} />
*/
