import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, Pressable, Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavouriteContext } from './FavouriteContext';

export const Details = props => {
    let pokemonName = props?.currPokemon?.name || "empty";
    const {myFavPokemon, setMyFavPokemon} = React.useContext(FavouriteContext);

return <Modal
        animationType= 'slide'
        transparent={true}
        visible={props.isModalVisible}
        >
        <View style= {styles.modalView}>
            <View style={styles.pokecard}>
                <Text style={{fontSize: 20, marginBottom: 5}}>{pokemonName}</Text>
                <Image
                style={{ width: 150, height: 100 }}
                source={{
                    uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemonName}.png`,
                }}
                />
            </View>
            <View style={styles.buttonsArea}>
            <TouchableOpacity
                activeOpacity={0.5}
                style ={styles.buttonFav}
                onPress={async () => {
                    try{
                    await AsyncStorage.setItem('@favourite_pokemon', JSON.stringify(props?.currPokemon));
                    setMyFavPokemon(props.currPokemon)
                    console.log("saving");
                    }catch(err){
                        console.log(err);
                    }
                }}>
                    <Text>Set as favorite</Text>
                </TouchableOpacity>

                <TouchableOpacity
                activeOpacity={0.5}
                style ={styles.buttonExit}
                onPress={props.onPress}>
                    <Text>Exit</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
};


const styles = StyleSheet.create({
    modalView: {
      top: '30%',
      backgroundColor: '#FFDFD3',
      height: '20%',
      width: '50%',
      borderRadius: 20,
      alignItems: 'center',
      margin: '25%'
    },
    pokecard: {
        flex: 4,
        width: '80%',
        backgroundColor: '#FEC8D8',
        alignItems: 'center',
        padding: 20
    },
    buttonsArea: {
        flexDirection: 'row',
        flex: 1,

    }, 
    buttonExit: {
        flex: 1,
        backgroundColor: '#D291BC',
        alignItems: 'center',
    }, 
    buttonFav: {
        flex: 1,
        backgroundColor: '#E0BBE4',
        alignItems: 'center',
    }, 
  });