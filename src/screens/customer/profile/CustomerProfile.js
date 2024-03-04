import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { fontFamily } from '../../../styles/fontStyles';
import ButtonSecondary from '../../../components/common/ButtonSecondary/ButtonSecondary';
import { NavigationHelpersContext } from '@react-navigation/native';

const CustomerProfile = ({navigation, userData}) => {
console.log(userData)
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: userData.imageUri}}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.details}>{userData.phone}</Text>
        <Text style={styles.details}>{userData.email}</Text>
        <View style={styles.line}></View>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>Address: {userData.address}</Text>
          <Text style={styles.addressText}>City: {userData.city}</Text>
          <Text style={styles.addressText}>Pincode: {userData.pincode}</Text>
        </View>
        <ButtonSecondary title="Edit Profile" onPress={() => navigation.navigate('EditCustomerProfile')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileContainer: {
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
    elevation: 10,
  },
  imageContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    zIndex: 1
  },
  profileImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 75
  },
  name: {
    ...fontFamily.poppins600,
    fontSize: 26,
    marginTop: 20,
  },
  details: {
    ...fontFamily.poppins400,
    fontSize: 18,
    marginTop: 10,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: 20,
  },
  addressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  addressText: {
    ...fontFamily.poppins400,
    fontSize: 16,
    marginVertical: 5,
  },
});

export default CustomerProfile;
