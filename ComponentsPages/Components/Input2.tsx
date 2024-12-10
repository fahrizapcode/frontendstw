import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

interface InputProps {
  icon: React.FC<{width: number; height: number}>;
  content: string;
  pcContent: string;
}

const Input2: React.FC<InputProps> = ({icon: Icon, content, pcContent}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 16,
      }}>
      <View
        style={{
          width: 64,
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon width={30} height={30} />
      </View>
      <View style={{borderStartWidth: 1, borderColor: 'grey', padding: 4}}>
        <Text style={{marginTop: 4, marginLeft: 4, fontSize: 12}}>
          {content}
        </Text>
        <TextInput
          placeholder={pcContent}
          placeholderTextColor="black"
          style={styles.input}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 280,
    fontSize: 17,
    height: 38,
  },
  onFocuss: {
    borderBottomColor: '#002B7B',
  },
});

export default Input2;
