import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { fontFamily } from '../../../styles/fontStyles';
import ButtonSecondary from '../../../components/common/ButtonSecondary/ButtonSecondary';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleSaveProfile = () => {
    // Handle saving profile data
  };

  const handleEditImage = () => {
    // Handle editing profile image
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={handleEditImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Image source={require('../../../images/customer/profile/profile.png')} style={styles.profileImage} />
        )}
        <View style={styles.editImageOverlay}>
          <Text style={styles.editImageText}>Edit Image</Text>
        </View>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <View style={styles.addressContainer}>
        <TextInput
          style={styles.addressInput}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.addressInput}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.addressInput}
          placeholder="Pincode"
          value={pincode}
          onChangeText={setPincode}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.addressInput}
          placeholder="State"
          value={state}
          onChangeText={setState}
        />
      </View>
      <ButtonSecondary width={150} height={50} title="Save Profile" onPress={handleSaveProfile} />
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
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  editImageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  editImageText: {
    color: 'white',
    ...fontFamily.poppins400,
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    marginBottom: 20,
    fontSize: 16,
    ...fontFamily.poppins400,
  },
  addressContainer: {
    width: '100%',
    marginBottom: 20,
  },
  addressInput: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    marginBottom: 10,
    fontSize: 16,
    ...fontFamily.poppins400,
  },
});

export default EditProfile;
