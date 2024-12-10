import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import TelephoneIcon from '../../public/icon/telephone-svgrepo-com.svg';
import ChatIcon from '../../public/icon/message.svg';
import BuildingIcon from '../../public/icon/building-2-svgrepo-com (1).svg';
import {useState} from 'react';
import {ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
interface PagesProp {
  navigation: StackNavigationProp<ParamListBase>;
  totalEstimationProp: number;
  roleProp: string;
  nameProp: string;
  targetProp: string;
  confirmProp: string;
}

const BottomOrder: React.FC<PagesProp> = ({
  navigation,
  totalEstimationProp,
  roleProp,
  nameProp,
  targetProp,
  confirmProp,
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <View
        style={[styles.modalBoxBlocker, {display: visible ? 'flex' : 'none'}]}>
        <View style={styles.modalBox}>
          <Text style={{color: '#002B7B', fontSize: 15}}>{confirmProp}</Text>
          <View style={styles.response}>
            <TouchableOpacity onPress={() => navigation.navigate(targetProp)}>
              <Text style={styles.responseButton}>Sudah </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={styles.responseButton}>Belum</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.headerBottom}>
          <View style={styles.profile}>
            <View style={styles.profilePhoto}></View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{nameProp}</Text>
              <Text style={styles.role}>{roleProp}</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.iconContainerIn}
              onPress={() => navigation.navigate('ChatPrivate')}>
              <View style={styles.notification}></View>
              <ChatIcon width={34} height={34} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.detail}>
          <View>
            <Text style={{color: 'white', marginBottom: 14, fontSize: 16}}>
              Fst Lantai 4, R 4.11
            </Text>
            <BuildingIcon width={54} height={54} />
          </View>
          <View>
            <View style={styles.totalEstimation}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '300',
                  marginRight: 8,
                  fontSize: 12,
                  marginLeft: 6,
                }}>
                Perkiraan total:
              </Text>
              <Text style={{color: 'white', fontWeight: '500', fontSize: 12}}>
                Rp{totalEstimationProp}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => setVisible(true)}>
              <Text style={{color: 'white', fontWeight: '500', fontSize: 16}}>
                Konfirmasi selesai
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  responseButton: {
    color: '#002B7B',
    fontWeight: '500',
    fontSize: 17,
  },
  response: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
    columnGap: 70,
  },
  modalBox: {
    justifyContent: 'space-between',
    padding: 10,
    width: 320,
    height: 130,
    borderColor: '#002B7B',
    borderWidth: 1,
    backgroundColor: 'white',
    marginTop: 240,
    borderRadius: 8,
  },
  modalBoxBlocker: {
    alignItems: 'center',
    width: '100%',
    height: 830,
    backgroundColor: 'rgba(0, 0, 255, 0)',
    position: 'absolute',
    zIndex: 4,
    top: -540,
  },
  confirmButton: {
    backgroundColor: '#00B715',
    width: 160,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 4,
    position: 'relative',
  },
  detail: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 15,
    height: 100,
    // borderColor: 'white',
    // borderWidth: 1,
  },
  totalEstimation: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bottom: {
    backgroundColor: '#002B7B',
    height: 260,
    borderTopRightRadius: 26,
    borderTopLeftRadius: 26,
    paddingHorizontal: 10,
    position: 'relative',
  },
  headerBottom: {
    borderBottomColor: 'white',
    width: '100%',
    borderBottomWidth: 0.5,
    height: 90,
    borderColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profile: {
    flexDirection: 'row',
  },
  profilePhoto: {
    width: 50,
    height: 50,
    backgroundColor: 'grey',
    borderRadius: 30,
  },
  nameContainer: {
    rowGap: 3,
    marginTop: 5,
    marginLeft: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
  role: {
    fontSize: 11,
    fontWeight: '300',
    color: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
    columnGap: 16,
    marginTop: 4,
  },
  iconContainerIn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: 42,
    borderRadius: 22,
    backgroundColor: 'white',
    position: 'relative',
    marginRight: 6,
  },
  notification: {
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: '#00B715',
    position: 'absolute',
    top: 1,
    right: 1,
  },
});
export default BottomOrder;
