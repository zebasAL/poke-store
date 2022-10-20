export const mockPokemonData = {
  id: 1,
  name: 'bulbasaur',
  stats: [{ base_stat: 45, effort: 0, stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' } },
    { base_stat: 49, effort: 0, stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' } },
    { base_stat: 49, effort: 0, stat: { name: 'defense', url: 'https://pokeapi.co/api/v2/stat/3/' } },
    { base_stat: 65, effort: 1, stat: { name: 'special-attack', url: 'https://pokeapi.co/api/v2/stat/4/' } },
    { base_stat: 65, effort: 0, stat: { name: 'special-defense', url: 'https://pokeapi.co/api/v2/stat/5/' } },
    { base_stat: 45, effort: 0, stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' } }],
  types: [{ slot: 1, type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } }, { slot: 2, type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' } }],
  sprites: {
    front_shiny: 'https://scontent.fqro3-1.fna.fbcdn.net/v/t39.30808-6/277223081_1938373116348165_5040762906904360419_n.jpg?stp=cp0_dst-jpg_e15_q65_s320x320&_nc_cat=104&ccb=1-7&_nc_sid=8024bb&_nc_ohc=9CUYf0vj1tMAX9EYTel&_nc_ht=scontent.fqro3-1.fna&oh=00_AT8UdO4pltqhnHuCCDmXN7cW0-GQt5y7-ilVX7E79gN5Sw&oe=635658BD',
    front_default: 'xxxhttps://scontent.fqro3-1.fna.fbcdn.net/v/t39.30808-6/277223081_1938373116348165_5040762906904360419_n.jpg?stp=cp0_dst-jpg_e15_q65_s320x320&_nc_cat=104&ccb=1-7&_nc_sid=8024bb&_nc_ohc=9CUYf0vj1tMAX9EYTel&_nc_ht=scontent.fqro3-1.fna&oh=00_AT8UdO4pltqhnHuCCDmXN7cW0-GQt5y7-ilVX7E79gN5Sw&oe=635658BDxxx',
  },
};

export const mockPokemonSpecies = {
  flavor_text_entries: [{ flavor_text: '', language: { name: 'en' } }],
};
