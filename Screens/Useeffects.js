import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  Image,
  View,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,

  FlatList,
  ToastAndroid,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Button from '../Components/Button';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colours } from '../Constants';
import auth from '@react-native-firebase/auth';

const screenWidth = Dimensions.get('window').width;

const Useeffects = () => {
  const navigation = useNavigation();
  const [startCount, setstartCount] = useState(0);
  const [datas, setDatas] = useState([]);
  const [back, setBack] = useState(datas.completed);


  const getData = async startCount => {
    let result = await fetch(
      `http://jsonplaceholder.typicode.com/photos?_start=${startCount}&_limit=10`,
    );

    result = await result.json();
    console.log(`result`, result);
    setDatas(data => [...data, ...result]);

    setstartCount(startCount => startCount + 10);
  };

  useEffect(() => {
    getData(startCount);
  }, []);


  const onEndreach = () => {
    // getData(startCount);
  };


  const onLogout = async () => {
    await auth().signOut()
    return navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'Signin' }],
      }))
  }


  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={colours.violet} barStyle='light-content' />
      <FlatList
        onEndReached={onEndreach}
        contentContainerStyle={styles.container}
        ListHeaderComponentStyle={styles.headerContainer}
        ListHeaderComponent={<Text style={styles.headerText}>FlatList</Text>}
        ListFooterComponentStyle={styles.footerContainer}
        ListFooterComponent={
          <View>
            < TouchableOpacity
              onPress={onLogout}
            >
              <Text style={styles.headerText}>Signout</Text>
            </TouchableOpacity></View>

        }
        horizontal={false}
        numColumns={1}
        data={datas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.push('effectsnav', { data: item })}
            style={styles.dataContainer}>
            <View style={styles.imageView}>
              <Image
                style={styles.imageContainer}
                source={{ uri: 'https://picsum.photos/id/1006/3000/2000' }}
              />
            </View>
            <View style={styles.textView}>
              <Text style={styles.idText}>ID: {item.id}</Text>
              <Text style={styles.titleText} numberOfLines={1}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Useeffects;

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    // flexGrow: 1,
  },
  container: {
    // flexGrow: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  dataContainer: {
    width: screenWidth * 0.87,
    height: 230,
    marginRight: 15,
    marginBottom: 10,
    marginLeft: 15,
    marginTop: 10,
    elevation: 10,
    borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colours.white,
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: 'Nunito-Black',
    fontSize: 22,


    color: colours.white,
  },
  headerContainer: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    backgroundColor: colours.violet,
  },
  footerContainer: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 7,
    borderTopLeftRadius: 7,
    fontFamily: 'Nunito-Black',
    // borderBottomRightRadius: 5,
    // borderBottomLeftRadius: 5,
    backgroundColor: colours.violet,
  },
  imageContainer: {
    borderRadius: 5,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    // overflow: 'hidden',
    width: screenWidth * 0.87,
    height: 150,
  },
  imageView: {
    alignItems: 'flex-start',
    marginTop: 0,
  },
  textView: {
    width: '80%',
    marginLeft: 15,
    marginBottom: 18,
    alignItems: 'flex-start',
    //     justifyContent: 'space-between',
  },
  idText: {
    fontFamily: 'Nunito-Black',

  },
  titleText: {
    fontFamily: 'Nunito-Regular',
  }
});
