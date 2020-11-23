import axios from 'axios'
import { deck } from './deck'
import { idCheck } from './methods'

/**
 * get pokemon name
 * @param id {Number} pokemon No.
 * @return {String} pokemon name
 */
async function getName(id) {
  let name = ''
  const res = await axios(deck(id, 'pokemon-species')).catch((el) => {
    throw 'name.js : getName error'
  })
  return res.data.names[0].name
}

/**
 * get pokemon names (Parallel Processing)
 * @param {Number} limit length to get
 * @param {Number} offset start zukan-No.
 * @returns {Promise.resolve} pokemon-list ex)[{id: 1, name: フシギダネ}]
 */
const getNames = (limit, offset = 1) => {
  let URLlist = []
  try {
    if (!idCheck(limit, offset)) throw 'func/getPokeInfo.js/getNames Exception'
  } catch (e) {
    console.error(e)
  }
  for (let i = offset; i < offset + limit; i++) {
    URLlist.push(deck(i, 'pokemon-species'))
  }
  return Promise.all(URLlist.map((el) => axios(el)))
    .then((res) => {
      let no = offset
      const data = []
      for (let i = 0; i < limit; i++) {
        data.push({ id: no++, name: res[i].data.names[0].name })
      }
      return Promise.resolve(data)
    })
    .catch((err) => console.error(err))
}
export { getName, getNames }
