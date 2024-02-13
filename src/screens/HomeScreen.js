import { Image, StyleSheet, Text } from 'react-native';
import { fontFamily } from '../styles/fontStyles';
import { commonStyles } from '../styles/commonStyles';
import ButtonPrimary from '../components/common/ButtonPrimary/ButtonPrimary';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={commonStyles.container}>
      <Image source={require('../images/homeScreen/background.png')} style={styles.backgroundImage} />
        <Text style={[styles.welcomeText, fontFamily.poppins700]}>Welcome</Text>
        <Text style={styles.loginAsText}>Login As: </Text>
        <ButtonPrimary color title="Customer" link="LoginCustomer" navigation={navigation} />
        <ButtonPrimary title="Provider" link="/provider/login" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%', // Adjust this value as needed
    height: '30%', // Adjust this value as needed
    resizeMode: 'cover',
  },
  loginAsText: {
    fontSize: 18,
    color: '#000',
    opacity: 0.5
  },
  welcomeText: {
    fontSize: 30,
  }
});
