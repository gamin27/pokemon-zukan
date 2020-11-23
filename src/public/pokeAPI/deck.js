/**
 * PokeAPIのajaxのパラメータを作成
 * @param {Number} id pokemon No.
 * @param {String} path first path of poke api(https://pokeapi.co)
 * @param {boolean} fullPath
 * @return {Object} axios param
 */
const deck = (id, path, fullPath = false) => {
  let url = fullPath ? path : `https://pokeapi.co/api/v2/${path}/${id}/`

  return {
    method: 'get',
    url: url,
    mode: 'no-cors',
    header: {
      'content-type': 'application/json utf-8',
    },
  }
}

export { deck }
