const database = [
  { id: 1, color: '#91989F', name: 'ノーマル' },
  { id: 2, color: '#E79B59', name: 'ほのお' },
  { id: 3, color: '#668FD1', name: 'みず' },
  { id: 4, color: '#83BA61', name: 'くさ' },
  { id: 5, color: '#E9D14C', name: 'でんき' },
  { id: 6, color: '#93CDC0', name: 'こおり' },
  { id: 7, color: '#B24268', name: 'かくとう' },
  { id: 8, color: '#9A6AC4', name: 'どく' },
  { id: 9, color: '#C2764A', name: 'じめん' },
  { id: 10, color: '#95A6DA', name: 'ひこう' },
  { id: 11, color: '#DC7175', name: 'エスパー' },
  { id: 12, color: '#9FC03F', name: 'むし' },
  { id: 13, color: '#C1B68C', name: 'いわ' },
  { id: 14, color: '#5A69A8', name: 'ゴースト' },
  { id: 15, color: '#3F6CC0', name: 'ドラゴン' },
  { id: 16, color: '#595465', name: 'あく' },
  { id: 17, color: '#6C8D9E', name: 'はがね' },
  { id: 18, color: '#D68EE3', name: 'フェアリー' },
]

export default {
  fetch() {
    return database
  },
  find(id) {
    return database.find((el) => el.id === id)
  },
  nmSearch(nm) {
    return database.find((el) => el.name === nm)
  },
}
