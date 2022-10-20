import { useRef, useCallback, useState, useEffect, type FC, ReactElement } from "react";
import { useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Icon, ArrowUpIcon } from "evergreen-ui";
import { ReduxState, MapState } from "../models";
import { useFectchPokemons } from "../hooks";
import { AutoCompleteField, PokemonCard } from "../components";
import { images } from "../url";

type HomePage = {
  isShiny: ReduxState["isShiny"];
}

const mapStateToProps: MapState<HomePage> = (state) => ({
    isShiny: state.isShiny,
});

type Props = HomePage;

const HomePage: FC<Props> = ({
  isShiny,
}): ReactElement => {
  const [showScrollToTopBtn, setShowScrollToTopBtn] = useState<boolean>(false);
  const {
    allPokemonsName,
    pokemons,
    isLoading,
    hasMore,
    limitPokemons: limit,
    handleOffset,
    toast,
} = useFectchPokemons();
  const navigate = useNavigate();
  const skeletonBoxes = new Array(limit).fill("");
  let noOfCalls = 0;

  const handleClick = (url: string) => {
    const id = url.split("/").map((item) => Number(item)).filter((item) => item);
    if (typeof id[0] === "number") {
      navigate(`/${id[0]}`);
    } else {
      toast.warn("it was impossible to get close to the pokemon")
    }
  };

  /**
   * When total matches with number of calls, displays all images that already were rendered by browser.
   * 
   * @param total represents the number of pokemons that should be displayed
   * @param f count every time an image of pokemon is rendered by browser
   * @returns 
   */
  const countNuberOfPokemons = useCallback((total: number, callback: () => void) => {
    return () => {
      noOfCalls = noOfCalls + 1;
      console.log("noOfCalls: ", noOfCalls);
      if (total === noOfCalls) {
        callback();
      }
    };
  }, []);

  /**
   * ensures that, images are going to be visible when all images are full loaded 
   * 
   */
  const onLoad = countNuberOfPokemons((pokemons.length), () => {
    document.querySelectorAll(".pokemons-wrapper").forEach((item: any) => {
      item.style.opacity = "1";
    })
  });

  const observer = useRef<any>(null);
  const listInnerRef = useCallback((node: HTMLImageElement) => {
    if (isLoading) return;
    if (observer.current) observer.current?.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        handleOffset()
      }
    })
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  const scrollToTop = useCallback(() => {
    if (window.scrollY > 400) {
      setShowScrollToTopBtn(true);
    } else {
      setShowScrollToTopBtn(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollToTop);

    return () => {
      window.removeEventListener("scroll" , scrollToTop);
    };
  }, []);

  return (
    <div className="cards-display details-off">
      <AutoCompleteField
        handleClick={(value: string) => handleClick(value)}
        values={allPokemonsName}
      />
      <ul className="pokemons-cards-container">
        {pokemons.length > 0 && pokemons.map((pokemon, index) => {
          if (pokemons.length === index + 1) {
            return (
              <div key={pokemon.id} style={{ opacity: "0" }} className="pokemons-wrapper">
                <div className="pokemon-details">
                  <Link to={`/${pokemon.id}`}>
                    <img
                      ref={listInnerRef}
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
                      <p id="pokemon-card-weight">{`Weight :${(pokemon.weight * 0.1).toFixed()}kg`}</p>
                      <p id="pokemon-card-price">{`Price: $${(pokemon.height * 0.1).toFixed()}`}</p>
                      <p id="pokemon-card-price">{`Price: $${pokemon?.price ?? 1}`}</p>
                    </div>
                  </Link>
                </div>
              </div>
            )
          } else {
            return (<PokemonCard styles={{ opacity: "0" }} key={index} pokemon={pokemon} onLoad={onLoad} isShiny={isShiny} />)
          }
        })}
        {isLoading && skeletonBoxes.map((skeleton, index) => <div key={index} className="pokemons-wrapper skeleton-loader" />)}
      </ul>
      {showScrollToTopBtn && (
      <button
        onClick={() => {
          window.scrollTo({top: 0, left: 0, behavior: "smooth"});
        }}
        className="scroll-button"
      >
        <Icon icon={ArrowUpIcon} size={15} />
      </button>
      )}
    </div>
  );
};

export default connect(mapStateToProps)(HomePage);
