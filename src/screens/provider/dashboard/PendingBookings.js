import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import PendingBooking from '../../../components/provider/Dashboard/Booking';
import { getOrdersByStatusAndUser } from '../../../utils/firebase';

const PendingBookings = ({ navigation, route }) => {
    const { userData } = route.params;
    const [pendingBookings, setPendingBookings] = useState([]);

    useEffect(() => {
        const fetchPendingBookings = async () => {
            try {
                const pendingBookingsData = await getOrdersByStatusAndUser(userData.id);
                setPendingBookings(pendingBookingsData);
            } catch (error) {
                console.error('Error fetching pending bookings:', error);
            }
        };

        fetchPendingBookings();

        // Cleanup function
        return () => {
            // Cleanup code if needed
        };
    }, []);

    const acceptBooking = () => {
        console.log("Accept clicked");
    };

    return (
        <View>
            {pendingBookings && Object.values(pendingBookings).some((orders) => Object.keys(orders).length > 0) ? (
                Object.values(pendingBookings).map((orders) => (
                    Object.values(orders).map((booking, index) => (
                        <PendingBooking
                            key={index}
                            history={booking}
                            navigation={navigation}
                            actionBtn={acceptBooking}
                            actionBtnTitle="Accept"
                        />
                    ))
                ))
            ) : (
                <Text>No pending bookings found.</Text>
            )}
        </View>
    );
};

export default PendingBookings;
