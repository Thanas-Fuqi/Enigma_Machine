import { StyleSheet } from 'react-native';

const palette = {
  primary: 'black',
  secondery: 'white',
};

const fonts = {
  f_size: 19,
  f_weight: 'bold',
};

const konst = {
  dir: 'row',
  aligny: 'center',
};

const common_styles = StyleSheet.create({
  button_text: {
    fontSize: fonts.f_size,
    fontWeight: fonts.f_weight,
  },
  button_field: {
    marginTop: 20,
    borderWidth: 1, 
    borderRadius: 30, 
    alignItems: konst.aligny,
    backgroundColor: palette.primary,
  },
  fields: {
    fontSize: 17,
    paddingLeft: 3,
    paddingRight: 3,
    fontWeight: fonts.f_weight,
  },
  big_text: {
    width: 330, 
    height: 135,
    fontSize: 40, 
    paddingTop: 8,
    borderWidth: 3, 
    paddingLeft: 6,
    borderRadius: 20,
    fontWeight: fonts.f_weight, 
  },
  container: { 
    width: 390, 
    height: 844,
    borderWidth: 1,
    alignSelf: konst.aligny,
    alignItems: konst.aligny,
    backgroundColor: '#DCDCDC',
    justifyContent: konst.aligny,
    borderColor: palette.primary,
  },
});

export { common_styles, palette, konst };
