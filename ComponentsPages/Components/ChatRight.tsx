import React from 'react';
import {View, Text} from 'react-native';

interface Props {
  content: string;
}

const ChatRight: React.FC<Props> = ({content}) => {
  return (
    <View
      style={{
        width: '65%',
        backgroundColor: '#002B7B',
        padding: 15,
        marginRight: 10,
        borderTopStartRadius: 20,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        marginTop: 10,
        alignSelf: 'flex-end',
      }}>
      <Text
        style={{
          fontSize: 17,
          color: 'white',
        }}>
        {content}
      </Text>
    </View>
  );
};

export default ChatRight;
