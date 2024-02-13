import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [savedLocations, setSavedLocations] = useState([]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Location permission denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    setUserLocation({ latitude, longitude });
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      
      if (data.length > 0) {
        setNearbyLocations(data);
      } else {
        console.log('No results found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleMapLongPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const newSavedLocation = { latitude, longitude };
    setSavedLocations([newSavedLocation]); // Replace the existing markers with the new one
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          
          if (data.display_name) {
            console.log('Address:', data.display_name);
          } else {
            console.log('No address found for the given coordinates');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
  };
  

  return (
    <View style={{ flex: 1 }}>
      {userLocation && (
        <MapView style={{ flex: 1 }} initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }} onLongPress={handleMapLongPress}>
          <Marker coordinate={userLocation} pinColor="green" />
          {nearbyLocations.map((location, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: parseFloat(location.lat), longitude: parseFloat(location.lon) }}
              onPress={() => handleLocationSelect(location)}
            />
          ))}
          {selectedLocation && (
            <Marker
              coordinate={{ latitude: parseFloat(selectedLocation.lat), longitude: parseFloat(selectedLocation.lon) }}
              pinColor="blue"
            />
          )}
          {savedLocations.map((location, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              pinColor="red"
            />
          ))}
        </MapView>
      )}
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 5 }}
          placeholder="Enter location"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      {nearbyLocations.length > 0 && (
        <FlatList
          data={nearbyLocations}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleLocationSelect(item)}>
              <Text>{item.display_name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default MapScreen;
