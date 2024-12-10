import React from 'react';
import {Image} from 'react-native';

import store from './ComponentsPages/redux/store';
import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import screen components
import GetStartedPage from './ComponentsPages/Pages/GetStartedPage';
import RegisterPage from './ComponentsPages/Pages/RegisterPage';
import HomePage from './ComponentsPages/Pages/HomePage';
import CreateOrderPage from './ComponentsPages/Pages/CreateOrderPage';
import NotificationPage from './ComponentsPages/Pages/NotificationPage';
import ProfilePage from './ComponentsPages/Pages/ProfilePage';
import SearchingStukerPage from './ComponentsPages/Pages/SearchingStukerPage';
import StukerDashBoardPage from './ComponentsPages/Pages/StukerDashBoardPage';
import OrderDetailInStukerPage from './ComponentsPages/Pages/OrderDetailInStukerPage';
import WaitingOrderPage from './ComponentsPages/Pages/WaitingOrderPage';
import RatingStukerPage from './ComponentsPages/Pages/RatingStukerPage';
import OrderProcessPage from './ComponentsPages/Pages/OrderProcessPage';
import FinishOrderPage from './ComponentsPages/Pages/FinishOrderPage';
import ChatPrivatePage from './ComponentsPages/Pages/ChatPrivatePage';
import LoginPage from './ComponentsPages/Pages/LoginPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
//tes
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconSource;
          if (route.name === 'Home') {
            iconSource = focused
              ? require('./public/image/homePressed.png')
              : require('./public/image/home.png');
          } else if (route.name === 'Profile') {
            iconSource = focused
              ? require('./public/image/userPressed.png')
              : require('./public/image/user.png');
          } else if (route.name === 'Notifications') {
            iconSource = focused
              ? require('./public/image/notificationPressed.png')
              : require('./public/image/notification.png');
          }

          return <Image source={iconSource} style={{width: 40, height: 40}} />;
        },
        tabBarStyle: {
          height: 66,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#002B7B',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationPage}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

// Main App Navigator (Stack Navigator)
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="GetStarted">
          <Stack.Screen
            name="GetStarted"
            component={GetStartedPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChatPrivate"
            component={ChatPrivatePage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WaitingOrder"
            component={WaitingOrderPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OrderDetailInStuker"
            component={OrderDetailInStukerPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FinishOrder"
            component={FinishOrderPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OrderProcess"
            component={OrderProcessPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreateOrder"
            component={CreateOrderPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="StukerDashboard"
            component={StukerDashBoardPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RatingStuker"
            component={RatingStukerPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SearchingStuker"
            component={SearchingStukerPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={RegisterPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Main"
            component={MyTabs}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
