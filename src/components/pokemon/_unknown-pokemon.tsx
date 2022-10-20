const unHandledImage = "https://i.pinimg.com/736x/da/0e/39/da0e39149438dcf48c27ee796be9f5c8--humor-los.jpg";

export const UnkownPokemon = () => {

  return (
    <div className="pokemons-wrapper">
      <div className="pokemon-details" style={{ flexDirection: "row" }}>
        <img
          alt="unkown-pokemon"
          src={unHandledImage}
          style={{
            width: "50%",
            height: "300px",
            objectFit: "contain",
            padding: "50px",
          }}
        />
        <div className="pokemon-card-info"
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}>
          <p id="pokemon-card-id"># 000</p>
          <p id="pokemon-card-name">Unkown</p>
          <p id="pokemon-card-height">Height : ---</p>
          <p id="pokemon-card-weight">Weight : --- kg</p>
        </div>
      </div>
      <p className="pokemon-card-description">Pokemon not found in our POKEDEX</p>
    </div>
  );
}