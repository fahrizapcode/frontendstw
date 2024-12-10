import React from 'react';
import {View, Text} from 'react-native';
interface PageProps {
  content: string;
}

const NotificationItem: React.FC<PageProps> = ({content}) => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#42B0FF',
        borderRadius: 16,
        marginBottom: 10,
        padding: 10,
      }}>
      <Text style={{color: '#002B7B', fontSize: 16}}>{content}</Text>
    </View>
  );
};

export default NotificationItem;
