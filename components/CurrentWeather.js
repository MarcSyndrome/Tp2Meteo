import React from 'react';
import { View, Text } from 'react-native';
import styles from '../Styles/style.js';

export default function CurrentWeather({ cityData }) {

    // const weatherIconName = cityData.weather[0].icon; // Récupération du nom de l'icône depuis l'API
    // const weatherIcon = <Icon name={iconMap[weatherIconName]} size={100} color="#fff" />; // Création de l'élément d'icône
  
    return (
      <View style={[styles.textCont]}>
        {cityData.list && (
        <>
        <Text style={{fontSize: 28, color: "white"}}>Bienvenue à {cityData.city.name}
        {'\n'}
        </Text>
          <Text style={{fontSize: 20, color: "white"}}>Température actuelle : 
          {'\n'}
          </Text>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{fontSize: 40, fontWeight: 'bold', color: "white"}}>
          {Math.round(cityData?.list[0].main.temp)}°C 
          {'\n'}
          {cityData.list[0].weather[0].description}
          {'\n'}
          
          </Text>
        </View>
        </>
        )}
      </View>
    );
}