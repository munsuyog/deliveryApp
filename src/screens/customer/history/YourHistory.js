import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import HistoryComponent from '../../../components/common/HistoryComponent/HistoryComponent';
import { fontFamily } from '../../../styles/fontStyles';
import { getOrdersByStatus } from '../../../utils/firebase';

const YourHistory = ({ navigation }) => {
    const [history, setHistory] = useState(null);
    console.log(history)
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const ordersByStatus = await getOrdersByStatus();
                // Assuming ordersByStatus is an object with properties like pending, completed, etc.
                // Concatenate the values of each property into a single array
                const allOrders = Object.values(ordersByStatus).reduce((acc, val) => acc.concat(val), []);
                setHistory(allOrders);
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };

        fetchHistory();
    }, []);

    return (
        <View style={{ alignItems: 'center' }}>
            {history &&
                Object.entries(history).map(([status, orders]) => (
                    <View key={status}>
                        {Object.values(orders).map(order => (
                            <HistoryComponent
                                key={order.bookingID}
                                history={order}
                                onPress={() => navigation.navigate('HistoryDetails', { history: order })}
                            />
                        ))}
                    </View>
                ))}
        </View>
    );
};

export default YourHistory;
