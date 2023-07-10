import React, { useState, useEffect } from 'react';
import {View, Image, TouchableOpacity, StyleSheet, FlatList, Pressable} from 'react-native';
import { Details } from './Details';
import { PokemonType } from '../@types/pokemonType';

const Pokemons = () => {
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string>(null);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [currPokemon, setCurrPokemon] = useState<PokemonType>(null);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = () => {
    fetch(nextPageUrl || 'https://pokeapi.co/api/v2/pokemon?limit=50')
      .then((response) => response.json())
      .then((data) => {
        setPokemons((prevPokemons) => [...prevPokemons, ...data.results]);
        setNextPageUrl(data.next);
      });
  };

  const renderPokemonCard = ({ item }) => {
    return (
      <View className='items-center w-1/2 rounded-3xl mt-6'>
      <TouchableOpacity
      className = 'items-center w-4/5 rounded-2xl items-center bg-pink-200 shadow'
        activeOpacity={0.5}
        onPress={() =>{
          setModalVisible(true);
          setCurrPokemon(item);
        }}
      >
        <Image
          style={{ width: 150, height: 120 }}
          source={{
            uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${item.name}.png`,
          }}
        />
      </TouchableOpacity>
      </View>
    );
  };


  return (
    <View className = 'items-center w-full'>
      <Details 
      isModalVisible = {isModalVisible} 
      onPress={() => setModalVisible(false)}
      currPokemon = {currPokemon}
      />
      <FlatList
        numColumns={2}
        data={pokemons}
        renderItem={renderPokemonCard}
        keyExtractor={(item) => item.name}
        onEndReached={fetchPokemons}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};


export default Pokemons;
