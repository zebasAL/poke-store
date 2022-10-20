/**
   * Gets porcentage value
   * @param {string} stat
   * @returns {number}
   */
const maxStat = (pokemonStat: any) => {
  const statName = pokemonStat.stat.name;
  const value = pokemonStat.base_stat;

  if (statName === 'hp') return ((value * 100) / 255).toFixed();
  if (statName === 'attack') return ((value * 100) / 190).toFixed();
  if (statName === 'defense') return ((value * 100) / 230).toFixed()
  if (statName === 'special-attack') return ((value * 100) / 194).toFixed();
  if (statName === 'special-defense') return ((value * 100) / 230).toFixed();
  if (statName === 'speed') return ((value * 100) / 180).toFixed();
  return "0";
};

export default maxStat;
