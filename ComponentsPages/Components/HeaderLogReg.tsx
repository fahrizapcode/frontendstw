import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

const HeaderLogReg = () => {
  return (
    <View style={styles.container}>
      {/* Gambar ditempatkan di bagian atas dalam View */}
      <Image
        source={require('../../public/illustration/studentwalkerDarkBlue.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: '100%',
    backgroundColor: '#42B0FF',
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    alignItems: 'center', // Menempatkan image di tengah horizontal
  },
  image: {
    width: 70,
    height: 70,
    marginTop: 50, // Menambahkan jarak dari atas View
  },
});

export default HeaderLogReg;
