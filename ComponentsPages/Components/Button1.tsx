import React from 'react';
import {SafeAreaView, Button, TouchableOpacity, Text} from 'react-native';
import {ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

interface ButtonProps {
  content: any;
  navigation: StackNavigationProp<ParamListBase>;
  targetScreen: string;
  fw:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  heightProps: number;
}

const Button1: React.FC<ButtonProps> = ({
  content,
  navigation,
  targetScreen,
  fw,
  heightProps,
}) => {
  return (
    <SafeAreaView
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      }}>
      <TouchableOpacity
        style={{
          width: '100%',
          backgroundColor: '#002B7B',
          borderRadius: 44,
          height: heightProps,
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
        onPress={() => navigation.navigate(targetScreen)}>
        <Text
          style={{
            color: 'white',
            fontWeight: fw,
            fontFamily: 'Roboto',
            fontSize: 18,
          }}>
          {content}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Button1;
