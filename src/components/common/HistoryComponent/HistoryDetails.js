import React, {useEffect} from 'react'
import { View, Text, StyleSheet, Modal } from 'react-native'
import { fontFamily } from '../../../styles/fontStyles'
import { BackHandler } from 'react-native'

const HistoryDetails = ({ route}) => {
    const {history}= route.params;
  return (
    <View style={styles.container}>
        <View style={styles.detailsContainer}>
            <Text style={[fontFamily.poppins700, styles.detailsTitle]}>Booking Details</Text>
            <View style={styles.details}>
                <Text style={[fontFamily.poppins600, styles.detailsSubtitle]}>Booking Date: </Text>
                <Text style={[fontFamily.poppins500, styles.detailsInfo]}>{history.bookingDate.toLocaleDateString()}</Text>
            </View>
            <View style={styles.details}>
                <Text style={[fontFamily.poppins600, styles.detailsSubtitle]}>Hourly Rate: </Text>
                <Text style={[fontFamily.poppins500, styles.detailsInfo]}>${history.totalRate}</Text>
            </View>
            <View style={styles.details}>
                <Text style={[fontFamily.poppins600, styles.detailsSubtitle]}>Service Charges: </Text>
                <Text style={[fontFamily.poppins500, styles.detailsInfo]}>${history.serviceCharge}</Text>
            </View>
            <View style={styles.details}>
                <Text style={[fontFamily.poppins600, styles.detailsSubtitle]}>Subtotal: </Text>
                <Text style={[fontFamily.poppins500, styles.detailsInfo]}>${history.totalRate + history.serviceCharge}</Text>
            </View>
            <View style={styles.details}>
                <Text style={[fontFamily.poppins600, styles.detailsSubtitle]}>Status: </Text>
                <Text style={[fontFamily.poppins500, styles.detailsInfo]}>{history.status}</Text>
            </View>
        </View>
        <View style={styles.detailsContainer}>
            <Text style={[fontFamily.poppins700, styles.detailsTitle]}>Provider Details</Text>
            <View style={styles.details}>
                <Text style={[fontFamily.poppins600, styles.detailsSubtitle]}>Name: </Text>
                <Text style={[fontFamily.poppins500, styles.detailsInfo]}>{history.providerDetails.data.name}</Text>
            </View>
            <View style={styles.details}>
                <Text style={[fontFamily.poppins600, styles.detailsSubtitle]}>Address: </Text>
                <Text style={[fontFamily.poppins500, styles.detailsInfo]}>{history.providerDetails.data.address}</Text>
            </View>
            <View style={styles.details}>
                <Text style={[fontFamily.poppins600, styles.detailsSubtitle]}>Service: </Text>
                <Text style={[fontFamily.poppins500, styles.detailsInfo]}>{history.providerDetails.data.service}</Text>
            </View>
        </View>
        <View style={styles.detailsContainer}>
            <Text style={[fontFamily.poppins700, styles.detailsTitle]}>Customer Details</Text>
            <View style={styles.details}>
                <Text style={[fontFamily.poppins600, styles.detailsSubtitle]}>Name: </Text>
                <Text style={[fontFamily.poppins500, styles.detailsInfo]}>{history.customerName}</Text>
            </View>
            <View style={styles.details}>
                <Text style={[fontFamily.poppins600, styles.detailsSubtitle]}>Address: </Text>
                <Text style={[fontFamily.poppins500, styles.detailsInfo]}>{history.address}</Text>
            </View>
        </View>
    </View>
  )
}

export default HistoryDetails

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        padding: 10,
        gap: 20
    },
    detailsTitle: {
        fontSize: 20,
        color: '#EF4F5F'
    },
    detailsContainer: {
        borderRadius: 10,
        elevation: 10,
        backgroundColor : 'white',
        width: '100%',
        padding: 20
    },
    detailsSubtitle: {
        fontSize: 18
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 30
    },
    detailsInfo: {
        fontSize: 16,
        opacity: 0.7
    }
})