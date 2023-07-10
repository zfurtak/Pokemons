import React, { useState } from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FavouriteContext } from './FavouriteContext';
import {PokemonType } from '../@types/pokemonType';
import { Icon } from '@rneui/base';

type propsType = {
    isModalVisible: boolean;
    onPress: () => void;
    currPokemon: PokemonType;
}

export const Details = (props: propsType) => {
    let pokemonName:string = props?.currPokemon?.name || "empty";
    const [isStarClicked, setIsStarClicked] = useState(false);
    const [isExitClicked, setIsExitClicked] = useState(false);
    const {myFavPokemon, setMyFavPokemon} = React.useContext(FavouriteContext);

return <Modal
        transparent={true}
        visible={props.isModalVisible}
        onRequestClose={() => props.onPress}
        >
        <TouchableWithoutFeedback onPress={props.onPress}>
        <View className='h-full w-full items-center justify-center'>
        <TouchableWithoutFeedback>
        <View className='h-1/4 w-1/2 rounded-xl bg-red-200 justify-center'>
            <View className=' h-2/3 w-full items-center'>
                <Text className='m-2 text-xl font-bold'>{pokemonName}</Text>
                <Image
                style={{ width: 150, height: 100 }}
                source={{
                    uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemonName}.png`,
                }}
                />
            </View>
            <View className='flex-row h-1/4 rounded-b-xl justify-center'>
                <Icon
                    type='simple-line-icon'
                    reverse={isStarClicked}
                    name='star'
                    raised={true}
                    onPress={async () => {
                        try{
                        await AsyncStorage.setItem('@favourite_pokemon', JSON.stringify(props?.currPokemon));
                        setMyFavPokemon(props.currPokemon)
                        }catch(err){
                            console.log(err);
                        }
                    }}
                    onPressIn={()=>setIsStarClicked(true)}
                    onPressOut={()=>setIsStarClicked(false)}
                />

                <Icon
                    type='simple-line-icon'
                    name='close'
                    raised={true}
                    reverse={isExitClicked}
                    onPress={props.onPress}
                    onPressIn={()=>setIsExitClicked(true)}
                    onPressOut={()=>setIsExitClicked(false)}
                />
            </View>
        </View>
        </TouchableWithoutFeedback>       
        </View>
        </TouchableWithoutFeedback>
    </Modal>
};