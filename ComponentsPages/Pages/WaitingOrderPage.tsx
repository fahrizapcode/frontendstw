import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Image} from 'react-native';
import BottomOrder from '../Components/BottomOrder';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';

interface PageProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const WaitingOrderPage: React.FC<PageProps> = ({navigation}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        justifyContent: 'space-between',
        height: 820,
      }}>
      <View style={styles.top}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 25,
            color: '#002B7B',
            fontWeight: '500',
            marginBottom: 100,
          }}>
          Pesanan kamu sedang dalam proses, ditunggu ya . . . .
        </Text>
        <Image
          source={require('../../public/illustration/waiting1.png')}
          style={{width: 350, height: 250}}
        />
      </View>
      <BottomOrder
        navigation={navigation}
        targetProp="RatingStuker"
        nameProp="Aliendo"
        roleProp="Stuker"
        totalEstimationProp={45000}
        confirmProp="Apakah kamu sudah nerima pesanannya?"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    paddingVertical: 130,
    alignItems: 'center',
    height: 480,
  },
});

export default WaitingOrderPage;
