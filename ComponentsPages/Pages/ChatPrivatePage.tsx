import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
  Animated,
} from 'react-native';
import BackArrowIcon from '../../public/icon/back-white.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';

import ChatLeft from '../Components/ChatLeft';
import ChatRight from '../Components/ChatRight';
import EmojiIcon from '../../public/icon/emoji-dark-blue.svg';
import PaperPlaneIcon from '../../public/icon/paper-plane-white.svg';

interface PageProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const ChatPrivatePage: React.FC<PageProps> = ({navigation}) => {
  const keyboardOffset = new Animated.Value(0);
  const scrollViewRef = useRef<ScrollView>(null); // Referensi untuk ScrollView

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true}); // Scroll ke bawah
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        Animated.timing(keyboardOffset, {
          toValue: e.endCoordinates.height,
          duration: 300,
          useNativeDriver: false,
        }).start();
        scrollToBottom(); // Pastikan scroll ke bawah saat keyboard muncul
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.timing(keyboardOffset, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Scroll ke bawah saat halaman pertama kali dimuat
  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrowIcon width={32} height={32} />
        </TouchableOpacity>
        <View style={styles.profile}></View>
        <Text style={styles.name}>Agustinus</Text>
      </View>
      <ScrollView
        ref={scrollViewRef} // Sambungkan referensi ke ScrollView
        style={styles.bodyChat}
        onContentSizeChange={scrollToBottom} // Scroll otomatis saat konten berubah
      >
        <ChatLeft content="korem ipsum dolor sit amet consectetur adipisicing elit. Dolorum saepe quos commodi voluptatum placeat! Corrupti ullam labore recusandae assumenda aliquid? Sed nisi ducimus alias illum possimus magni eveniet odio voluptatum?" />
        <ChatRight content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum saepe quos commodi voluptatum placeat! Corrupti ullam labore recusandae assumenda aliquid? Sed nisi ducimus alias illum possimus magni eveniet odio voluptatum?" />
        <ChatRight content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum saepe quos commodi voluptatum placeat! Corrupti ullam labore recusandae assumenda aliquid? Sed nisi ducimus alias illum possimus magni eveniet odio voluptatum?" />
        <ChatRight content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum saepe quos commodi voluptatum placeat! Corrupti ullam labore recusandae assumenda aliquid? Sed nisi ducimus alias illum possimus magni eveniet odio voluptatum?" />
        <ChatRight content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum saepe quos commodi voluptatum placeat! Corrupti ullam labore recusandae assumenda aliquid? Sed nisi ducimus alias illum possimus magni eveniet odio voluptatum?" />
      </ScrollView>
      <Animated.View
        style={[
          styles.messageInputContainer,
          {transform: [{translateY: Animated.multiply(keyboardOffset, 0)}]},
        ]}>
        <TextInput style={styles.input} placeholder="Ketik Pesan" />
        <TouchableOpacity>
          <EmojiIcon width={28} height={28} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => {
            scrollToBottom(); // Pastikan scroll saat tombol kirim ditekan
          }}>
          <PaperPlaneIcon width={24} height={24} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 18,
    marginLeft: 20,
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#002B7B',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    height: 60,
    borderTopColor: '#002B7B',
    borderWidth: 0.7,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  bodyChat: {
    flex: 1,
    marginBottom: 60, // Agar ScrollView tidak tertutup input
  },
  header: {
    height: 80,
    backgroundColor: '#002B7B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  profile: {
    width: 44,
    height: 44,
    backgroundColor: 'grey',
    borderRadius: 22,
    marginLeft: 10,
  },
  name: {
    color: 'white',
    fontSize: 20,
    marginBottom: 8,
    marginLeft: 10,
  },
});

export default ChatPrivatePage;
