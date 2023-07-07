import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '@rneui/themed';
import { FavouriteContext } from './FavouriteContext';

export const FavScreen = props => {
  const {myFavPokemon, setMyFavPokemon} = React.useContext(FavouriteContext);

  return (
    <View style={styles.screenView}>
    {(myFavPokemon && (
      <View style={styles.pokemonView}>
        <Text style={styles.pokemonName}>Your favourite pokemon is:</Text>
          <Text style={styles.pokemonName}>{myFavPokemon.name}</Text>
          <Image
                  style={{ width: 300, height: 300 }}
                  source={{
                      uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${myFavPokemon.name}.png`,
                  }}
                  />
        <Icon
        type='simple-line-icon'
        name='dislike'
        raised='true'
        onPress={async () => {
          try{
            await AsyncStorage.clear()
            setMyFavPokemon(null);
          }catch(err){
            console.log(err);
          }
          }}
        />
      </View>
    )) }
    {!myFavPokemon && (<Text style={styles.emptyScreen}>Choose your favourite pokemon</Text>)}
      
  </View>
  )};


const styles = StyleSheet.create({
  screenView: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  pokemonView: {
    flex: 9,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    bottom: '10%'
  },
  pokemonName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: '20%'
  },
  emptyScreen: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: '50%'
  },

});
