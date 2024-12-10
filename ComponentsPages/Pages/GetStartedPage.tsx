import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import Button1 from '../Components/Button1';
import {ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

interface PagesProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const GetStartedPage: React.FC<PagesProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../public/illustration/teenager1.png')}
        style={{width: 320, height: 210, marginTop: 180, marginBottom: 50}}
      />
      <Text style={styles.textStarted}>Efisiensikan Waktu</Text>
      <Text style={styles.textStarted}>Kuliah Bersama</Text>
      <Text style={[styles.textStarted, {marginBottom: 40}]}>
        Student Walker
      </Text>
      <Button1
        content="Mulai"
        navigation={navigation}
        targetScreen="Register"
        fw="800"
        heightProps={48}></Button1>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Menggunakan seluruh tinggi layar
    backgroundColor: '#42B0FF',
    padding: 30,
  },

  textStarted: {
    fontSize: 36,
    color: '#002B7B',
  },
});

export default GetStartedPage;
