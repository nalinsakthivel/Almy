import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colours, emailRegex} from '../Constants';
import Button from '../Components/Button';
const screenWidth = Dimensions.get('window').width;

const ForgetPassword = () => {
  const navigation = useNavigation();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const onReset = () => {
    const validation = [];
    setErrors([]);
    if (email.length < 1) {
      validation.push('Enter valid email');
    }
    if (!email.match(emailRegex)) {
      validation.push('Enter correct email');
    }
    if (validation.length <= 0) {
      ToastAndroid.show(
        'Signin sucessful',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else {
      setErrors(validation);
    }
  };

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.signupText}>Forget password..?</Text>
      <View style={styles.iconTextinput}>
        <Icon
          name="envelope-square"
          size={40}
          color={colours.violet}
          style={{paddingLeft: 20}}
        />
        <TextInput
          style={styles.inputContainer}
          onChangeText={setEmail}
          value={email}
          autoFocus
          autoCapitalize="sentences"
          autoCorrect
          placeholder="Email"
          placeholderTextColor={colours.gray}
        />
      </View>
      <View style={styles.errorContainer}>
        {errors.map(error => {
          return (
            <Text numberOfLines={1} style={styles.error} key={error}>
              {error}
            </Text>
          );
        })}
      </View>
      <View style={styles.buttonContainer}>
        <Button name="Send Reset Link" onPress={onReset} />
      </View>
      <View style={styles.textcontainer}>
        <Text style={styles.alreadyText}>Back to </Text>
        <TouchableOpacity
          style={styles.sText}
          onPress={() => {
            navigation.push('Signin');
          }}>
          <Text>Signin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colours.black,
    marginBottom: 30,
  },
  iconTextinput: {
    width: screenWidth * 0.87,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 10,
    borderRadius: 30,
    backgroundColor: colours.white,
  },
  inputContainer: {
    height: 40,

    paddingLeft: 10,

    // borderColor: colours.gray,
    width: screenWidth * 0.87,
  },
  errorContainer: {
    width: screenWidth * 0.87,
    margin: 0,
    paddingLeft: 10,
  },
  error: {color: colours.red, fontSize: 10},
  buttonContainer: {
    marginTop: 10,
  },
  textcontainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  alreadyText: {
    color: colours.lightgray,
  },
  sText: {
    fontWeight: 'bold',
    color: colours.violet,
    textDecorationLine: 'underline',
  },
});
