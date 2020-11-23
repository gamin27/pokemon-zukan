/**
 * check the integrity of Pokemon id
 * @param {Number} limit
 * @param {Number} offset
 * @returns {boolean} OK: true, NG: false
 */
const idCheck = (limit, offset) => {
  return limit <= 0 || offset < 0 ? false : true
}

export { idCheck }
