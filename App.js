import React, { useEffect, useState } from 'react';
import { Text, View, ImageBackground, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import styles from './Styles/style.js';
import CurrentWeather from './components/CurrentWeather';
import Forecasts from './components/Forecasts';


export default function App() {
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(true);
  const [cityData, setCityData] = useState(null);
  const API_KEY = '63400f21757a4adabdd615af640737f2';

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);


  useEffect(() => {

    location &&  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}&lang=fr&units=metric`)
        .then(response => response.json())
        .then(data => {
          setCityData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
        });
    

    
  }, [location]);

  if (loading) {
    return (
      <View style={[styles.textCont]}>
        <Text>Chargement...</Text>
      </View>
    );
  }
  
  return (
<>
    {!loading && cityData && (
    <View style={styles.backCont}>
      <ImageBackground source={require('./assets/goutte-deau-156623.jpg')} resizeMode="cover" style={styles.image}>
      <CurrentWeather cityData={cityData} />
        <View style={styles.weatherCont}>
            {cityData && <Forecasts cityData={cityData}/> }
        </View>        
      </ImageBackground>
    </View>
    )}
    </>
);

}