import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { commonStyles } from '../../styles/commonStyles';
import { fontFamily } from '../../styles/fontStyles';
import { Path, Svg } from 'react-native-svg';
import ButtonSecondary from '../../components/common/ButtonSecondary/ButtonSecondary';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomerSignup } from '../../utils/firebase';
import * as ImagePicker from 'expo-image-picker'

const SignupCustomer = ({ navigation }) => {
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [pincode, setPincode] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [error, setError] = useState(null);

    const [object, setObject] = useState({user: 'Customer'})
    console.log(object)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setImageUri(result.assets[0].uri);
            setObject({...object, imageUri: result.assets[0].uri})
        }
    };

    const onSignupPress = async () => {
        try {
            if(object.name && object.email && object.city && object.phone && object.pincode && object.address && object.imageUri) {
                await CustomerSignup(email, password, object);
                navigation.navigate('Customer')
            }
            else {
                setError("Enter all the details")
            }
        }
        catch(error) {
            if(error.code === 'auth/email-already-in-use') {
                setError("Email already exists! Use another")
            }
        }
    }

    return (
        <SafeAreaView style={commonStyles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Image source={require('../../images/customer/login/loginBackground.png')} />
                <ScrollView contentContainerStyle={styles.signupWrapper}>
                    <Text style={[styles.signupHead, fontFamily.poppins600]}>Sign Up as Customer</Text>
                    <TouchableOpacity onPress={pickImage} style={styles.button}>
                        <Image source={imageUri ? { uri: imageUri } : require('../../images/common/profile.png')} style={styles.image} />
                    </TouchableOpacity>
                    <View style={styles.inputWrapper}>
                        <TextInput value={email} onChangeText={(text) => {setEmail(text); setObject({...object, email: text})}} placeholder='Enter email' style={styles.input} />
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder='Enter password' style={styles.input} />
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput value={name} onChangeText={(text) => {setObject({...object, name: text})}} placeholder='Enter Name' style={styles.input} />
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput value={address} onChangeText={(text) => {setObject({...object, address: text})}} placeholder='Enter address' style={styles.input} />
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput value={city} onChangeText={(text) => {setObject({...object, city: text})}} placeholder='Enter city' style={styles.input} />
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput value={pincode} onChangeText={(text) => {setObject({...object, pincode: text})}} placeholder='Enter pincode' style={styles.input} />
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput value={phoneNumber} onChangeText={(text) => {setObject({...object, phone: text})}} keyboardType='phone-pad' placeholder='Enter phone number' style={styles.input} />
                    </View>
                    <Text style={{color: 'red', fontSize: 14}} >{error}</Text>
                    <View style={{marginTop: 10}}>
                    <ButtonSecondary title="Sign Up" onPress={() => onSignupPress()} />
                    </View>
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignupCustomer;

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupWrapper: {
        width: '100%',
        borderRadius: 10,
        borderColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    signupHead: {
        textAlign: 'center',
        fontSize: 30,
    },
    inputWrapper: {
        flexDirection: 'row',
        width: '90%',
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        marginTop: 10,
    },
    input: {
        flex: 1,
        marginLeft: 10, // Add left margin to create space between icon and text input
    },
    button: {
        width: 100,
        height: 100,
        borderRadius: 50, // half of width and height to make it circular
        backgroundColor: 'lightgray', // Placeholder background color
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // This is important to make border radius work in Android
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 50, // half of width and height to make it circular
    },
});
