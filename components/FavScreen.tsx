import React, { useState } from 'react';
import {Text, View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '@rneui/themed';
import { FavouriteContext } from './FavouriteContext';


export const FavScreen = () => {
  const {myFavPokemon, setMyFavPokemon} = React.useContext(FavouriteContext);
  const [isDislikeClicked, setIsDislikeClicked] = useState(false);

  return (
    <View className='items-center h-full'>
    {(myFavPokemon && (
      <View className='mt-36 w-full items-center h-full'>
        <Text className='text-3xl text-center font-bold'>Your favourite pokemon is: {"\n\n\n"} {myFavPokemon.name}</Text>
          <Image
            style={{ width: 300, height: 300 }}
            source={{
                uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${myFavPokemon.name}.png`,
            }}
          />
        <Icon
        type='simple-line-icon'
        name='dislike'
        reverse={isDislikeClicked}
        raised={true}
        onPress={async () => {
          try{
            await AsyncStorage.clear()
            setMyFavPokemon(null);
          }catch(err){
            console.log(err);
          }
          }}
          onPressIn={()=>setIsDislikeClicked(true)}
          onPressOut={()=>setIsDislikeClicked(false)}
        />
      </View>
    )) }
    {!myFavPokemon && (<Text className='text-3xl font-bold mt-60'>Choose your favourite pokemon</Text>)}
      
  </View>
  )};

