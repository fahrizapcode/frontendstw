import {ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Button1 from '../Components/Button1';


interface PageProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const FinishOrderPage: React.FC<PageProps> = ({navigation}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        justifyContent: 'space-between',
        height: 820,
      }}>
      <View style={styles.main}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 19,
            color: '#002B7B',
            fontWeight: '500',
            marginBottom: 40,
            marginTop: 80,
          }}>
          Pesanan selesai, terus semangat untuk selalu berikan pelayanan dan
          buat pelangganmu puas setiap waktu
        </Text>
        <Image
          source={require('../../public/illustration/ratingboy1.png')}
          style={{width: 350, height: 170, marginBottom: 320}}
        />
        <Button1
          content="Kembali"
          navigation={navigation}
          targetScreen="StukerDashboard"
          fw="700"
          heightProps={50}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingVertical: 10,
    alignItems: 'center',
    height: 480,
    paddingHorizontal: 26,
  },
});
export default FinishOrderPage;
