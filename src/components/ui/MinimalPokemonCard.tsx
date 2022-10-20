import { useRef, useEffect, type FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ReduxState } from "../../models";

interface Sprites {
  front_shiny: string;
  front_default: string;
}

interface Pokemon {
  id: number;
  weight: number;
  height: number;
  name: string;
  sprites: Sprites;
}

interface PokemonCardProps {
  isShiny?: ReduxState["isShiny"];
  pokemonDescription?: string;
  pokemon: Pokemon;
  key: string;
  onLoad: (param: string) => void;
}

const MinimalPokemonCard: FC<PokemonCardProps> = ({
  isShiny,
  pokemon,
  pokemonDescription,
  key,
  onLoad,
}): ReactElement => {
  return (
    <div style={{ opacity: "0" }} key={key} className="pokemons-wrapper">
      <div key={pokemon.id} className="pokemon-details">
        <Link to={`/${pokemon.id}`}>
          <img
            loading="lazy"
            alt="pokemon"
            src={isShiny === true ? pokemon.sprites.front_shiny : pokemon.sprites.front_default}
            onLoad={() => onLoad(key)}
            onError={() => onLoad(key)}
          />
          <div className="pokemon-card-info">
            <p id="pokemon-card-id">
              #
              {String(pokemon.id).padStart(4, "0")}
            </p>
            <p id="pokemon-card-name">{pokemon.name}</p>
            <p id="pokemon-card-height">
              {`Height :
                  ${pokemon.height / 10}
                  m
                  `}
            </p>
            <p id="pokemon-card-weight">
              {`Weight :
                  ${(pokemon.weight * 0.1).toFixed()}
                  kg
                  `}
            </p>
          </div>
        </Link>
      </div>
      <p className="pokemon-card-description">
        {pokemonDescription}
      </p>
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({ isShiny: state.isShiny });

export default connect(mapStateToProps, null)(MinimalPokemonCard);
