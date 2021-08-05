import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ToastAndroid,
} from 'react-native';
import Seperator from '../Components/Seperater';
import Button from '../Components/Button';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colours} from '../Constants';
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
    getData(startCount);
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        onEndReached={onEndreach}
        contentContainerStyle={styles.container}
        ListHeaderComponentStyle={styles.headerContainer}
        ListHeaderComponent={<Text style={styles.headerText}>FlatList</Text>}
        ListFooterComponentStyle={styles.footerContainer}
        ListFooterComponent={
          <TouchableOpacity
            onPress={async () =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{name: 'Signin'}],
                }),
                await AsyncStorage.removeItem('credentials'),
                ToastAndroid.show(
                  'Logout Sucessfull',
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                ),
              )
            }>
            <Text style={styles.headerText}>Signout</Text>
          </TouchableOpacity>
        }
        horizontal={false}
        numColumns={2}
        data={datas}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.push('effectsnav', {data: item})}
            style={styles.dataContainer}>
            <View style={styles.imageView}>
              <Image
                style={styles.imageContainer}
                source={{uri: 'https://picsum.photos/id/1006/3000/2000'}}
              />
            </View>
            <View style={styles.textView}>
              <Text style={styles.idText}>ID: {item.id}</Text>
              <Text numberOfLines={1}>{item.title}</Text>
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
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  dataContainer: {
    width: screenWidth * 0.4,
    height: 150,
    marginRight: 15,
    marginBottom: 10,
    marginLeft: 15,
    marginTop: 10,
    elevation: 10,
    // borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colours.white,
    justifyContent: 'space-between',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: colours.white,
  },
  headerContainer: {
    width: '100%',
    height: 60,
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
    // borderBottomRightRadius: 5,
    // borderBottomLeftRadius: 5,
    backgroundColor: colours.violet,
  },
  imageContainer: {
    // overflow: 'hidden',
    width: 158,
    height: 80,
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
    fontWeight: 'bold',
  },
});
