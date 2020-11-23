/**
 * pokemon.jsonから小さい画像のURLを取得
 * GitHub: https://github.com/fanzeyi/pokemon.json
 * @param { Number } id pokemon id
 * @param { String } param 'sprites' or 'images'
 * @returns { Object } pokemon sprites img
 */
const imageConfig = (id, param = 'sprites') => {
  let url = ''
  try {
    if (param == 'sprites') {
      url = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/sprites/${(
        '000' + id
      ).slice(-3)}MS.png`
    } else if (param == 'images') {
      url = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${(
        '000' + id
      ).slice(-3)}.png`
    } else {
      url = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${(
        '000' + id
      ).slice(-3)}.png`
      throw 'param/image.js:getConfig: param error.'
    }
  } catch (err) {
    console.error(err)
  }
  return {
    method: 'get',
    url: url,
    mode: 'no-cors',
    responseType: 'blob',
    header: {
      'Content-Type': 'image/png',
    },
  }
}

export { imageConfig }
