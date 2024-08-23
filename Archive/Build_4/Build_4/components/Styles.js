import { StyleSheet } from 'react-native';

const palette = {
  primary: 'black',
  secondery: 'white',
};

const common_styles = StyleSheet.create({
  button_text: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  button_field: {
    marginTop: 20,
    borderWidth: 1, 
    borderRadius: 30, 
    alignItems: 'center',
    backgroundColor: palette.primary,
  },
  fields: {
    fontSize: 17,
    paddingLeft: 3,
    paddingRight: 3,
    fontWeight: 'bold',
  },
  big_text: {
    width: 330, 
    height: 135,
    fontSize: 40, 
    paddingTop: 8,
    borderWidth: 3, 
    paddingLeft: 6,
    borderRadius: 20,
    fontWeight: 'bold', 
  },
  container: { 
    width: 390, 
    height: 844,
    borderWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DCDCDC',
    borderColor: palette.primary,
  },
});

export { common_styles, palette };
