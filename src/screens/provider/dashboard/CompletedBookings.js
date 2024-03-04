import React from 'react'
import { View } from 'react-native'
import HistoryComponent from '../../../components/common/HistoryComponent/HistoryComponent'

const demoData = {
    bookingID: '001',
    bookingDate: '12 Feb 2022',
    bookingTime: '5:00Pm',
    bookingStatus: "Completed",
    service: 'Bartender',
    customerDetails: {
        name: "Customer Name",
        address: "Address",
    },
    providerDetails: {
        name:'John',
        approvalStatus: "Accepted"
    },
    paymentDetails: {
        hourlyRate: 3,
        serviceCharge: 6,
        subTotal: 9,
        isPaid: true
    }
}

const CompletedBookings = ({navigation}) => {
  return (
    <View style={{alignItems: 'center'}}>
        <HistoryComponent history={demoData} onPress={() => navigation.navigate('HistoryDetails', {history: demoData})} />
    </View>
  )
}

export default CompletedBookings