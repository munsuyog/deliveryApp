import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import ButtonSecondary from '../../../components/common/ButtonSecondary/ButtonSecondary';

const ProviderSettings = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.settingsContainer}>
        <View style={styles.settingItem}>
          <Pressable onPress={() => navigation.navigate('UpdateService')}>
            <Text style={styles.settingText}>Update Service</Text>
          </Pressable>
        </View>
        <View style={{marginTop: 30}}>
            <ButtonSecondary title="Logout" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
  settingsContainer: {
    backgroundColor: 'white',
    width: '90%',
    height: '90%',
    borderRadius: 20,
    elevation: 10,
    padding: 20,
  },
  settingItem: {
    marginVertical: 10,
  },
  settingText: {
    fontSize: 16,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    paddingBottom: 5,
  },
});

export default ProviderSettings;
