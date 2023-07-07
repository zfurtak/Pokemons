import React, { useState, useEffect } from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import { Details } from './Details';

const Pokemons = props => {
  const [pokemons, setPokemons] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currPokemon, setCurrPokemon] = useState(null);

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
      <View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.card}
        onPress={() =>{
          setModalVisible(true);
          setCurrPokemon(item);
        }}
      >
        <Image
          style={{ width: 150, height: 150 }}
          source={{
            uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${item.name}.png`,
          }}
        />
      </TouchableOpacity>
      </View>
    );
  };


  return (
    <View style={styles.centeredView}>
      <Details 
      isModalVisible = {isModalVisible} 
      onPress={() => setModalVisible(false)}
      currPokemon = {currPokemon}
      />
      <FlatList
        data={pokemons}
        renderItem={renderPokemonCard}
        keyExtractor={(item) => item.name}
        onEndReached={fetchPokemons}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
      />
    </View>
  );
};


export default Pokemons;


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  separator: {
    borderBottomWidth: 1,
  },
  modalView: {
    top: '30%',
    backgroundColor: 'pink',
    height: '20%',
    width: '50%',
    borderRadius: 20,
    alignItems: 'center',
    margin: '25%'
  }
});