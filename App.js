import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function App() {
  const [actualLocation, setActualLocation] = useState(null);
  const [cityData, setCityData] = useState(null);
  const API_KEY = '63400f21757a4adabdd615af640737f2';

  useEffect(() => {
    const getCoordinations = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      const userActualLocation = await Location.getCurrentPositionAsync();
      setActualLocation(userActualLocation);
    };
    getCoordinations();
  }, []);

  useEffect(() => {
    const getTownFromApi = (lat, lon) => {
      return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=fr&units=metric`)
        .then(response => response.json())
        .then(data => {
          setCityData(data);
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    };

    if (actualLocation) {
      getTownFromApi(actualLocation.coords.latitude, actualLocation.coords.longitude);
    }
  }, [actualLocation]);

  if (!actualLocation || !cityData) {
    return (
      <View style={[styles.textCont]}>
        <Text>Chargement...</Text>
      </View>
    );
  }
  const iconMap = {
    '01d': 'weather-sunny',
    '02d': 'weather-partly-cloudy',
    '03d': 'weather-cloudy',
    '04d': 'weather-cloudy-alert',
    '09d': 'weather-pouring',
    '10d': 'weather-rainy',
    '11d': 'weather-lightning',
    '13d': 'weather-snowy',
    '50d': 'weather-fog',
    '01n': 'weather-night',
    '02n': 'weather-partly-cloudy',
    '03n': 'weather-cloudy',
    '04n': 'weather-cloudy-alert',
    '09n': 'weather-pouring',
    '10n': 'weather-rainy',
    '11n': 'weather-lightning',
    '13n': 'weather-snowy',
    '50n': 'weather-fog',
  };
  
  const weatherIconName = cityData.weather[0].icon; // Récupération du nom de l'icône depuis l'API
  const weatherIcon = <Icon name={iconMap[weatherIconName]} size={100} color="#fff" />; // Création de l'élément d'icône
  
  return (
    <View style={styles.backCont}>
      <ImageBackground source={require('./assets/goutte-deau-156623.jpg')} resizeMode="cover" style={styles.image}>
      <View style={[styles.textCont]}>
        <Text style={{fontSize: 28, color: "white"}}>Bienvenue à {cityData.name}
        {'\n'}
        </Text>
          <Text style={{fontSize: 20, color: "white"}}>Température actuelle : 
          {'\n'}
          </Text>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{fontSize: 40, fontWeight: 'bold', color: "white"}}>
          {Math.round(cityData?.main.temp)}°C 
          {'\n'}
          {cityData.weather[0].description}
          {'\n'}
          {weatherIcon} {/* Affichage de l'icône */}
          </Text>
        </View>
      </View>
      <View style={[styles.weatherCont]}></View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  backCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:150,
  },
  weatherCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
},
});
