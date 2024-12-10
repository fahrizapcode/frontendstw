import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, TextInput, Alert} from 'react-native';
import TextHeader1 from '../Components/TextHeader1';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import Button1 from '../Components/Button1';
import DetailLogo from '../../public/icon/detail.svg';
import {urlTemp} from '../constant';

interface PageProps {
  navigation: StackNavigationProp<ParamListBase>;
  route: any;
}

interface DetailProp {
  order_id: string;
  purchase_location: string;
  dropoff_location: string;
  fee: number;
  estimation_purchase: number;
  profile_picture: string;
  username: string;
  order_detail: string;
}

const OrderDetailInStukerPage: React.FC<PageProps> = ({navigation, route}) => {
  const {orderId} = route.params;
  const [orderDetails, setOrderDetails] = useState<DetailProp | null>(null);
  useEffect(() => {
    fetch(`http://${urlTemp}/stuker/active-order/${orderId}`)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', 'Gagal mengambil data order');
        }
        return response.json();
      })
      .then(data => setOrderDetails(data))
      .catch(error => Alert.alert('Error', error));
  }, [orderId]);

  if (!orderDetails) {
    return <Text>Loading....</Text>;
  }

  const convertToCurrency = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      //menghilangkan desimal
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  return (
    <View style={styles.main}>
      <TextHeader1 content="Order Detail" />
      <View style={{height: 20}}></View>
      <DetailLogo width={100} height={100} />
      <View style={styles.profileContainer}>
        <Image
          source={{uri: orderDetails.profile_picture}}
          style={styles.photoProfile}
        />
        <View>
          <Text style={{color: '#002B7B', fontSize: 18, fontWeight: '500'}}>
            {orderDetails.username}
          </Text>
          <Text style={{color: '#002B7B', fontSize: 12, marginBottom: 3}}>
            Pelanggan
          </Text>
        </View>
      </View>
      <View style={styles.locationFee}>
        <View style={styles.location}>
          <Image
            source={require('../../public/image/locationStukerLong.png')}
            style={{width: 12, height: 74, marginRight: 10, marginTop: 6}}
          />
          <View>
            <Text style={styles.textLocation}>
              {orderDetails.purchase_location}
            </Text>
            <Text style={styles.infoLocation}>Lokasi Pembelian</Text>
            <Text style={[styles.textLocation, {marginTop: 16}]}>
              {orderDetails.dropoff_location}
            </Text>
            <Text style={styles.infoLocation}>Lokasi Penerimaan</Text>
          </View>
        </View>
        <View style={styles.feeContainer}>
          <Text style={styles.infoFee}>Perkiraan Pesanan</Text>
          <View style={styles.fee}>
            <Text style={styles.feeText}>
              {convertToCurrency(orderDetails.estimation_purchase)}
            </Text>
          </View>
          <Text style={styles.infoFee}>Ongkos</Text>
          <View style={[styles.fee, {backgroundColor: '#00B715'}]}>
            <Text style={styles.feeText}>
              {convertToCurrency(orderDetails.fee)}
            </Text>
          </View>
        </View>
      </View>
      <View style={{width: '100%', marginTop: 15, paddingStart: 14}}>
        <TextHeader1 content="Pesanan" />
      </View>
      <View style={styles.orderContainer}>
        <Text style={{color: '#002B7B'}}>{orderDetails.order_detail}</Text>
      </View>
      <Button1
        content="Terima"
        navigation={navigation}
        targetScreen="OrderProcess"
        fw="700"
        heightProps={48}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    width: '100%',
    backgroundColor: 'white',
    height: 170,
    marginTop: 8,
    marginBottom: 25,
    borderColor: '#002B7B',
    borderRadius: 16,
    flexDirection: 'row',
    borderWidth: 1,
    padding: 15,
  },
  photoProfile: {
    width: 50,
    height: 50,
    backgroundColor: 'grey',
    borderRadius: 25,
    marginRight: 12,
  },
  profileContainer: {
    width: '100%',
    backgroundColor: 'white',
    height: 70,
    marginTop: 60,
    marginBottom: 15,
    borderColor: '#002B7B',
    borderRadius: 16,
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  main: {
    backgroundColor: '#42B0FF',
    height: 825,
    paddingVertical: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  locationFee: {
    borderColor: '#002B7B',
    borderWidth: 1,
    width: '100%',
    backgroundColor: 'white',
    height: 120,
    borderRadius: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  location: {
    padding: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  textLocation: {
    fontSize: 16,
    color: '#002B7B',
    fontWeight: '500',
  },
  infoLocation: {
    color: '#002B7B',
    fontSize: 10,
  },
  fee: {
    width: 110,
    height: 30,
    borderRadius: 8,
    marginTop: 3,
    marginBottom: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#002B7B',
  },
  infoFee: {
    color: '#002B7B',
    fontSize: 11,
  },
  feeContainer: {
    padding: 8,
    paddingHorizontal: 18,
  },
  feeText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
});
export default OrderDetailInStukerPage;
