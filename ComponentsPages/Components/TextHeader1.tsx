import React from 'react';
import {Text} from 'react-native';

interface TProps {
  content: string;
}

const TextHeader1: React.FC<TProps> = ({content}) => {
  return (
    <Text style={{color: '#002B7B', fontSize: 20, marginVertical: 0}}>
      {content}
    </Text>
  );
};

export default TextHeader1;
