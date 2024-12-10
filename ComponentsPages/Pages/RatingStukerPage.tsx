import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Star from '../../public/icon/star-o-white.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
interface PageProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const RatingStukerPage: React.FC<PageProps> = ({navigation}) => {
  return (
    <View style={styles.main}>
      <Text style={{color: 'white', fontSize: 20, fontWeight: '500'}}>
        Beri Rating untuk Stuker Anda
      </Text>
      <View style={styles.profilePhoto}></View>
      <Text style={{color: 'white', fontSize: 18}}>Aliendo Syarif</Text>
      <Text style={{color: 'white', fontSize: 13, fontWeight: 300}}>
        Student Walker
      </Text>
      <View style={styles.rating}>
        <Star width={34} height={34} />
        <Star width={34} height={34} />
        <Star width={34} height={34} />
        <Star width={34} height={34} />
        <Star width={34} height={34} />
      </View>
      <TextInput
        style={styles.inputReview}
        multiline={true}
        placeholder="Ketikkan ulasan anda (opsional)"
      />
      <TouchableOpacity
        style={styles.completeButton}
        onPress={() => navigation.navigate('Main')}>
        <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
          Selesai
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#002B7B',
    height: 825,
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 25,
  },
  profilePhoto: {
    marginTop: 25,
    marginBottom: 10,
    width: 70,
    height: 70,
    backgroundColor: 'grey',
    borderRadius: 40,
  },
  rating: {
    marginTop: 8,
    flexDirection: 'row',
    columnGap: 8,
  },
  inputReview: {
    marginTop: 20,
    borderRadius: 12,
    width: 330,
    height: 180,
    backgroundColor: 'white',
    textAlignVertical: 'top',
    padding: 18,
  },
  completeButton: {
    width: 330,
    marginTop: 280,
    height: 44,
    backgroundColor: '#00B715',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default RatingStukerPage;
