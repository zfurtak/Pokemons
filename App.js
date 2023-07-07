import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { FavScreen } from './components/FavScreen';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons } from '@expo/vector-icons';
import PokemonComponent from './components/Pokemons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavouriteContext } from './components/FavouriteContext';

const TabNav = createBottomTabNavigator();

const App = () => {
  const [myFavPokemon, setMyFavPokemon] = useState(null);

  useEffect(()=>{
    getFavouritePokemon();
    console.log("h333")
  }, []);
  
  const getFavouritePokemon = async () => {
    try{
    const jsonValue =  await AsyncStorage.getItem('@favourite_pokemon');
    setMyFavPokemon(jsonValue != null? JSON.parse(jsonValue): null)
    }catch(err){
      console.log(err);
    }
  }

  return (
  <FavouriteContext.Provider value={{myFavPokemon, setMyFavPokemon}} >
    <NavigationContainer>
      <StatusBar style="auto" />
      <TabNav.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'pokemon-go' : 'pokeball';
            } else if (route.name === 'Favourite') {
              iconName = focused ? 'cards-heart' : 'cards-heart-outline';
            }else if (route.name === 'Pokemap') {
              iconName = focused ? 'map-marker' : 'map-marker-outline';
            }
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'black',
        })}>
        <TabNav.Screen
          name="Home"
          component={PokemonComponent}
          options={{title: 'Home'}}
        />
        <TabNav.Screen name='Favourite' component={FavScreen} />
      </TabNav.Navigator>
    </NavigationContainer>
  </FavouriteContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    width: '100%',
    // height: '100%',
    flex: 1,
    backgroundColor: '#ffc0cb',
    alignItems: 'center',
  },
  item: {
    padding: 10,
    fontSize: 25,
    marginTop: 5,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});
