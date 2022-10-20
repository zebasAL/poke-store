import { useState, useEffect, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toast';
import { mockPokemonData, mockPokemonSpecies } from '../mockedData';
import api from '../api';
import Card from '../components/Card';
import Divider from '../components/ui/Divider';
import ProgressBar from '../components/ui/ProgressBar';
import maxStat from '../helpers';
import { ReduxState , MapState } from "../models";
import '../styles/pokemonViewStyles.css';

const PokemonDetailsView = ({
  isShiny,
}: { isShiny?: ReduxState["isShiny"] }): ReactElement => {
  const [pokemon, setPokemon] = useState<any>({ ...mockPokemonData });
  const [pokemonSpecie, setPokemonSpecie] = useState({ ...mockPokemonSpecies });
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [pokemonDescription] = pokemonSpecie.flavor_text_entries.filter((specie) => specie.language.name === 'en');

  const getPokemonSpecies = () => {
    if (!id) return;
    api.getPokemonSpecies(id)
      .then((response) => {
        setPokemonSpecie(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getPokemon = () => {
    if (!id) return;
    api.getPokemon(id)
      .then((response) => {
        setPokemon(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        toast.warn('We could not get your pokemon');
      });
  };

  useEffect(() => {
    getPokemon();
    getPokemonSpecies();
  }, []);

  return (
    <div className="pokemon-details-view-container">
      <Card>
        <div style={{ opacity: "0" }} className="pokemons-wrapper">
          <div key={pokemon.id} className="pokemon-details">
            <img
              alt="pokemon"
              src={isShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default}
            />
            <div className="pokemon-card-info">
              <p id="pokemon-card-id">#{String(pokemon.id).padStart(4, "0")}</p>
              <p id="pokemon-card-name">{pokemon.name}</p>
              <p id="pokemon-card-height">{`Height :${pokemon.height / 10}m`}</p>
              <p id="pokemon-card-weight">{`Weight : ${(pokemon.weight * 0.1).toFixed()}kg`}</p>
            </div>
          </div>
          {/* <p className="pokemon-card-description">{pokemonDescription}</p> */}
        </div>
        <Divider label="STATS" />
        <div className="pokemon-card-stats">
          {pokemon.stats.map((stat: any) => (
            <div key={stat.stat.name}>
              <ProgressBar
                percentage={maxStat(stat)}
                progressValue={stat.base_stat}
                label={stat.stat.name.toUpperCase()}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps: MapState = (state) => ({ isShiny: state.isShiny });

export default connect(mapStateToProps, null)(PokemonDetailsView);

