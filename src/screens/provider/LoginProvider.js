import React from 'react'
import { View, Text, Image, StyleSheet, TextInput, Pressable } from 'react-native'
import { commonStyles } from '../../styles/commonStyles'
import { fontFamily } from '../../styles/fontStyles'
import { Path, Svg } from 'react-native-svg'
import ButtonSecondary from '../../components/common/ButtonSecondary/ButtonSecondary'
import { SafeAreaView } from 'react-native-safe-area-context'
import { loginProvider } from '../../utils/firebase'

const LoginProvider = ({navigation}) => {
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [error, setError] = React.useState(null);

    const onLoginPress = async () => {
        try {
            const userInfo = await loginProvider(email, password);
            if(userInfo != undefined) {
                navigation.navigate('Provider', {userData: userInfo})
            }
            else {
                setError("User Not Found in Provider Database")
            }
        }
        catch(error) {
            console.error(error)
        }
    }
  return (
    <SafeAreaView style={commonStyles.container}>
        <Image source={require('../../images/customer/login/loginBackground.png')} />
        <View style={styles.loginWrapper}>
            <Text style={[styles.loginHead, fontFamily.poppins600]}>Login as Provider</Text>
            <View style={styles.inputWrapper}>
                <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <Path d="M19 21C19 17.134 15.866 14 12 14C8.13401 14 5 17.134 5 21M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z" stroke="black" stroke-opacity="0.25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </Svg>
                <TextInput value={email} onChangeText={setEmail} placeholder='Enter email' style={styles.input} />
            </View>
            <View style={styles.inputWrapper}>
                <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <Path d="M9.23047 9H7.2002C6.08009 9 5.51962 9 5.0918 9.21799C4.71547 9.40973 4.40973 9.71547 4.21799 10.0918C4 10.5196 4 11.0801 4 12.2002V17.8002C4 18.9203 4 19.4801 4.21799 19.9079C4.40973 20.2842 4.71547 20.5905 5.0918 20.7822C5.5192 21 6.07902 21 7.19694 21H16.8031C17.921 21 18.48 21 18.9074 20.7822C19.2837 20.5905 19.5905 20.2842 19.7822 19.9079C20 19.4805 20 18.9215 20 17.8036V12.1969C20 11.079 20 10.5192 19.7822 10.0918C19.5905 9.71547 19.2837 9.40973 18.9074 9.21799C18.4796 9 17.9203 9 16.8002 9H14.7689M9.23047 9H14.7689M9.23047 9C9.10302 9 9 8.89668 9 8.76923V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V8.76923C15 8.89668 14.8964 9 14.7689 9" stroke="black" stroke-opacity="0.25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </Svg>
                    <TextInput value={password} onChangeText={setPassword} placeholder='Enter password' style={styles.input} />
            </View>
            <ButtonSecondary title="Login" link="/customer/login" onPress={onLoginPress} />
            <View>
                <Pressable onPress={() => {navigation.navigate('SignupProvider')}}>
                    <Text style={[styles.registerText, fontFamily.poppins500]}>Create an account</Text>
                </Pressable>
            </View>
            <Text style={{color: 'red', fontSize: 14}}>{error}</Text>
        </View>
    </SafeAreaView>
  )
}

export default LoginProvider

const styles = StyleSheet.create({
    loginWrapper: {
        width: '90%',
        borderRadius: 10, 
        borderColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
        justifyContent: 'center',
        gap: 20,
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 40
    },
    loginHead: {
        textAlign:'center',
        fontSize: 30
    },
    inputWrapper: {
        flexDirection: 'row',
        width: '90%',
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        gap: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)'
    },
    input: {
        width: '80%',
    },
    forgotText: {
        fontSize: 18,
    },
    registerText: {
        fontSize: 18,
        color: '#EF4F5F'
    }
})