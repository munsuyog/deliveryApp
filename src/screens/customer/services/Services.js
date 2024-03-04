import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { commonStyles } from '../../../styles/commonStyles'
import { ScrollView } from 'react-native-gesture-handler'
import ServiceContainer from '../services/ServiceContainer'

const CustomerServices = ({navigation, userData}) => {
  console.log(userData)
  return (
    <ScrollView>
      <View style={styles.container}>
        <ServiceContainer title="Book Bartender" src={require('../../../images/customer/services/bartender.png')} navigation={navigation} service="bartender" userData={userData}/>
        <ServiceContainer title="Book DJ Artist" src={require('../../../images/customer/services/dj.png')} navigation={navigation} service="dj-artist" userData={userData} />
        <ServiceContainer title="Home Helper" src={require('../../../images/customer/services/homehelper.png')} navigation={navigation} service="home-helper" userData={userData} />
      </View>
    </ScrollView>
  )
}

export default CustomerServices

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  }
})