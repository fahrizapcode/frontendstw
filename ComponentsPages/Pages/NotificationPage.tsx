import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import TextHeader1 from '../Components/TextHeader1';
import NotificationItem from '../Components/NotificationItem';

const NotificationPage: React.FC = () => {
  return (
    <View style={{padding: 16, paddingTop: 24}}>
      <TextHeader1 content="Notifikasi" />
      <View style={{height: 30}}></View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <NotificationItem content="  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic soluta nulla iure ad sit ex nisi, rem alias? Nihil, consequatur!" />
        <NotificationItem content="  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic soluta nulla iure ad sit ex nisi, rem alias? Nihil, consequatur!" />
        <NotificationItem content="  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic soluta nulla iure ad sit ex nisi, rem alias? Nihil, consequatur!" />
      </ScrollView>
    </View>
  );
};
export default NotificationPage;
