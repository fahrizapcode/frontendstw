import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import RunningPeople from '../../public/icon/running-people.svg';

const HistoryItem = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.locationHistory}>Fst Lantai 4, R 4.11</Text>
        <RunningPeople width={30} height={30} />
      </View>
      <View
        style={[
          styles.innerContainer,
          {backgroundColor: 'transparent', paddingHorizontal: 10},
        ]}>
        <View style={styles.stukerProfile}>
          <View
            style={{
              width: 45,
              height: 45,
              backgroundColor: 'grey',
              borderRadius: 50,
            }}></View>
          <View>
            <Text
              style={{
                marginTop: 2,
                marginLeft: 8,
                fontSize: 16,
                fontWeight: '600',
                color: '#002B7B',
              }}>
              Aliendo Syaraf
            </Text>
            <Text style={{marginLeft: 8, color: '#002B7B'}}>Stuker</Text>
          </View>
        </View>
        <View>
          <Text>16 Sep 2020</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 14,
    borderColor: 'grey',
    height: 128,
    marginTop: 15,
    display: 'flex',
    overflow: 'hidden',
    alignItems: 'center',
  },
  innerContainer: {
    width: '99%',
    backgroundColor: '#42B0FF',
    height: 60,
    borderRadius: 13,
    marginTop: 2,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stukerProfile: {
    display: 'flex',
    flexDirection: 'row',
  },
  locationHistory: {
    width: 100,
    fontSize: 16,
    color: '#002B7B',
    fontWeight: '600',
  },
});
export default HistoryItem;
