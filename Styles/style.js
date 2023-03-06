import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  },
  text: {
      fontSize: 18,
      color: 'white',
      paddingLeft: 5,
  },
  forecastContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#154360',
    opacity: 0.8,
    height: 200,
    paddingTop: 20,
  },
  tempContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  heatDeg:{
    flex:1,
    fontSize: 40,
    color: 'yellow',
    fontWeight: 'bold',
  },
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
  icon: {
    width: 50,
    height: 50,
  },
  });

export default styles;