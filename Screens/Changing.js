import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {add} from 'react-native-reanimated';
import Button from '../Components/Button';
import {colours} from '../Constants';

const Changing = () => {
  const [action, setAction] = useState('add');

  const [number, setNumber] = useState(10);
  const [press, setPress] = useState();
  const addnumber = num => {
    const diff = action === 'add' ? num + number : number - num;

    if (diff >= 0) {
      setNumber(diff);
    }
  };
  return (
    <View style={styles.viewContainer}>
      <Text style={styles.textContainer}>{number}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.mainbutContainer}>
          <Button
            name="Add"
            onPress={() => setAction('add')}
            style={{
              ...styles.buttons,
              backgroundColor: action == 'add' ? colours.violet : colours.red,
            }}
          />
          <Button
            name="sub"
            onPress={() => setAction('sub')}
            style={{
              ...styles.buttons,
              backgroundColor: action == 'sub' ? colours.violet : colours.red,
            }}
          />
        </View>
        <Button
          name="1"
          onPress={() => {
            addnumber(1);
          }}
        />
        <Button
          name="2"
          onPress={() => {
            addnumber(2);
          }}
        />
        <Button
          name="3"
          onPress={() => {
            addnumber(3);
          }}
        />
      </View>
    </View>
  );
};

export default Changing;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  textContainer: {
    color: colours.black,
    fontWeight: 'bold',
  },

  buttonContainer: {
    marginTop: 10,
    justifyContent: 'space-between',
  },
  mainbutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttons: {
    width: '30%',
  },
});
