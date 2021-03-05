const colors = {
  fire: '#F7786B',
  water: '#77C4FE',
  poison: '#7C538C',
  grass: '#4FC1A6',
  electric: '#FFCE4B',
  rock: '#B1736C',
  dark: '#565669',
  flying: '#cdcde6',
  dragon: '#f7af5a',
  bug: '#92df68',
  ground: '#be7447',
  psychic: '#405483',
  fighting: '#a2a29b',
  ghost: '#9473b4',
  ice: '#a4def6',
};

const PokemonUtil = {
  getColor: (types) => {
    const type = types[0].type.name;
    return colors[type] || '#c5c5c5';
  },

  capitalizeFirstLetter: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
};

export default PokemonUtil;
