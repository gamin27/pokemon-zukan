import axios from 'axios'
import { deck } from './deck'
import { idCheck } from './methods'

/**
 * get type of Pokemon.
 * @param {Number} id Pokemon No.
 * @returns {Array<String>} { id: types: [type1, type2] }
 */
async function getType(id) {
  const type = []
  //promise.allの方が高速
  try {
    const resUrl = await axios(deck(id, 'pokemon'))
    const resType1 = await axios(deck(id, resUrl.data.types[0].type.url, true))
    type.push(resType1.data.names[0].name)
    if (resUrl.data.types.length == 2) {
      const resType2 = await axios(
        deck(id, resUrl.data.types[1].type.url, true)
      )
      type.push(resType2.data.names[0].name)
    }
  } catch (err) {
    console.error(err)
  }
  return { id: id, types: type }
}

/**
 * get Types<limit, offset>
 * @param {Number} limit
 * @param {Number} offset
 * @returns {Object<Array><Primise>} [{id: xx, types: ["type1","type2"]]
 */
async function getTypes(limit, offset) {
  const ids = []
  try {
    if (!idCheck(limit, offset)) throw 'func/getPokeInfo.js/getTypes Exception'
  } catch (e) {
    console.error(e)
  }
  //取得したいNo.を格納
  for (let i = offset; i < limit + offset; i++) ids.push(i)
  return Promise.all(ids.map((id) => getType(id))).then((res) => {
    const data = []
    for (let i = 0; i < limit; i++) {
      data.push(res[i])
    }
    return Promise.resolve(data)
  })
  // for(let i=0; i<limit; i++) {
  //   await getType(ids[i]).then(res => {
  //     data.push(res)
  //   })
  // }
  // return data
}
getTypes(10, 1)
export { getType, getTypes }
