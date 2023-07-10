import {StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {FavScreen } from './components/FavScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons } from '@expo/vector-icons';
import PokemonComponent from './components/Pokemons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FavouriteContext } from './components/FavouriteContext';
import {PokemonType } from './@types/pokemonType';

const TabNav = createBottomTabNavigator();

const App = () => {
  const [myFavPokemon, setMyFavPokemon] = useState<PokemonType>(null);

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
