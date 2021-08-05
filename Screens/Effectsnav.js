import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useRoute} from '@react-navigation/native';
import {colours} from '../Constants';
const screenWidth = Dimensions.get('window').width;
const Effectsnav = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const {data} = route.params;
  console.log(`data`, data);
  const [arrdatas, setArrdatas] = useState([]);
  const getData = async () => {
    let result = await fetch(
      'https://jsonplaceholder.typicode.com/todos/' + data.id,
    );

    result = await result.json();
    setArrdatas(result);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageContainer}
        resizeMode="cover"
        source={{
          uri: 'https://i.pinimg.com/originals/af/8d/63/af8d63a477078732b79ff9d9fc60873f.jpg',
        }}
      />
      <View
        style={{
          ...styles.dataContainer,
          backgroundColor:
            arrdatas.completed == true ? colours.lightGreen : colours.lightRed,
        }}>
        <View style={styles.textView}>
          <Text>ID: {arrdatas.id}</Text>
          <Text numberOfLines={1}>Title: {arrdatas.title}</Text>
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
  container: {flex: 1},
  dataContainer: {
    width: screenWidth * 0.87,
    height: 80,
    marginLeft: 25,
    marginTop: 10,
    elevation: 5,

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  textView: {
    width: screenWidth * 0.6,
    alignItems: 'center',
  },
  imageContainer: {
    width: screenWidth,
    height: 300,
    // // marginTop: 10,
    // marginLeft: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
    alignItems: 'flex-start',
    marginTop: 0,
  },
  sText: {
    width: screenWidth * 0.87,
    marginTop: 250,
    marginLeft: 25,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // fontWeight: 'bold',

    // textDecorationLine: 'underline',
  },
  backButton: {
    fontWeight: 'bold',
    color: colours.violet,
    textDecorationLine: 'underline',
  },
});
