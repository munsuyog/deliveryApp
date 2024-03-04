import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { fontFamily } from "../../../styles/fontStyles";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import ButtonSecondary from "../../../components/common/ButtonSecondary/ButtonSecondary";
import { createOrder } from "../../../utils/firebase";

const BookingForm = ({ navigation, route }) => {
  const { personInfo, userData } = route.params;

  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [totalHours,setTotalHours] = useState(null)

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [hoursOfWorkPerDay, setHoursOfWorkPerDay] = useState(null);
  const [customerName, setCustomerName] = useState(null);
  const [object, setObject] = useState({status: 'pending', bookingDate: new Date(), providerDetails: personInfo, customerId: userData.id, providerId: personInfo.id });
  console.log(object)

  useEffect(() => {
    navigation.setOptions({
      title: "Book Service",
    });
  }, [navigation]);

  const onChangeFromDate = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setShowFromDatePicker(false);
    setFromDate(currentDate);
    setObject({...object, fromDate: currentDate})

  };

  const onChangeToDate = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setShowToDatePicker(false);
    setToDate(currentDate);
    setObject({...object, toDate: currentDate})
  };

  const showFromDatepickerModal = () => {
    setShowFromDatePicker(true);
  };

  const showToDatepickerModal = () => {
    setShowToDatePicker(true);
  };

  const confirmBooking = async () => {
    if(object.bookingDate && object.city && object.address && object.customerName) {
      try {
        navigation.navigate('HistoryDetails', {history: object, userData: userData })
        await createOrder(object);

      }
      catch(error) {

      }
    }
  }
  useEffect(() => {
    if (fromDate && toDate && hoursOfWorkPerDay !== null && hoursOfWorkPerDay !== '') {
      const daysDifference = Math.floor((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1; // Calculate the number of days
      console.log(daysDifference)
      const totalHoursDiff = daysDifference * parseInt(hoursOfWorkPerDay) == 0 ? 1 : daysDifference * parseInt(hoursOfWorkPerDay); // Multiply days by hours of work per day
      setTotalHours(totalHoursDiff);
      setObject({...object, totalRate: totalHoursDiff * personInfo.data.hourlyRate, serviceCharge:totalHoursDiff * (personInfo.data.hourlyRate * 3 - personInfo.data.hourlyRate)})
    }
  }, [fromDate, toDate, hoursOfWorkPerDay]);
  

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setShowFromDatePicker(false);
        setShowToDatePicker(false);
      }}
    >
      <ScrollView style={{paddingTop: '5%', paddingBottom: '5%', backgroundColor: 'white'}}>
        <View style={styles.container}>
          <View style={styles.dateContainer}>
            <View style={styles.dateTimeContainer}>
              <Text style={fontFamily.poppins400}>From Date: </Text>
              <TouchableWithoutFeedback onPress={showFromDatepickerModal}>
                <View>
                  <Text style={styles.input}>
                    {fromDate.toLocaleDateString()}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              {showFromDatePicker && (
                <RNDateTimePicker
                  value={fromDate}
                  mode="date"
                  display="default"
                  onChange={onChangeFromDate}
                />
              )}
            </View>
            <View style={styles.dateTimeContainer}>
              <Text style={fontFamily.poppins400}>To Date: </Text>
              <TouchableWithoutFeedback onPress={showToDatepickerModal}>
                <View>
                  <Text style={styles.input}>
                    {toDate.toLocaleDateString()}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              {showToDatePicker && (
                <RNDateTimePicker
                  value={toDate}
                  mode="date"
                  display="default"
                  onChange={onChangeToDate}
                />
              )}
            </View>
          </View>
          <View style={styles.formMainContainer}>
          <View style={styles.formContainer}>
              <Text style={styles.formHead}>Hours of work per day: </Text>
              <TextInput
                placeholder="Hours of work per day"
                value={hoursOfWorkPerDay}
                onChangeText={(value) => {setHoursOfWorkPerDay(value); setObject({...object, hoursOfWorkPerDay: value})}}
                keyboardType="numeric"
                style={styles.inputBox}
              />
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.formHead}>Name: </Text>
              <TextInput
                placeholder="Name of the Customer"
                value={customerName}
                onChangeText={(value) => {setCustomerName(value); setObject({...object, customerName: value})}}
                style={styles.inputBox}
              />
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.formHead}>Address of Delivery: </Text>
              <TextInput
                placeholder="Enter the address"
                onChangeText={(value) => {setObject({...object, address: value})}}
                style={styles.inputBox}
              />
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.formHead}>City: </Text>
              <TextInput
                placeholder="Enter City"
                onChangeText={(value) => {setObject({...object, city: value})}}
                style={styles.inputBox}
              />
            </View>
          </View>
          <View>
            <View style={styles.rateWrapper}>
              <Text style={styles.rateText}>Hourly Rate: </Text>
              <Text style={styles.hourlyRate}>${personInfo.data.hourlyRate}</Text>
            </View>
            <View style={styles.rateWrapper}>
              <Text style={styles.rateText}>Total Hours: </Text>
              <Text style={styles.hourlyRate}>{totalHours}</Text>
            </View>
            <View style={styles.rateWrapper}>
              <Text style={styles.rateText}>Total Rate: </Text>
              <Text style={styles.hourlyRate}>${personInfo.data.hourlyRate * totalHours}</Text>
            </View>
            <View style={styles.rateWrapper}>
              <Text style={styles.rateText}>Service Charge: </Text>
              {/* Provider CHarges * 2/3/4 - ProviderCHarges */}
              <Text style={styles.serviceCharge}>
                ${totalHours * (personInfo.data.hourlyRate * 3 - personInfo.data.hourlyRate)}
              </Text>
            </View>
            <View style={styles.rateWrapper}>
              <Text style={styles.rateText}>Subtotal: </Text>
              {/* Provider CHarges * 2/3/4 - ProviderCHarges */}
              <Text style={styles.hourlyRate}>
                $
                {totalHours * (personInfo.data.hourlyRate * 3 -
                  personInfo.data.hourlyRate +
                  personInfo.data.hourlyRate)}
              </Text>
            </View>
          </View>
          <View style={{marginTop: '5%'}}>
          <ButtonSecondary title="Confirm Booking" width={200} height={50} color="#EF4F5F" onPress={confirmBooking} />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default BookingForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins_400Regular",
    width: "100%",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 50,
  },
  dateTimeContainer: {
    flexDirection: "column",
  },
  input: {
    height: 40,
    width: 120,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderColor: "#EF4F5F",
    borderRadius: 10,
  },
  inputBox: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#EF4F5F",
    borderRadius: 10,
  },
  formContainer: {
    width: "90%",
    marginBottom: 15,
  },
  formMainContainer: {
    width: "100%",
    alignItems: "center",
  },
  formHead: {
    fontFamily: "Poppins_400Regular",
  },
  rateWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  rateText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
  },
  hourlyRate: {
    color: "green",
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
  },
  serviceCharge: {
    color: "red",
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
  },
});
