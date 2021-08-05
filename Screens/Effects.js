import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Button from '../Components/Button';

const Effects = () => {
  const [number, setNumber] = useState(0);
  const [buttonVal, setButtonVal] = useState(true);

  useEffect(() => {
    setNumber(1);
  }, []);

  useEffect(() => {
    if (buttonVal) setNumber(num => num + 2);
  }, [buttonVal]);

  return (
    <View style={styles.container}>
      <Text>{number}</Text>
      <Button name="Test" onPress={() => setButtonVal(b => !b)} />
    </View>
  );
};

export default Effects;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
