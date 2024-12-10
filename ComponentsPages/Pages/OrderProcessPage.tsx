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
            fontSize: 21,
            color: '#002B7B',
            fontWeight: '500',
            marginBottom: 40,
          }}>
          Pesanan dari pelanggan sudah diterima, Nikmati perjalananmu dan
          pastikan barang diterima dengan baik ya
        </Text>
        <Image
          source={require('../../public/illustration/skateboard1.png')}
          style={{width: 350, height: 310}}
        />
      </View>
      <BottomOrder
        navigation={navigation}
        targetProp="FinishOrder"
        nameProp="Gunawan"
        roleProp="Pelanggan"
        totalEstimationProp={45000}
        confirmProp="Apakah pesanannya sudah sampai?"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    paddingVertical: 110,
    alignItems: 'center',
    height: 480,
  },
});

export default WaitingOrderPage;
