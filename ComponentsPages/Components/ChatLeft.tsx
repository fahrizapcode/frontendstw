import React from 'react';
import {View, Text} from 'react-native';

interface Props {
  content: string;
}

const ChatLeft: React.FC<Props> = ({content}) => {
  return (
    <View
      style={{
        width: '65%',
        backgroundColor: '#c5c7c5',
        padding: 15,
        marginLeft: 10,
        borderTopEndRadius: 20,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        marginTop: 10,
      }}>
      <Text
        style={{
          fontSize: 17,
          color: 'black',
        }}>
        {content}
      </Text>
    </View>
  );
};

export default ChatLeft;
