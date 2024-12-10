import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import ProfileIcon from '../../public/icon/profile.svg';

interface PageProps {
  navigation: StackNavigationProp<ParamListBase>;
  usernameClient: string;
  sourceProfilePicture: string;
  detailOrder: string;
  purchaseLocation: string;
  dropoffLocation: string;
  estimationPurchase: number;
  fee: number;
  orderId: string;
}

const OrderInStukerDsb: React.FC<PageProps> = ({
  navigation,
  usernameClient,
  sourceProfilePicture,
  detailOrder,
  purchaseLocation,
  dropoffLocation,
  estimationPurchase,
  fee,
  orderId,
}) => {
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
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('OrderDetailInStuker', {orderId: orderId})
      }>
      <View style={styles.top}>
        <View style={styles.location}>
          <Image
            source={require('../../public/image/locationInStuker.png')}
            style={{height: 50, width: 17}}
          />
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationText}>{purchaseLocation}</Text>
            <Text style={styles.locationText}>{dropoffLocation}</Text>
          </View>
        </View>
        <View style={styles.fee}>
          <View style={styles.feeInner}>
            <Text style={styles.feeText}>
              {convertToCurrency(estimationPurchase)}
            </Text>
          </View>
          <View
            style={[
              styles.feeInner,
              {backgroundColor: '#00B715', marginTop: 4},
            ]}>
            <Text style={styles.feeText}>{convertToCurrency(fee)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.profile}>
          <View style={styles.photoProfile}>
            {sourceProfilePicture ? (
              <Image
                style={styles.photoProfile}
                source={{uri: sourceProfilePicture}}
              />
            ) : (
              <ProfileIcon height={34} width={34} />
            )}
          </View>
          <Text style={styles.profileName}>{usernameClient}</Text>
        </View>
        <Text style={styles.detailText}>{detailOrder}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  detailText: {
    width: '46%',
    fontSize: 12,
    marginLeft: 6,
    color: '#002B7B',
  },
  profileName: {
    fontSize: 16,
    color: '#002B7B',
  },
  photoProfile: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: 'grey',
    borderWidth: 0.5,
    borderColor: '#002B7B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    columnGap: 6,
    width: '44%',
    borderRightColor: '#002B7B',
    borderRightWidth: 0.9,
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottom: {
    width: '99%',
    height: 64,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  locationText: {
    color: '#002B7B',
    fontWeight: '600',
    paddingStart: 8,
  },
  locationTextContainer: {
    width: 150,
    height: 47,
    marginTop: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  location: {
    display: 'flex',
    flexDirection: 'row',
  },
  feeText: {
    color: 'white',
    fontWeight: '600',
  },
  feeInner: {
    width: '100%',
    height: 28,
    display: 'flex',
    backgroundColor: '#002B7B',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  fee: {
    width: 120,
    height: 62,
  },
  top: {
    width: '99%',
    height: 70,
    backgroundColor: '#42B0FF',
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  container: {
    paddingVertical: 2,
    width: '100%',
    height: 140,
    marginBottom: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'grey',
    display: 'flex',
    alignItems: 'center',
  },
});
export default OrderInStukerDsb;
