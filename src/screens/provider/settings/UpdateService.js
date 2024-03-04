import React, { useState } from 'react';
import { View, Text, Modal, Button, TouchableOpacity } from 'react-native';
import { fontFamily } from '../../../styles/fontStyles';
import ButtonSecondary from '../../../components/common/ButtonSecondary/ButtonSecondary';

const UpdateService = () => {
    const [currentService, setService] = useState('Bartender');
    const [modalVisible, setModalVisible] = useState(false);

    const services = ['Bartender', 'DJ Artist', 'Waiter']; // List of available services

    const handleServiceChange = (service) => {
        setService(service);
        setModalVisible(false); // Close the dropdown after selecting a service
    };

    return (
        <View style={{alignItems: 'center', justifyContent: 'center', height: '100%'}}>
            <Text style={[fontFamily.poppins600, {fontSize: 18}]}>Current Service: {currentService}</Text>
            <ButtonSecondary title="Select Service" width={150} height={50} color onPress={() => setModalVisible(true)} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5}}>
                        <Text style={[fontFamily.poppins600, {fontSize: 18, marginBottom: 10}]}>Select Service</Text>
                        {services.map(service => (
                            <TouchableOpacity key={service} onPress={() => handleServiceChange(service)}>
                                <Text style={{marginBottom: 10}}>{service}</Text>
                            </TouchableOpacity>
                        ))}
                        <Button title="Cancel" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default UpdateService;
