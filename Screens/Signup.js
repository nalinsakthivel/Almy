import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colours, emailRegex} from '../Constants';
import Button from '../Components/Button';
const screenWidth = Dimensions.get('window').width;

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pswd, setPswd] = useState('');
  const [showpswd, setShowpswd] = useState(false);
  const [errors, setErrors] = useState({name: [], email: [], pswd: []});
  const navigation = useNavigation('');

  const onRegister = async () => {
    const validation = {};
    setErrors({name: [], email: [], pswd: []});
    if (name.length < 1) {
      validation['name'] = ['Enter valid name'];
    }
    if (email.length < 1) {
      validation['email'] = ['Enter valid Email'];
    }
    if (pswd.length < 1) {
      validation['pswd'] = ['Enter valid Password'];
    }

    if (!email.match(emailRegex)) {
      validation['email'] = [...validation['email'], 'Enter correct email'];
    }

    if (Object.keys(validation).length > 0) {
      setErrors(err => {
        return {...err, ...validation};
      });
    } else {
      console.log(`email`, email);
      console.log(`pswd`, pswd);
      await AsyncStorage.setItem(
        'credentials',
        JSON.stringify({
          emailadd: email,

          paswd: pswd,
        }),
      );
      ToastAndroid.show(
        'Sigup sucessful',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      navigation.push('Signin');
    }
  };
  const onShowpswd = () => {
    [setShowpswd(showpswd => !showpswd)];
  };
  return (
    <View style={styles.viewContainer} onPress={() => console.log('Pressed')}>
      <Text style={styles.signupText}>Sign Up</Text>
      <View style={styles.iconTextinput}>
        <Icon
          name="user-circle"
          size={30}
          color={colours.violet}
          style={{paddingLeft: 10}}
        />
        <TextInput
          style={styles.nameinputContainer}
          onChangeText={setName}
          value={name}
          autoFocus
          autoCapitalize="sentences"
          autoCorrect
          placeholder="Name"
          placeholderTextColor={colours.gray}
        />
      </View>
      <View style={styles.errorContainer}>
        {errors['name'].map(error => {
          return (
            <Text numberOfLines={1} style={styles.error} key={error}>
              {error}
            </Text>
          );
        })}
      </View>
      <View style={styles.iconTextinput}>
        <Icon
          name="envelope-square"
          size={30}
          color={colours.violet}
          style={{paddingLeft: 13}}
        />
        <TextInput
          style={styles.emailinputContainer}
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          autoCorrect
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor={colours.gray}
        />
      </View>
      <View style={styles.errorContainer}>
        {errors['email'].map(error => {
          return (
            <Text numberOfLines={1} style={styles.error} key={error}>
              {error}
            </Text>
          );
        })}
      </View>
      <View style={styles.iconTextinput}>
        <Icon
          name="lock"
          size={30}
          color={colours.violet}
          style={{paddingLeft: 15}}
        />
        <TextInput
          style={styles.pswdinputContainer}
          onChangeText={setPswd}
          value={pswd}
          secureTextEntry={showpswd}
          autoCapitalize="none"
          autoCorrect
          placeholder="Password"
          placeholderTextColor={colours.black}
        />
        <Icon
          name={showpswd ? 'eye' : 'eye-slash'}
          size={30}
          color={colours.violet}
          style={{paddingRight: 15}}
          onPress={onShowpswd}
        />
      </View>
      <View style={styles.errorContainer}>
        {errors['pswd'].map(error => {
          return (
            <Text numberOfLines={1} style={styles.error} key={error}>
              {error}
            </Text>
          );
        })}
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          style={styles.checkBox}
          tintColors={{true: colours.violet, false: 'black'}}
        />
        <Text style={styles.ctextContainer}>
          I have agree in Terms and Conditons
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button name="Create Account" onPress={onRegister} />
      </View>
      <View style={styles.textcontainer}>
        <Text style={styles.alreadyText}>Already have an Account </Text>
        <TouchableOpacity
          style={styles.sText}
          onPress={() => navigation.push('Signin')}>
          <Text>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;

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
    marginBottom: 40,
  },
  iconTextinput: {
    width: screenWidth * 0.87,
    marginTop: 10,
    marginBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 10,
    borderRadius: 30,
    backgroundColor: colours.white,
  },
  nameinputContainer: {
    height: 40,

    paddingLeft: 10,

    // borderColor: colours.gray,
    width: screenWidth * 0.87,
  },
  emailinputContainer: {
    height: 40,

    paddingLeft: 13,

    // borderColor: colours.gray,
    width: screenWidth * 0.87,
  },
  pswdinputContainer: {
    width: '80%',
    height: 40,

    paddingLeft: 15,

    // borderColor: colours.gray,
  },
  errorContainer: {
    width: screenWidth * 0.87,

    height: 20,
    margin: 0,

    paddingLeft: 20,
  },
  error: {color: colours.red, fontSize: 10},
  checkboxContainer: {
    flexDirection: 'row',
  },
  CheckBox: {
    borderColor: colours.lightgray,
  },
  ctextContainer: {
    marginTop: 5,
    color: colours.lightgray,
  },
  buttonContainer: {
    marginTop: 20,
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
