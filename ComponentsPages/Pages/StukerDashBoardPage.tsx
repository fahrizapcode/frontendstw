import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import OrderInStukerDsb from '../Components/OrderInStukerDsb';
import Star from '../../public/icon/star.svg';
import List from '../../public/icon/list.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import {UseDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import ProfileIcon from '../../public/icon/profile.svg';
import {urlTemp} from '../constant';
interface PageProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const StukerDashBoardPage: React.FC<PageProps> = ({navigation}) => {
  const clientData = useSelector((state: RootState) => state.user);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  //useref cocok untuk menyimpan nilai yang mutable (bisa berubah) di latar belakang, bukan di ui
  //jadi kasus counting lebih cocok menggunakan use state karena kasusnya memperbarui ui
  const sidebarAnimation = useRef(new Animated.Value(-210)).current;

  interface OrderDataType {
    order_id: string;
    purchase_location: string;
    dropoff_location: string;
    fee: number;
    estimation_purchase: number;
    profile_picture: string;
    username: string;
    order_detail: string;
  }
  const [orders, setOrders] = useState<OrderDataType[]>([]);

  useEffect(() => {
    fetch(`http:/${urlTemp}/stuker/active-orders`)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', 'Gagal mengambil data ya');
          return;
        }
        return response.json();
      })
      .then(data => setOrders(data))
      .catch(error => Alert.alert('Error', error));
  });

  const toggleSidebar = () => {
    if (sidebarVisible) {
      Animated.timing(sidebarAnimation, {
        toValue: -210,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setSidebarVisible(false));
    } else {
      setSidebarVisible(true);
      Animated.timing(sidebarAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleOutsidePress = () => {
    if (sidebarVisible) toggleSidebar();
  };

  return (
    <View style={styles.mainContainer}>
      {/* Overlay with z-index */}
      {sidebarVisible && (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={[styles.overlay, {zIndex: 1}]} />
        </TouchableWithoutFeedback>
      )}

      {/* Sidebar with z-index */}
      <Animated.View
        style={[styles.sidebar, {left: sidebarAnimation, zIndex: 2}]}>
        <View style={styles.headerSidebar}>
          <View
            style={[
              styles.profileHeader,
              {
                width: 66,
                height: 66,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            {clientData.profilePicture ? (
              <Image
                source={{uri: clientData.profilePicture}}
                width={66}
                height={66}
              />
            ) : (
              <ProfileIcon height={40} width={40} />
            )}
          </View>
          <View style={styles.nameSidebar}>
            <Text style={styles.name}>{clientData.username}</Text>
            <Text style={styles.orders}>
              {clientData.ordersCompleted} order
            </Text>
          </View>
          <View style={styles.ratingSidebar}>
            <Star width={18} height={18} />
            <Star width={18} height={18} />
            <Star width={18} height={18} />
            <Star width={18} height={18} />
            <Star width={18} height={18} />
            <Text style={styles.ratingNumber}>{clientData.rating}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.backHomeBtn}>
          <Text style={{color: 'white'}}>Beralih ke Pelanggan</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Main page */}
      <View
        style={[
          styles.mainContent,
          {
            zIndex: 0, // Ensure the content is behind the sidebar and overlay
            opacity: sidebarVisible ? 0.5 : 1, // Dim the content when sidebar is open
            pointerEvents: sidebarVisible ? 'none' : 'auto', // Disable interaction with main content when sidebar is open
          },
        ]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.profileHeader}
            onPress={toggleSidebar}>
            {clientData.profilePicture ? (
              <Image
                source={{uri: clientData.profilePicture}}
                width={60}
                height={60}
              />
            ) : (
              <View
                style={{
                  width: 60,
                  height: 60,
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
          </TouchableOpacity>
        </View>
        <View></View>
        <View style={styles.secondaryHeader}>
          <List width={20} height={20} />
          <Text style={styles.textHeader}>Daftar Order</Text>
        </View>
        <FlatList
          data={orders}
          keyExtractor={item => item.order_id.toString()}
          renderItem={({item}) => (
            <OrderInStukerDsb
              navigation={navigation}
              usernameClient={item.username}
              sourceProfilePicture={item.profile_picture}
              purchaseLocation={item.purchase_location}
              dropoffLocation={item.dropoff_location}
              estimationPurchase={item.estimation_purchase}
              fee={item.fee}
              detailOrder={item.order_detail}
              orderId={item.order_id}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    width: '100%',
    position: 'relative', // Ensure correct positioning
  },
  ratingNumber: {
    color: '#002B7B',
    marginLeft: 4,
    fontWeight: '400',
    fontSize: 14,
  },
  orders: {
    color: '#002B7B',
    borderWidth: 1,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    borderColor: '#002B7B',
    borderRadius: 4,
  },
  name: {
    color: '#002B7B',
    fontWeight: '600',
    fontSize: 18,
  },
  nameSidebar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 180,
    alignItems: 'center',
    marginVertical: 6,
  },
  ratingSidebar: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 170,
  },
  headerSidebar: {},
  backHomeBtn: {
    width: 170,
    display: 'flex',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    backgroundColor: '#002B7B',
  },
  textHeader: {
    color: '#002B7B',
    fontWeight: '500',
    fontSize: 16,
    marginRight: 8,
  },
  header: {
    width: '100%',
  },
  secondaryHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
    columnGap: 10,
    alignItems: 'center',
  },
  profileHeader: {
    overflow: 'hidden',
    width: 60,
    height: 60,
    backgroundColor: 'grey',
    borderRadius: 35,
  },
  sidebar: {
    width: 210,
    top: 0,
    bottom: 0,
    backgroundColor: '#42B0FF',
    position: 'absolute',
    zIndex: 2, // Sidebar should be on top of the overlay and content
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  mainContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: 16,
    paddingTop: 32,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.35)', // Dim the background
    zIndex: 1, // Overlay should be under the sidebar but over the content
  },
});

export default StukerDashBoardPage;
