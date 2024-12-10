import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text, TextInputProps} from 'react-native';

interface InputProps {
  icon: React.FC<{width: number; height: number}>;
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
  keyboardType?: TextInputProps['keyboardType'];
}

const Input1: React.FC<InputProps> = ({
  icon: Icon,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
}) => {
  const [isOnFocus, setOnFocus] = useState(false);
  return (
    <View style={{display: 'flex', flexDirection: 'row', marginBottom: 30}}>
      <Icon width={32} height={32} />
      <TextInput
        placeholder={placeholder}
        value={value}
        keyboardType={keyboardType}
        style={[styles.input, isOnFocus && styles.onFocuss]}
        onChangeText={onChangeText}
        onFocus={() => setOnFocus(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '80%',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginLeft: 10,
    padding: 3,
    fontSize: 17,
  },
  onFocuss: {
    borderBottomColor: '#002B7B',
    borderBottomWidth: 1.6,
  },
});

export default Input1;
