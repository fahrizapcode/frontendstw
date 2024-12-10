import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Button1 from '../Components/Button1';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import TextHeader1 from '../Components/TextHeader1';
import HistoryIcon from '../../public/icon/history-svgrepo-com.svg';
import HistoryItem from '../Components/HistoryItem';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import ProfileIcon from '../../public/icon/profile.svg';
interface PagesProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const HomePage: React.FC<PagesProps> = ({navigation}) => {
  const clientData = useSelector((state: RootState) => state.user);
  return (
    <View style={styles.main}>
      {clientData.profilePicture ? (
        <Image
          style={styles.profilePhoto}
          source={{uri: clientData.profilePicture}}
        />
      ) : (
        <View
          style={{
            width: 64,
            height: 64,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'grey',
            borderRadius: 32,
            backgroundColor: 'grey',
          }}>
          <ProfileIcon height={40} width={40} />
        </View>
      )}
      <Text style={[styles.greeting, {fontSize: 22}]}>Selamat Pagi,</Text>
      <Text style={[styles.greeting, {fontWeight: 500, fontSize: 42}]}>
        {clientData.username}
      </Text>
      <View style={[styles.containerOrder, {marginBottom: 26}]}>
        <View style={{width: '60%'}}>
          <Text style={styles.greeting}>Butuh makanan atau</Text>
          <Text style={styles.greeting}>barang lain? Yuk,</Text>
          <Text style={[styles.greeting, {marginBottom: 13}]}>
            pesan di sini
          </Text>
          <Button1
            content="Order"
            navigation={navigation}
            targetScreen="CreateOrder"
            fw="500"
            heightProps={36}
          />
        </View>
        <Image
          source={require('../../public/illustration/women1.png')}
          style={{width: 136, height: 125, marginTop: 6, marginBottom: 50}}
        />
      </View>
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <HistoryIcon
          width={30}
          height={30}
          style={{marginRight: 10, marginTop: 2}}
        />
        <TextHeader1 content="Riwayat Pemesanan" />
      </View>
      <ScrollView style={{height: 320}} showsVerticalScrollIndicator={false}>
        <HistoryItem />
        <HistoryItem />
        <HistoryItem />
        <HistoryItem />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 25,
    paddingHorizontal: 15,
  },
  profilePhoto: {
    width: 65,
    height: 65,
    backgroundColor: 'grey',
    borderRadius: 100,
    marginBottom: 10,
  },
  greeting: {
    fontSize: 20,
    color: '#002B7B',
  },
  containerOrder: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 180,
    backgroundColor: '#42B0FF',
    marginVertical: 20,
    borderRadius: 10,
    padding: 20,
  },
});
export default HomePage;
