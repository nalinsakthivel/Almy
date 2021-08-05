import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {colours} from '../Constants';
const screenWidth = Dimensions.get('window').width;
const Button = ({name, onPress, style}) => {
  return (
    <TouchableOpacity
      style={{...styles.touchContainer, ...style}}
      onPress={onPress}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  touchContainer: {
    width: screenWidth * 0.87,
    height: 40,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colours.violet,
    borderRadius: 30,
  },
  text: {
    fontWeight: 'bold',
    color: colours.white,
  },
});
