import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { fontFamily } from "../../../styles/fontStyles";
import ButtonSecondary from "../../../components/common/ButtonSecondary/ButtonSecondary";

const ServiceInfo = ({ route, navigation }) => {
  const { personInfo, userData } = route.params;
  console.log(userData)
  return (
    <View style={styles.container}>
      <Image style={styles.profileImg} source={{uri: personInfo.data.imageUri}} />
      <View>
        <Text style={[styles.personName, fontFamily.poppins700]}>
          {personInfo.data.name}
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          borderBottomColor: "rgba(0,0,0,0.4)",
          borderBottomWidth: 1,
          width: "90%",
          paddingBottom: 30
        }}
      >
        <Text style={[styles.personAddress, fontFamily.poppins500]}>
          Address: {personInfo.data.address}
        </Text>
        <Text style={[styles.personAddress, fontFamily.poppins500]}>
          City: {personInfo.data.city}
        </Text>
      </View>
      <View style={{flexDirection:'row', justifyContent: 'space-between', width: '90%', alignItems: 'center'}}>
        <Text style={[fontFamily.poppins600, styles.rate]}>Hourly Rate:</Text>
        <Text style={[fontFamily.poppins600, styles.rateNumber]}>${personInfo.data.hourlyRate}</Text>
      </View>
      <View style={{gap: 20}}>
        <ButtonSecondary title="Book Now" onPress={() => navigation.navigate('BookingForm', {personInfo: personInfo, userData: userData})} />
        <ButtonSecondary title="Chat Now" onPress={() => navigation.navigate('ChatScreen', {personInfo: personInfo, userData: userData})} />
      </View>
    </View>
  );
};

export default ServiceInfo;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 30,
    width: "90%",
    height: '70%',
    borderColor: "black",
    borderWidth: 1,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  profileImg: {
    borderRadius: 100,
    width: 150,
    height: 150,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    marginTop: -120,
  },
  personName: {
    fontSize: 20,
  },
  personAddress: {
    fontSize: 16,
  },
  rate: {
    fontSize: 16, 
  },
  rateNumber: {
    color: 'green',
    fontSize: 16
  }
});
