import { SetStateAction,  Dispatch} from 'react';


export type PokemonType = {
    name: string;
    src: string;
}

export type PokemonContextType = {
    myFavPokemon: PokemonType;
    setMyFavPokemon: Dispatch<SetStateAction<PokemonType>>

}