import axios from 'axios'
import { deck } from './deck'
/**
 * get pokemon statuses
 * @param {String} id pokemon No.
 * @returns {Object} pokemon stats :{ hp, attack, defense, spAttack, spDefense, speed }
 */
async function getStats(id) {
  const stats = {}
  try {
    const { data } = await axios(deck(id, 'pokemon'))
    stats.hp = data.stats[0].base_stat
    stats.attack = data.stats[1].base_stat
    stats.defense = data.stats[2].base_stat
    stats.spAttack = data.stats[3].base_stat
    stats.spDefense = data.stats[4].base_stat
    stats.speed = data.stats[5].base_stat
  } catch (err) {
    console.err(err)
  }
  return stats
}

export { getStats }
