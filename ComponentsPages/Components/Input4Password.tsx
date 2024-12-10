import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

interface InputProps {
  icon: React.FC<{width: number; height: number}>;
  content: string;
  onChangeText: (text: string) => void;
  value: string;
}

const Input4Password: React.FC<InputProps> = ({
  icon: Icon,
  content,
  onChangeText,
  value,
}) => {
  const [isOnFocus, setOnFocus] = useState(false);
  return (
    <View style={{display: 'flex', flexDirection: 'row', marginBottom: 30}}>
      <Icon width={32} height={32} />
      <TextInput
        placeholder={content}
        style={[styles.input, isOnFocus && styles.onFocuss]}
        secureTextEntry={true}
        onFocus={() => setOnFocus(true)}
        onChangeText={onChangeText}
        value={value}
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

export default Input4Password;
