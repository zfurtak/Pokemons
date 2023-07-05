import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TabNav = createBottomTabNavigator();

const HomeScreen = ({navigation}) => {
  return <PokemonComponent />;
};
const ProfileScreen = ({navigation, route}) => {
  return <Text>Favourites here</Text>;
};
const MapScreen = ({navigation, route}) => {
  return <Text>Mapka here</Text>;
};



const PokemonComponent = () => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        const jsonData = await response.json();
        setPokemonData(jsonData.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemonData();
  }, []);

  const renderPokemon = ({ item }) => {
    const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/')[6]}.png`;

    return (
      <View style={styles.item}>
        <Image source={{ uri: pokemonImageUrl }} style={{ width: 100, height: 100 }} />
        <Text style={styles.item}>{item.name}</Text>
        {/* <Text style={styles.item}>{item.id}</Text> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemonData}
        renderItem={renderPokemon}
        keyExtractor={(item) => item.name}
        ListFooterComponent={() => (
          <Text style={{ fontSize: 30, textAlign: "center",marginBottom:20,fontWeight:'bold' }}>Thank You</Text>
      )}
      />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <TabNav.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'pokemon-go' : 'pokeball';
            } else if (route.name === 'Favourites') {
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
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <TabNav.Screen name='Favourites' component={ProfileScreen} />
        <TabNav.Screen name='Pokemap' component={MapScreen} />
      </TabNav.Navigator>
    </NavigationContainer>
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
