/* eslint-disable no-unused-vars */
import { useState, useEffect, type FC, ReactElement, ReactNode } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { toast } from 'react-toast';
import LoadMoreButton from '../components/ui/LoadMoreButton';
import MinimalPokemonCard from '../components/ui/MinimalPokemonCard';
import AutoCompleteField from '../components/ui/AutoCompleteField';
import api from '../api';
import { ReduxState, ReduxActions, MapState, MapDispatch } from '../models';
import '../styles/homeStyles.css'

interface Home  {
  pokemonsDisplayed: ReduxState["pokemonsDisplayed"];
  defaultdisplayedPokemons: ReduxState["defaultdisplayedPokemons"];
  setPokemonsDisplayed: ReduxActions["setPokemonsDisplayed"];
  setDefaultdisplayedPokemons: ReduxActions["setDefaultdisplayedPokemons"];
};

function after(count: number, f: () => void) {
  let noOfCalls = 0;
  return function() {
    noOfCalls = noOfCalls + 1;
    if (count === noOfCalls) {
      f();
    }
  };
}

const HomePage: FC<Home | any> = ({
  pokemonsDisplayed,
  defaultdisplayedPokemons,
  setPokemonsDisplayed,
  setDefaultdisplayedPokemons,
}): ReactElement => {
  const [numberOfPokemonsDisplayed, setNumberOfPokemonsDisplayed] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const onLoad = after(numberOfPokemonsDisplayed, () => {
    console.log("loaded");
    document.querySelectorAll('.pokemons-wrapper').forEach((item: any) => {
      item.style.opacity = '1';
    })
  });

  const getPokemonDetails = (pokemons: Home["pokemonsDisplayed"]) => {
    Promise.all(pokemons.map((pokemon) => axios.get(`${pokemon.url}`)))
      .then((responses) => {
        let listOfPokemons = [];
        listOfPokemons = (responses.map((response) => response.data));
        setPokemonsDisplayed(listOfPokemons);
        setDefaultdisplayedPokemons(listOfPokemons);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.warn('We could not get your pokemons details');
      });
  };

  const getPokemons = () => {
    api.getPokemons(numberOfPokemonsDisplayed)
      .then((response) => {
        getPokemonDetails(response.data.results);
      })
      .catch(() => {
        toast.warn('We could not get your pokemons');
      });
  };

  /**
   * Gets the searched pokemon
   * @returns {void}
   */
  const handleEnter = () => {
    if (searchValue !== '') {
      setIsLoading(true);
      api.searchPokemon(searchValue)
        .then((response) => {
          setPokemonsDisplayed([response.data]);
          setIsLoading(false);
        })
        .catch(() => {
          toast.error('that pokemon is not in this pokedex go and catch it');
          setIsLoading(false);
        });
    } else {
      setPokemonsDisplayed(defaultdisplayedPokemons);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getPokemons();
  }, [numberOfPokemonsDisplayed]);

  return (
    <div className="cards-display details-off">
      <AutoCompleteField
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleEnter={handleEnter}
      />
      <div className="hidden" />
      <div className="pokemons-cards-container">
        {pokemonsDisplayed.map((pokemon: any) => (
          <MinimalPokemonCard key={pokemon.id} pokemon={pokemon} onLoad={onLoad} />
        ))}
      </div>
      <LoadMoreButton
        handleLoadingButton={
          (() => setNumberOfPokemonsDisplayed(numberOfPokemonsDisplayed + 20))
        }
        isLoading={isLoading}
      />
    </div>
  );
};

const mapStateToProps: MapState = (state) => (
  {
    pokemonsDisplayed: state.pokemonsDisplayed,
    defaultdisplayedPokemons: state.defaultdisplayedPokemons,
  });

const mapDispatchToProps: MapDispatch = (dispatch) => ({
  setPokemonsDisplayed: (values) => dispatch({
    type: 'SET_POKEMONS_DISPLAYED',
    payload: values,
  }),
  setDefaultdisplayedPokemons: (values) => dispatch({
    type: 'SET_DEFAULT_DISPLAYED_POKEMONS',
    payload: values,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
