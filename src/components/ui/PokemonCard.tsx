import { type FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { ReduxState, Pokemon } from "../../models";
import { images } from "../../url";

type PokemonCardProps = {
  isShiny: ReduxState["isShiny"];
  pokemon: Pokemon;
  onLoad: () => void;
  styles: any;
}

const Card: FC<any> = ({
  isShiny,
  pokemon,
  onLoad,
  styles,
}): ReactElement => {
  
  return (
    <div className="pokemons-wrapper" style={styles}>
      <div className="pokemon-details">
        <Link to={`/${pokemon.id}`}>
          <img
            alt="pokemon"
            src={isShiny === true 
              ? (pokemon.sprites?.front_shiny ?? images.unhandledImage)
              : (pokemon.sprites?.front_default ?? images.unhandledImage)}
            onLoad={onLoad}
            onError={onLoad}
          />
          <div className="pokemon-card-info">
            <p id="pokemon-card-id">{`# ${String(pokemon.id).padStart(4, "0")}`}</p>
            <p id="pokemon-card-name">{pokemon.name}</p>
            <p id="pokemon-card-height">{`Height :${pokemon.height / 10}m`}</p>
            <p id="pokemon-card-weight">{`Weight :${((pokemon.weight ?? 0) * 0.1).toFixed()}kg`}</p>
            <p id="pokemon-card-price">{`Price: $${pokemon?.price ?? 1}`}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export const PokemonCard = Card;