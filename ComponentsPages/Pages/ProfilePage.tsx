import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import TextHeader1 from '../Components/TextHeader1';
import PenIcon from '../../public/icon/pencil-svgrepo-com.svg';
import Input2 from '../Components/Input2';
import ProfileIcon from '../../public/icon/profile.svg';
import PasswordIcon from '../../public/icon/password-lock-svgrepo-com.svg';
import TelephoneIcon from '../../public/icon/telephone-svgrepo-com.svg';
import EmailIcon from '../../public/icon/email-svgrepo-com.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import {RootState} from '../redux/store';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {setUserDataRedux, switchRole} from '../redux/userSlice';
import {urlTemp} from '../constant';

interface PagesProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const ProfilePage: React.FC<PagesProps> = ({navigation}) => {
  const clientData = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [imageUri, setImageUri] = useState<string | null>(
    clientData.profilePicture || null,
  );
  const {id} = clientData;
  const handleSwitchRole = (newRole: 'client' | 'stuker') => {
    dispatch(switchRole(newRole));
    navigation.navigate('StukerDashboard');
  };

  useEffect(() => {
    // Fetch profile picture if not already in local state
    if (!imageUri && clientData.profilePicture) {
      setImageUri(clientData.profilePicture);
    }
  }, [clientData, imageUri]);

  const chooseImage = () => {
    launchImageLibrary(
      {mediaType: 'photo', includeBase64: true, quality: 1},
      response => {
        if (response?.didCancel) {
          console.log('User canceled image picker');
        } else if (response?.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response?.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0].uri;
          if (selectedImage) {
            setImageUri(selectedImage);
          } else {
            console.log('Gambar tidak valid');
          }
        } else {
          console.log('Tidak ada gambar yang dipilih');
        }
      },
    );
  };

  const updateProfilePicture = async () => {
    if (!imageUri) {
      Alert.alert('Error', 'Pilih gambar terlebih dahulu');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('profilePicture', {
        uri: imageUri,
        type: 'image/jpeg',
        name: `${id}.jpg`, // Attach file name
      });

      const response = await fetch(
        `http://${urlTemp}/client/profile-picture/${id}`,
        {
          method: 'PUT',
          body: formData,
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );

      const result = await response.json(); // Await the JSON response

      if (response.ok) {
        Alert.alert('Sukses', result.message);
        // Update the Redux store with the new profile picture URI
        dispatch(setUserDataRedux({...clientData, profilePicture: imageUri}));
        navigation.navigate('Home');
      } else {
        Alert.alert(
          'Error',
          result.message || 'Gagal memperbarui gambar profil',
        );
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
      Alert.alert('Error', 'Terjadi kesalahan saat mengupload gambar.');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <TextHeader1 content="Edit Profil" />
      <View style={styles.profile}>
        <TouchableOpacity style={styles.penContainer} onPress={chooseImage}>
          <PenIcon width={20} height={20} />
        </TouchableOpacity>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.profileImage} />
        ) : (
          <ProfileIcon height={60} width={60} />
        )}
      </View>
      <View style={{marginTop: 70}}></View>
      <Input2
        content="Username"
        icon={ProfileIcon}
        pcContent={clientData.username}
      />
      <Input2 content="Email" icon={EmailIcon} pcContent={clientData.email} />
      <Input2
        content="No Telepon"
        icon={TelephoneIcon}
        pcContent={clientData.phone}
      />
      <Input2
        content="Password"
        icon={PasswordIcon}
        pcContent="* * * * * * * * *"
      />

      <View style={styles.navigationBottomProfile}>
        <TouchableOpacity
          style={[styles.buttonBottomProfile, {width: '41%'}]}
          onPress={() =>
            handleSwitchRole(clientData.role === 'client' ? 'stuker' : 'client')
          }>
          <Text style={styles.buttonBottomProfileText}>Beralih ke stuker</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonBottomProfile, {width: '53%'}]}
          onPress={updateProfilePicture}>
          <Text style={styles.buttonBottomProfileText}>Simpan Perubahan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
    display: 'flex',
    alignItems: 'center',
  },
  profile: {
    width: 110,
    height: 110,
    backgroundColor: 'grey',
    borderRadius: 60,
    marginTop: 20,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 60, // to make it circular
  },
  penContainer: {
    width: 35,
    height: 35,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderColor: 'white',
    borderRadius: 30,
    backgroundColor: '#42B0FF',
    bottom: -16,
    zIndex: 3,
  },
  navigationBottomProfile: {
    width: '100%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonBottomProfile: {
    height: 45,
    backgroundColor: '#002B7B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonBottomProfileText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default ProfilePage;
