import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import HeaderLogReg from '../Components/HeaderLogReg';
import Input1 from '../Components/Input1';
import Input4Password from '../Components/Input4Password';
import ProfileIcon from '../../public/icon/profile.svg';
import PasswordIcon from '../../public/icon/password-lock-svgrepo-com.svg';
import TelephoneIcon from '../../public/icon/telephone-svgrepo-com.svg';
import EmailIcon from '../../public/icon/email-svgrepo-com.svg';
import Button1 from '../Components/Button1';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setUserDataRedux} from '../redux/userSlice';
import { urlTemp } from '../constant';

interface PagesProps {
  navigation: StackNavigationProp<ParamListBase>;
}
const LoginPage: React.FC<PagesProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan Password harus diisi');
      return;
    }
    try {
      const response = await fetch(`http://${urlTemp}/client/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });
      const result = await response.json();

      if (response.ok) {
        Alert.alert('Sukses', 'Login berhasil');
        dispatch(setUserDataRedux(result.userData));
        // Alert.alert('Sukses', result.message);
        navigation.reset({
          index: 0,
          routes: [{name: 'Main'}],
        });
      } else {
        Alert.alert('Error', result.message || 'Login Gagal');
      }
    } catch (error) {
      console.error('Login error: ', error);
      Alert.alert('Error', 'Gagal menghubungi server');
    }
  };

  return (
    <View>
      <HeaderLogReg />
      {/* <Text>Register</Text> */}
      <View style={{padding: 25, paddingTop: 45}}>
        <Text
          style={{
            fontSize: 35,
            color: '#002B7B',
            marginBottom: 40,
            fontWeight: 500,
          }}>
          Login
        </Text>
        <View style={{display: 'flex', alignItems: 'center'}}>
          <Input1
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            icon={EmailIcon}
          />
          <Input4Password
            content="Password"
            icon={PasswordIcon}
            onChangeText={setPassword}
            value={password}
          />
          <View style={{marginBottom: 200}}></View>
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              width: '100%',
              backgroundColor: '#002B7B',
              borderRadius: 44,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '500',
                fontFamily: 'Roboto',
                fontSize: 18,
              }}>
              Login
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={{fontSize: 15, color: '#002B7B', marginRight: 6}}>
              Belum punya akun?
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{fontSize: 15, color: '#002B7B', fontWeight: '700'}}>
                Daftar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;
