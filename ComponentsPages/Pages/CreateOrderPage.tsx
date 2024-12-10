import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import TextHeader1 from '../Components/TextHeader1';
import BackIcon from '../../public/icon/back-no-arrow.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import LocationLogo from '../../public/icon/location-pin-svgrepo-com.svg';
import Button1 from '../Components/Button1';
import {v4 as uuidv4} from 'react-native-uuid/dist/v4';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {setActiveOrder} from '../redux/activeOrderSlice';
import {urlTemp} from '../constant';
interface PagesProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const CreateOrderPage: React.FC<PagesProps> = ({navigation}) => {
  const [purchaseLocation, setPurchaseLocation] = useState('');
  const [dropOffLocation, setDropOffLocation] = useState('');
  const [estimationPurchase, setEstimationPurchase] = useState<number>(0);
  const [fee, setFee] = useState<number>(0);
  const [orderDetail, setOrderDetail] = useState('');
  const clientData = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const handleCreateOrder = async () => {
    if (
      !purchaseLocation ||
      !dropOffLocation ||
      !estimationPurchase ||
      !fee ||
      !orderDetail
    ) {
      Alert.alert('Error', 'Semua field harus diisi');
      return;
    }
    const checkNumber = (input: any) => !isNaN(Number(input));
    if (!checkNumber(estimationPurchase)) {
      Alert.alert(
        'Kesalahan',
        'Mohon isi perkiraan total pesanan dengan benar',
      );
      return;
    }
    // Gunakan variabel lokal untuk nilai yang diperlukan
    const orderIdTemp = uuidv4();
    const clientIdTemp = clientData.id;
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    const formattedTime = currentDate.toTimeString().split(' ')[0];
    const totalPurchaseTemp = Number(estimationPurchase) + Number(fee);

    try {
      const response = await fetch(`http://${urlTemp}/client/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderIdTemp,
          clientId: clientIdTemp,
          orderDate: formattedDate,
          purchaseLocation,
          dropOffLocation,
          orderTime: formattedTime,
          estimationPurchase,
          totalPurchase: totalPurchaseTemp,
          fee,
          orderDetail,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Sukses', result.message);
        dispatch(
          setActiveOrder({
            orderId: orderIdTemp,
            clientId: clientIdTemp,
            orderDate: formattedDate,
            purchaseLocation,
            dropOffLocation,
            orderTime: formattedTime,
            estimationPurchase,
            totalPurchase: totalPurchaseTemp,
            fee,
            orderDetail,
          }),
        );
        navigation.reset({
          index: 0,
          routes: [{name: 'SearchingStuker'}],
        });
      } else {
        Alert.alert(
          'Error',
          result.message || 'Terjadi kesalahan pada server...',
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Gagal mengirim data ke server. Periksa koneksi Anda.',
      );
    }
  };

  const increaseFee = () => setFee(fee + 1000);
  const decreaseFee = () => {
    if (fee > 0) {
      setFee(fee - 1000);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}>
          <BackIcon width={28} height={28} />
        </TouchableOpacity>
        <TextHeader1 content="Buat Pesanan" />
        <View style={{width: 28}}></View>
      </View>

      {/* Ketentuan Pemesanan */}
      <View>
        <Text style={[styles.rulesText, {fontSize: 16, fontWeight: '500'}]}>
          Ketentuan Pemesanan
        </Text>
        <Text style={styles.rulesText}>
          - Pastikan detail pesananmu lengkap dan rapi biar gampang dipahami ya!
        </Text>
        <Text style={styles.rulesText}>
          - Hindari pakai kata-kata yang membingungkan ya, supaya ga salah paham
        </Text>
        <Text style={styles.rulesText}>
          - Contoh: "Saya mau pesan pangsit ayam di kantin A, tolong jangan
          pakai saus dan kecap ya, Makasih!"
        </Text>
      </View>

      {/* Location Inputs */}
      <View style={styles.locationContainer}>
        <View style={styles.locationLogo}>
          <LocationLogo width={40} height={40} />
        </View>
        <View style={styles.locationText}>
          <Text style={{fontSize: 12}}>Lokasi Penerimaan</Text>
          <TextInput
            style={styles.inputLocation}
            onChangeText={setDropOffLocation}
          />
        </View>
        <View style={styles.locationText}>
          <Text style={{fontSize: 12}}>Lokasi Pembelian</Text>
          <TextInput
            style={styles.inputLocation}
            onChangeText={setPurchaseLocation}
          />
        </View>
      </View>

      {/* Order Text & Estimation */}
      <View style={styles.orderTextContainer}>
        <TextInput
          style={styles.orderText}
          placeholder="Ketikkan pesananmu"
          multiline={true}
          onChangeText={setOrderDetail}
        />
        <View style={styles.estimationContainer}>
          <Text style={{color: '#003B7B'}}>Perkiraan total Pesanan: </Text>
          <Text style={{color: '#003B7B', fontWeight: '600'}}>Rp </Text>
          <TextInput
            style={styles.estimation}
            onChangeText={setEstimationPurchase}
          />
        </View>
      </View>

      {/* Ongkos Section */}
      <View style={styles.feeContainer}>
        <View style={styles.fee}>
          <Text style={{fontSize: 16, color: '#002B7B', fontWeight: '500'}}>
            Ongkos:
          </Text>
          <TouchableOpacity style={styles.button} onPress={decreaseFee}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={{fontSize: 16, color: '#002B7B', fontWeight: '500'}}>
            Rp {fee}
          </Text>
          <TouchableOpacity style={styles.button} onPress={increaseFee}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Create Order Button */}
      <TouchableOpacity
        style={{
          width: '100%',
          backgroundColor: '#002B7B',
          borderRadius: 44,
          height: 50,
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
        onPress={handleCreateOrder}>
        <Text
          style={{
            color: 'white',
            fontWeight: '500',
            fontFamily: 'Roboto',
            fontSize: 18,
          }}>
          Buat Pesanan
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: 14,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    width: '100%',
    justifyContent: 'space-between',
  },
  rulesText: {
    color: '#002B7B',
    fontSize: 13,
    marginTop: 8,
  },
  orderTextContainer: {
    width: '96%',
    height: 254,
    marginTop: 15,
    display: 'flex',
    alignItems: 'flex-end',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 18,
  },
  orderText: {
    width: '100%',
    height: 200,
    padding: 20,
    textAlignVertical: 'top',
  },
  estimationContainer: {
    width: '80%',
    height: 36,
    borderColor: '#002B7B',
    borderWidth: 1,
    borderRadius: 18,
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 5,
  },
  estimation: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    padding: 0,
    margin: 0,
    width: 60,
  },
  backButton: {
    width: 34,
    height: 34,
    borderColor: '#002B7B',
    borderWidth: 2,
    borderRadius: 18,
  },
  locationContainer: {
    width: '96%',
    height: 85,
    borderRadius: 18,
    borderColor: 'grey',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  locationText: {
    width: '40%',
    height: 65,
    borderStartColor: 'grey',
    borderStartWidth: 1,
    padding: 10,
    paddingVertical: 6,
  },
  locationLogo: {
    width: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputLocation: {
    width: '90%',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.4,
    padding: 0,
  },
  feeContainer: {
    width: '96%',
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 55,
  },
  fee: {
    width: '65%',
    flexDirection: 'row',
    height: 40,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 12,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    width: 30,
    height: 30,
    backgroundColor: '#002B7B',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default CreateOrderPage;
