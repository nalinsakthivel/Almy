import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colours, emailRegex } from '../Constants';
import Button from '../Components/Button';
import auth from '@react-native-firebase/auth';
const screenWidth = Dimensions.get('window').width;

const Signup = () => {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pswd, setPswd] = useState('');
  const [showpswd, setShowpswd] = useState(false);
  const [errors, setErrors] = useState({ name: [], email: [], pswd: [], general: [] });
  const navigation = useNavigation('');

  const onRegister = async () => {
    const validation = {};

    setErrors({ name: [], email: [], pswd: [], general: [] });
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
        return { ...err, ...validation };
      });
      setLoading(
        false
      )
    } else {
      setLoading(true)
      console.log(`email`, email);
      console.log(`pswd`, pswd);
      auth()

        .createUserWithEmailAndPassword(email, pswd)

        .then((result) => {
          console.log(`result`, result)
          setLoading(false)
          ToastAndroid.show(
            'Sigup sucessful',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM); navigation.push('Signin');
          // console.log('User account created & signed in!');
        })
        .catch(error => {
          console.log(`error`, error)
          setLoading(true)
          // console.log(1, error.code)
          // console.log(2, error.code.toString())
          if (error.code === 'auth/email-already-in-use') {
            validation['general'] = ['That email address is already in use'];

          }
          if (error.code === 'auth/weak-password') {
            validation['general'] = ["Password is two small \n Must 6 or 8 Charactersn"];

          }
          setLoading(false)
          setErrors(err => {
            return { ...err, ...validation };
          });


        });




    }
  };
  const onShowpswd = () => {
    [setShowpswd(showpswd => !showpswd)];
  };
  return (

    <View style={styles.viewContainer} onPress={() => console.log('Pressed')}>
      <StatusBar backgroundColor={colours.back} barStyle='dark-content' />
      <Text style={styles.signupText}>Sign Up</Text>
      <View style={styles.iconTextinput}>
        <Icon
          name="user-circle"
          size={30}
          color={colours.violet}
          style={{ paddingLeft: 10 }}
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
          style={{ paddingLeft: 13 }}
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
          style={{ paddingLeft: 15 }}
        />
        <TextInput
          style={styles.pswdinputContainer}
          onChangeText={setPswd}
          value={pswd}
          secureTextEntry={showpswd}
          autoCapitalize="none"
          autoCorrect
          placeholder="Password"
          placeholderTextColor={colours.gray}
        />
        <Icon
          name={showpswd ? 'eye' : 'eye-slash'}
          size={30}
          color={colours.violet}
          style={{ paddingRight: 20 }}
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
          tintColors={{ true: colours.violet, false: 'black' }}
        />
        <Text style={styles.ctextContainer}>
          I have agree in Terms and Conditons
        </Text>
      </View>
      <View style={styles.generalerror}>
        {console.log(`error`, errors.general)}
        {errors.general.map(error => {
          return (
            <Text numberOfLines={2} style={styles.error} key={error}>
              {error}
            </Text>
          );
        })}
      </View>
      <View style={styles.buttonContainer}>
        <Button name="Create Account" onPress={onRegister} value={loading} />
      </View>
      <View style={styles.textcontainer}>
        <Text style={styles.alreadyText}>Already have an Account </Text>
        <TouchableOpacity
          style={styles.sText}
          onPress={() => navigation.push('Signin')}>
          <Text style={styles.signText}>Sign In</Text>
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
    fontFamily: 'Nunito-Bold',
    fontSize: 22,

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
    color: colours.pureblack,
    paddingLeft: 10,
    fontFamily: 'Nunito-Black',
    // borderColor: colours.gray,
    width: screenWidth * 0.87,
  },
  emailinputContainer: {
    height: 40,
    color: colours.pureblack,
    paddingLeft: 13,
    fontFamily: 'Nunito-Black',
    // borderColor: colours.gray,
    width: screenWidth * 0.87,
  },
  pswdinputContainer: {
    width: '70%',
    height: 40,
    fontFamily: 'Nunito-Regular',
    paddingLeft: 15,
    color: colours.pureblack,
    // borderColor: colours.gray,
  },
  errorContainer: {
    width: screenWidth * 0.87,

    height: 20,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 20,
  },
  error: { color: colours.red, fontSize: 10 },
  checkboxContainer: {
    flexDirection: 'row',
  },
  CheckBox: {
    borderColor: colours.lightgray,
  },
  ctextContainer: {
    fontFamily: 'Nunito-Bold',
    marginTop: 5,
    color: colours.lightgray,
  },
  generalerror: {
    width: screenWidth * 0.87,
    height: 40,
    margin: 0,
    // transform: [{ translateX: -10 }],
    paddingLeft: 110,
    marginBottom: 0,
  },
  buttonContainer: {
    marginTop: 3e40,
  },
  textcontainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  alreadyText: {
    fontFamily: 'Nunito-Italic',
    color: colours.lightgray,
  },
  sText: {



  },
  signText: {
    fontFamily: 'Nunito-Bold',

    color: colours.violet,
    textDecorationLine: 'underline',
  }
});
