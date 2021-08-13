import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colours, emailRegex } from '../Constants';
import Button from '../Components/Button';
import CheckBox from '@react-native-community/checkbox';
import auth from '@react-native-firebase/auth';
const screenWidth = Dimensions.get('window').width;
const Signin = () => {
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [pswd, setPswd] = useState('');
  const [errors, setErrors] = useState({ email: [], pswd: [], general: [] });
  const onPressed = async () => {
    const validation = {};
    setErrors({ email: [], pswd: [], general: [] });


    if (email.length < 1) {
      validation['email'] = ['Enter valid Email'];
    }
    // if (email != email) {
    //   validation['email'] = ['Enter correct Email'];
    // }
    if (pswd.length < 1) {
      validation['pswd'] = ['Enter valid Password'];
    }
    // if (pswd != pswd) {
    //   validation['pswd'] = ['Enter correct Password'];
    // }

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
      auth().signInWithEmailAndPassword(email, pswd)

        .then((result) => {
          setLoading(false)
          console.log(`result`, result)
          return navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: 'effects' }],
            }))
          // console.log('User account created & signed in!');
        })
        .catch(error => {
          setLoading(true)
          console.log(1, error.code)
          // console.log(2, error.code.toString())


          if (error.code === 'auth/wrong-password') {
            validation['general'] = ['Email and Password doesnt match']
          }
          setLoading(false)
          setErrors(err => {
            return { ...err, ...validation };
          });
          console.error(error);
        });


    }
  };

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.signupText}>Sign In</Text>
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
          autoCapitalize="none"
          autoCorrect
          placeholder="Password"
          placeholderTextColor={colours.gray}
        />
        <Icon name="eye" size={30} color={colours.violet} />
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
          tintColors={{ true: colours.violet, false: colours.black }}
        />
        <Text style={styles.ctextContainer}>Remember Me</Text>
        <TouchableOpacity
          style={styles.ftextContainer}
          onPress={() => navigation.push('ForgetPassword')}>
          <Text style={styles.fText}>Forget Password</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.generalerror}>
        {console.log(`error`, errors.general)}
        {errors.general.map(error => {
          return (
            <Text numberOfLines={1} style={styles.error} key={error}>
              {error}
            </Text>
          );
        })}
      </View>
      <View style={styles.buttonContainer}>
        <Button name="Log In" onPress={onPressed} value={loading} />
      </View>
      <View style={styles.textcontainer}>
        <Text style={styles.alreadyText}>Doesn't have an account </Text>
        <TouchableOpacity
          style={styles.sText}
          onPress={() => navigation.push('Signup')}>
          <Text style={styles.cText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signin;

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
  emailinputContainer: {
    height: 40,
    fontFamily: 'Nunito-Black',
    paddingLeft: 13,
    color: colours.pureblack,
    // borderColor: colours.gray,
    width: screenWidth * 0.87,
  },
  pswdinputContainer: {
    width: '50%',
    height: 40,
    fontFamily: 'Nunito-Regular',
    paddingLeft: 15,
    color: colours.pureblack,
    // borderColor: colours.gray,
    width: screenWidth * 0.87,
  },
  errorContainer: {
    width: screenWidth * 0.87,
    height: 20,
    margin: 0,
    transform: [{ translateX: -10 }],
    paddingLeft: 10,
    marginBottom: 10,
  },
  error: { color: colours.red, fontSize: 10 },
  checkboxContainer: {
    width: screenWidth * 0.87,
    flexDirection: 'row',
  },
  checkboxContainer: {
    transform: [{ translateY: -10 }],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  CheckBox: {
    borderColor: colours.lightgray,
  },
  ctextContainer: {
    fontFamily: 'Nunito-Bold',
    color: colours.lightgray,
  },
  ftextContainer: {
    marginLeft: 70,

    color: colours.lightgray,
  },
  fText: {
    fontFamily: 'Nunito-Bold',

    color: colours.violet,
    textDecorationLine: 'underline',
  },
  generalerror: {
    width: screenWidth * 0.87,
    height: 20,
    margin: 0,
    // transform: [{ translateX: -10 }],
    paddingLeft: 90,
    marginBottom: 0,

  },
  buttonContainer: {
    marginTop: 20,
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
  cText: {

    fontFamily: 'Nunito-Bold',

    color: colours.violet,
    textDecorationLine: 'underline'

  }
});
