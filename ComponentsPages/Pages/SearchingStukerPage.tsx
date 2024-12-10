import React from 'react';
import {View, Text, Image} from 'react-native';
import Button1 from '../Components/Button1';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';

interface PagesProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const SearchingStukerPage: React.FC<PagesProps> = ({navigation}) => {
  setTimeout(() => {
    navigation.navigate('WaitingOrder');
  }, 3000);
  return (
    <View
      style={{
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        height: 810,
        padding: 16,
        justifyContent: 'center',
      }}>
      <Image
        source={require('../../public/illustration/searching.png')}
        style={{
          width: 370,
          height: 310,
          margin: 10,
          marginBottom: 60,
          marginTop: 40,
        }}
      />

      <Text style={{color: '#002B7B', fontSize: 28}}>Mencari stuker yang</Text>

      <Text style={{color: '#002B7B', fontSize: 28, marginBottom: 180}}>
        bersedia ..........
      </Text>
      <Button1
        content="Batalkan"
        navigation={navigation}
        targetScreen="Main"
        fw="700"
        heightProps={50}
      />
    </View>
  );
};

export default SearchingStukerPage;
