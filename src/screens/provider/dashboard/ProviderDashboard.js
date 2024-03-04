import React from 'react';
import { View, Pressable, StyleSheet, Image, Text } from 'react-native';
import { fontFamily } from '../../../styles/fontStyles'; // Importing fontFamily from fontStyles

const ProviderDashboard = ({navigation, userData}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <Pressable style={styles.button} onPress={() => navigation.navigate('PendingBookings', {userData: userData})}>
            <Image
              source={require('../../../images/provider/dashboard/pending.png')}
              style={styles.image}
            />
          </Pressable>
          <Text style={[styles.buttonText, fontFamily.poppins400]}>Pending Bookings</Text>
        </View>
        <View>
          <Pressable style={styles.button}>
            <Image
              source={require('../../../images/provider/dashboard/confirm.png')}
              style={styles.image}
            />
          </Pressable>
          <Text style={[styles.buttonText, fontFamily.poppins400]}>Confirmed Bookings</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Pressable style={styles.button} onPress={() => navigation.navigate('CompletedBookings')}>
            <Image
              source={require('../../../images/provider/dashboard/completed.png')}
              style={styles.image}
            />
          </Pressable>
          <Text style={[styles.buttonText, fontFamily.poppins400]}>Completed Bookings</Text>
        </View>
        <View>
          <Pressable style={styles.button}>
            <Image
              source={require('../../../images/provider/dashboard/cancel.png')}
              style={styles.image}
            />
          </Pressable>
          <Text style={[styles.buttonText, fontFamily.poppins400]}>Cancelled Bookings</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    width: 150,
    height: 150,
    margin: 12,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
    borderRadius: 10,
  },
  buttonText: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
    color: '#EF4F5F'
  },
});

export default ProviderDashboard;
