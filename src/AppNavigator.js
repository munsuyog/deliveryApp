import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import LoginCustomer from "./screens/customer/Login";
import CustomerServices from "./screens/customer/services/Services";
import { StyleSheet } from "react-native";
import MapScreen from "./components/customer/test/MapServices";
import TabBar from "./components/common/TabBar/TabBar";
import ServiceInfo from "./screens/customer/services/ServiceInfo";
import ChatScreen from "./screens/customer/messages/ChatScreen";
import BookingForm from "./screens/customer/services/BookingForm";
import YourHistory from "./screens/customer/history/YourHistory";
import HistoryDetails from "./components/common/HistoryComponent/HistoryDetails";
import CustomerProfile from "./screens/customer/profile/CustomerProfile";
import EditCustomerProfile from "./screens/customer/profile/EditCustomerProfile";
import CustomerSettings from "./screens/customer/settings/CustomerSettings";
import CustomerPrivacy from "./screens/customer/settings/CustomerPrivacy";
import LoginProvider from "./screens/provider/LoginProvider";
import ProviderDashboard from "./screens/provider/dashboard/ProviderDashboard";
import PendingBookings from "./screens/provider/dashboard/PendingBookings";
import CompletedBookings from "./screens/provider/dashboard/CompletedBookings";
import Chats from "./screens/provider/chat/Chats";
import ProviderSettings from "./screens/provider/settings/ProviderSettings";
import UpdateService from "./screens/provider/settings/UpdateService";
import SignupCustomer from "./screens/customer/SignUp";
import SignupProvider from "./screens/provider/SignupProvider";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomerServicesStack = ({userData}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CustomerServices"
        options={{
          headerTitle: "Services",
          headerStyle: styles.whiteHeader,
          headerTitleAlign: "center",
          headerTitleStyle: styles.whiteHeaderTitle,
          headerTintColor: "#EF4F5F",
        }}
      >{props => <CustomerServices {...props} userData={userData} />}</Stack.Screen>
      <Stack.Screen
        component={ServiceInfo}
        name="ServiceInfo"
        options={{
          headerTitle: "Provider Details",
          headerStyle: styles.pinkHeader,
          headerTitleAlign: "center",
          headerTitleStyle: styles.pinkHeaderTitle,
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        component={MapScreen}
        name="MapScreen"
        options={{
          headerTitle: "Select Address",
          headerStyle: styles.pinkHeader,
          headerTitleAlign: "center",
          headerTitleStyle: styles.pinkHeaderTitle,
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        component={ChatScreen}
        name="ChatScreen"
        options={{
          headerStyle: styles.pinkHeader,
          headerTitleAlign: "center",
          headerTitleStyle: styles.pinkHeaderTitle,
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        component={BookingForm}
        name="BookingForm"
        options={{
          headerStyle: styles.pinkHeader,
          headerTitleAlign: "center",
          headerTitleStyle: styles.pinkHeaderTitle,
          headerTintColor: "white",
        }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          component={HistoryDetails}
          name="HistoryDetails"
          options={{ headerTitle: "Details" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
const CustomerHistoryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={YourHistory}
        name="YourHistory"
        options={{
          headerTitle: "Your History",
          headerStyle: styles.whiteHeader,
          headerTitleAlign: "center",
          headerTitleStyle: styles.whiteHeaderTitle,
          headerTintColor: "#EF4F5F",
        }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          component={HistoryDetails}
          name="HistoryDetails"
          options={{ headerTitle: "Details" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const CustomerProfileStack = ({ userData }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CustomerProfile"
        options={{
          headerTitle: "Your Profile",
          headerStyle: styles.whiteHeader,
          headerTitleAlign: "center",
          headerTitleStyle: styles.whiteHeaderTitle,
          headerTintColor: "#EF4F5F",
        }}
      >
        {(props) => <CustomerProfile {...props} userData={userData} />}
      </Stack.Screen>
      <Stack.Screen
        component={EditCustomerProfile}
        name="EditCustomerProfile"
        options={{
          headerTitle: "Edit Profile",
          headerStyle: styles.whiteHeader,
          headerTitleAlign: "center",
          headerTitleStyle: styles.whiteHeaderTitle,
          headerTintColor: "#EF4F5F",
        }}
      />
    </Stack.Navigator>
  );
};
const CustomerSettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={CustomerSettings}
        name="CustomerSettings"
        options={{
          headerTitle: "Settings",
          headerStyle: styles.whiteHeader,
          headerTitleAlign: "center",
          headerTitleStyle: styles.whiteHeaderTitle,
          headerTintColor: "#EF4F5F",
        }}
      />
      <Stack.Screen
        component={CustomerPrivacy}
        name="CustomerPrivacy"
        options={{
          headerTitle: "Privacy and Policy",
          headerStyle: styles.whiteHeader,
          headerTitleAlign: "center",
          headerTitleStyle: styles.whiteHeaderTitle,
          headerTintColor: "#EF4F5F",
        }}
      />
    </Stack.Navigator>
  );
};
const CustomerTabs = ({ route }) => {
  const { userData } = route.params;
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="Services"
        options={{ headerShown: false }}
      >{props => <CustomerServicesStack {...props} userData={userData} />}</Tab.Screen>
      <Tab.Screen
        component={CustomerHistoryStack}
        name="History"
        options={{ headerShown: false }}
      ></Tab.Screen>
      <Tab.Screen name="Profile" options={{ headerShown: false }}>
        {(props) => <CustomerProfileStack {...props} userData={userData} />}
      </Tab.Screen>
      <Tab.Screen
        component={CustomerSettingsStack}
        name="Settings"
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const ProviderDashboardStack = ({userData}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProviderDashboard"
        options={{
          headerTitle: "Dashboard",
          headerStyle: styles.whiteHeader,
          headerTitleAlign: "center",
          headerTitleStyle: styles.whiteHeaderTitle,
          headerTintColor: "#EF4F5F",
        }}
      >{props => <ProviderDashboard {...props} userData={userData} />}</Stack.Screen>
      <Stack.Screen
        component={PendingBookings}
        name="PendingBookings"
        options={{
          headerTitle: "Pending Bookings",
          headerStyle: styles.whiteHeader,
          headerTitleAlign: "center",
          headerTitleStyle: styles.whiteHeaderTitle,
          headerTintColor: "#EF4F5F",
        }}
      />
      <Stack.Screen
        component={CompletedBookings}
        name="CompletedBookings"
        options={{
          headerTitle: "Completed Bookings",
          headerStyle: styles.whiteHeader,
          headerTitleAlign: "center",
          headerTitleStyle: styles.whiteHeaderTitle,
          headerTintColor: "#EF4F5F",
        }}
      />
      <Stack.Screen
        component={HistoryDetails}
        name="HistoryDetails"
        options={{
          headerTitle: "Completed Bookings",
          headerStyle: styles.whiteHeader,
          headerTitleAlign: "center",
          headerTitleStyle: styles.whiteHeaderTitle,
          headerTintColor: "#EF4F5F",
        }}
      />
    </Stack.Navigator>
  );
};

const ProviderChatStack = ({userData}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chats"
        options={{
          headerTitle: "Chats",
          headerStyle: styles.whiteHeader,
          headerTitleAlign: "center",
          headerTitleStyle: styles.whiteHeaderTitle,
          headerTintColor: "#EF4F5F",
        }}
      >{props => <Chats {...props} userData={userData} />}</Stack.Screen>
      <Stack.Screen
        component={ChatScreen}
        name="ChatScreen"
        options={{
          headerTitle: "Chat Screen",
          headerStyle: styles.whiteHeader,
          headerTitleAlign: "center",
          headerTitleStyle: styles.whiteHeaderTitle,
          headerTintColor: "#EF4F5F",
        }}
      />
    </Stack.Navigator>
  );
};

const ProviderSettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ProviderSettings}
        name="ProviderSettings"
        options={{
          headerTitle: "Settings",
          headerStyle: styles.whiteHeader,
          headerTitleAlign: "center",
          headerTitleStyle: styles.whiteHeaderTitle,
          headerTintColor: "#EF4F5F",
        }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          component={UpdateService}
          name="UpdateService"
          options={{
            headerTitle: "Update Service",
            headerStyle: styles.whiteHeader,
            headerTitleAlign: "center",
            headerTitleStyle: styles.whiteHeaderTitle,
            headerTintColor: "#EF4F5F",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const ProviderTabs = ({route}) => {
  const {userData} = route.params;
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="ProviderDashboard"
        options={{ headerShown: false }}
      >{props => <ProviderDashboardStack {...props} userData={userData} />}</Tab.Screen>
      <Tab.Screen
        name="ProviderChat"
        options={{ headerShown: false }}
      >{props => <ProviderChatStack {...props} userData={userData} />}</Tab.Screen>
      <Tab.Screen
        name="Profile"
        options={{ headerShown: false }}
      >{ props => <CustomerProfileStack {...props} userData={userData} />}</Tab.Screen>
      <Tab.Screen
        component={ProviderSettingsStack}
        name="Settings"
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={HomeScreen}
          name="HomeScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={CustomerTabs}
          name="Customer"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={LoginCustomer}
          name="LoginCustomer"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={SignupCustomer}
          name="SignupCustomer"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={LoginProvider}
          name="LoginProvider"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={SignupProvider}
          name="SignupProvider"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={ProviderTabs}
          name="Provider"
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  whiteHeader: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  whiteHeaderTitle: {
    color: "#EF4F5F",
    fontFamily: "Poppins_700Bold",
  },
  pinkHeader: {
    backgroundColor: "#EF4F5F",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  pinkHeaderTitle: {
    fontFamily: "Poppins_700Bold",
    color: "white",
  },
});
