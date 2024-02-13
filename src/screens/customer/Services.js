import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { commonStyles } from '../../styles/commonStyles'
import { ScrollView } from 'react-native-gesture-handler'
import ServiceContainer from '../../components/customer/services/ServiceContainer'

const CustomerServices = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <ServiceContainer title="Book Bartender" src={require('../../images/customer/services/bartender.png')} navigation={navigation}/>
        <ServiceContainer title="Book DJ Artist" src={require('../../images/customer/services/dj.png')} navigation={navigation}/>
        <ServiceContainer title="Home Helper" src={require('../../images/customer/services/homehelper.png')} navigation={navigation}/>
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