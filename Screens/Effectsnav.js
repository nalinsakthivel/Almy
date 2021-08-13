import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../Components/Button'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useRoute } from '@react-navigation/native';
import { colours } from '../Constants';
const screenWidth = Dimensions.get('window').width;
const Effectsnav = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { data } = route.params;
  console.log(`data`, data);
  const [photo, setPhoto] = useState()
  const [arrdatas, setArrdatas] = useState([]);
  const getData = async () => {
    let result = await fetch(
      'https://jsonplaceholder.typicode.com/todos/' + data.id,
    );

    result = await result.json();
    setArrdatas(result);
  };

  const option = {
    mediaType: 'photo'

  }

  const onPhoto = () => {
    launchImageLibrary(option, (response) => {
      console.log(`response.uri`, response.assets[0])
      if (response.assets[0].uri) {
        setPhoto(response.assets[0].uri);
      }
    });
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      {/* <StatusBar translucent /> */}
      <StatusBar backgroundColor={colours.back} barStyle='dark-content' />
      <View style={styles.imageC}>
        {photo ?

          <ImageBackground

            style={styles.imageContainer}
            resizeMode="cover"
            source={{
              uri: photo
            }}
          />
          : <Text style={styles.photoText}>Select a Photo</Text>}
      </View>
      <View style={styles.chooseContainer}>
        <Button name='Choose Photo' onPress={onPhoto} />
      </View>
      <View
        style={styles.dataContainer}>

        <View style={styles.textView}>
          <Text style={styles.idText}>ID: {arrdatas.id}</Text>
          <Text style={styles.titleText}>Title: {arrdatas.title} It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years,
            sometimes by accident, sometimes on purpose (injected humour and the like).
          </Text>
        </View>
      </View>

      <TouchableOpacity

        style={styles.sText}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Effectsnav;

const styles = StyleSheet.create({
  container: { flex: 1 },
  dataContainer: {
    width: screenWidth * 0.87,
    height: 80,
    marginLeft: 35,
    // marginTop: 10,
    // elevation: 5,

    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 5,
  },
  textView: {
    width: screenWidth * 0.87,
    alignItems: 'flex-start',
  },
  imageContainer: {
    width: screenWidth,
    height: 300,
    // marginTop: 10,
    // marginLeft: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageC: {
    width: screenWidth,
    height: 300,

    alignItems: 'center',
    justifyContent: 'center'
  },
  imageView: {
    alignItems: 'flex-start',
    marginTop: 0,
  },
  chooseContainer: {
    marginTop: 10,
    margin: 25
  },
  sText: {

    width: screenWidth * 0.87,
    marginTop: 110,
    marginLeft: 25,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // fontWeight: 'bold',

    // textDecorationLine: 'underline',
  },
  backButton: {
    fontFamily: 'Nunito-Bold',
    color: colours.violet,
    textDecorationLine: 'underline',
  },
  idText: {
    marginTop: 40,
    fontFamily: 'Nunito-ExtraBold',
    color: colours.violet,
    marginBottom: 5,
  },
  titleText: {
    fontFamily: 'Nunito-Regular',
    marginBottom: 10,
    fontSize: 17
  }, photoText: {
    fontFamily: 'Nunito-Regular',
    display: 'flex',
    width: screenWidth,
    height: 300,
    marginTop: 300,
    marginLeft: 260,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
