import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import HeaderLogReg from '../Components/HeaderLogReg';
import Input1 from '../Components/Input1';
import ProfileIcon from '../../public/icon/profile.svg';
import PasswordIcon from '../../public/icon/password-lock-svgrepo-com.svg';
import TelephoneIcon from '../../public/icon/telephone-svgrepo-com.svg';
import EmailIcon from '../../public/icon/email-svgrepo-com.svg';
import Button1 from '../Components/Button1';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setUserDataRedux} from '../redux/userSlice';
import {v4 as uuidv4} from 'react-native-uuid/dist/v4';
import {urlTemp} from '../constant';
interface PagesProps {
  navigation: StackNavigationProp<ParamListBase>;
}
interface UserData {
  email: string;
  username: string;
  phone: string;
  password: string;
  id: string;
}

const RegisterPage: React.FC<PagesProps> = ({navigation}) => {
  const [userData, setUserData] = useState<UserData>({
    email: '',
    username: '',
    phone: '',
    password: '',
    id: '',
  });

  const dispatch = useDispatch();
  const handleInputChange = (field: keyof UserData, value: string) => {
    setUserData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const submitData = async () => {
    const {email, username, phone, password} = userData;
    let {id} = userData;
    id = uuidv4();
    const ordersCompleted = 0;
    const ordersRequested = 0;
    const rating = 0;
    if (!email || !username || !phone || !password || !id) {
      Alert.alert('Error', 'Semua field harus diisi!');
      return;
    }

    try {
      const response = await fetch(`http://${urlTemp}/client`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          phone,
          password,
          id,
          ordersCompleted,
          ordersRequested,
          rating,
        }),
      });

      // Memeriksa jika response.ok adalah true dan menampilkan hasilnya
      const result = await response.json();
      if (response.ok) {
        Alert.alert('Sukses', result.message);
        setUserData({email: '', username: '', phone: '', password: '', id: ''});
        dispatch(
          setUserDataRedux({
            email,
            username,
            phone,
            password,
            id,
            ordersCompleted,
            ordersRequested,
            rating,
          }),
        );
        // agar tidak kembali ke register/login
        navigation.reset({
          index: 0,
          routes: [{name: 'Main'}],
        });
      } else {
        // Jika server memberikan response yang error
        Alert.alert('Error', result.message || 'Terjadi kesalahan pada server');
      }
    } catch (error) {
      console.error('Error: ', error);
      Alert.alert(
        'Error',
        `Gagal mengirim data ke server. Periksa koneksi Anda.
        ${error}`,
      );
    }
  };

  return (
    <View>
      <HeaderLogReg />
      <View style={{padding: 25, paddingTop: 45}}>
        <Text
          style={{
            fontSize: 35,
            color: '#002B7B',
            marginBottom: 40,
            fontWeight: '500',
          }}>
          Daftar
        </Text>
        <View style={{display: 'flex', alignItems: 'center'}}>
          <Input1
            onChangeText={text => handleInputChange('email', text)}
            placeholder="Email"
            icon={EmailIcon}
          />
          <Input1
            onChangeText={text => handleInputChange('username', text)}
            placeholder="Username"
            icon={ProfileIcon}
          />
          <Input1
            onChangeText={text => handleInputChange('phone', text)}
            placeholder="Nomor Telepon"
            icon={TelephoneIcon}
          />
          <Input1
            onChangeText={text => handleInputChange('password', text)}
            placeholder="Password"
            icon={PasswordIcon}
          />
          <View style={{marginBottom: 80}} />

          <TouchableOpacity
            style={{
              width: '100%',
              backgroundColor: '#002B7B',
              borderRadius: 44,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={submitData}>
            <Text
              style={{
                color: 'white',
                fontWeight: '500',
                fontFamily: 'Roboto',
                fontSize: 18,
              }}>
              Daftar
            </Text>
          </TouchableOpacity>

          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={{fontSize: 15, color: '#002B7B', marginRight: 6}}>
              Sudah punya akun?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{fontSize: 15, color: '#002B7B', fontWeight: '700'}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RegisterPage;
