import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../Styles/style.js';

export default function CurrentWeather({ cityData }) {

    const weatherIcon = cityData.list && (
      <Image
        source={{ uri: `http://openweathermap.org/img/w/${cityData.list[0].weather[0].icon}.png` }}
        style={{ width: 100, height: 100 }}
      />
    );

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
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 20}}>
            {weatherIcon}
            <Text style={{fontSize: 40, fontWeight: 'bold', color: "white", textAlign: 'center'}}>
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
