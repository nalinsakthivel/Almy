import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colours } from './Constants';
import Signup from './Screens/Signup';
import Signin from './Screens/Signin';
import ForgetPassword from './Screens/Forget Password';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Changing from './Screens/Changing';
import Effects from './Screens/Effects';
import Useeffects from './Screens/Useeffects';
import Effectsnav from './Screens/Effectsnav';
import RNBootSplash from 'react-native-bootsplash'
import auth from '@react-native-firebase/auth';

const App = () => {
  const [values, setValues] = useState(null);

  console.log('values', values);

  useEffect(() => {
    onInitialise();
  }, []);


  useEffect(() => {

    if (values !== null) {
      RNBootSplash.hide({ fade: true });
    }


  }, [values])

  const onInitialise = async () => {
    await auth().onAuthStateChanged(onSignin)

  }

  const onSignin = async (user) => {
    setValues(user ? true : false)

  }




  const Stack = createStackNavigator();

  if (values === null) return <View />

  if (values != null) return (

    <NavigationContainer>
      {values ? (
        <Stack.Navigator
          initialRouteName={'effects'}
          screenOptions={{
            headerShown: false,

          }}>

          <Stack.Screen name="effects" component={Useeffects} />
          <Stack.Screen name="effectsnav" component={Effectsnav} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />

        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="effects" component={Useeffects} />
          <Stack.Screen name="effectsnav" component={Effectsnav} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: colours.back,
  },
});
