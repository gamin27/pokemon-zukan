export default {
  method: 'get',
  url:
    'https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json',
  mode: 'no-cors',
  header: {
    'content-type': 'application/json utf-8',
  },
}
