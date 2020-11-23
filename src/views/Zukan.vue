<template>
  <div class="zukan">
    <div class="wrapper">
      <ul class="search-box">
        <li>
          <MyInput
            :placeholder="'けんさく'"
            @input.native="handleInput"
          ></MyInput>
        </li>
        <li>
          <button
            class="btn"
            :class="{ active: idBtn }"
            @click="sortOrder('id')"
          >
            No{{ arrow('id') }}
          </button>
        </li>
        <li>
          <button
            class="btn"
            :class="{ active: nameBtn }"
            @click="sortOrder('name')"
          >
            なまえ{{ arrow('name') }}
          </button>
        </li>
        <li>
          <button
            class="btn"
            :class="{ active: typeActive }"
            @click="toggleModal"
          >
            {{ typeButton }}
          </button>
        </li>
      </ul>
    </div>
    <!-- Modal -->
    <div class="example-modal-window">
      <Modal @close="closeModal" v-if="modal">
        <ul class="checkbox">
          <li
            v-for="type in typeList"
            :key="type.id"
            class="item"
            :style="getColor(type)"
          >
            <label :for="type.id">
              <input
                type="checkbox"
                :id="type.id"
                :value="type.name"
                v-model="typeChecked"
              />
              {{ type.name }}
            </label>
          </li>
        </ul>
        <div class="footer">
          <button class="btn" @click="clearChecked">クリア</button>
        </div>
      </Modal>
    </div>
    <div class="pc-spacer"></div>
    <div class="main">
      <div v-if="!listShow" class="load">よみこみ　ちゅう...</div>
      <div v-else>
        <Cards :items="items" :imgShow="imgShow" :typesShow="typesShow"></Cards>
      </div>
    </div>
    <div class="spacer"></div>
  </div>
</template>

<script>
import { orderBy, isEmpty } from 'lodash'
import moji from 'moji'
import axios from 'axios'
import deck from '@/public/pokemonJSON/deck'
import { imageConfig } from '@/public/pokemonJSON/image'
import { getNames } from '@/public/pokeAPI/name'
import { getType, getTypes } from '@/public/pokeAPI/type'
import typeList from '@/api/type'
import Modal from '@/components/Modal'
import Cards from '@/components/Cards'
import MyInput from '@/components/MyInput'
export default {
  components: { Modal, Cards, MyInput },
  name: 'Zukan',
  data() {
    return {
      tail: 151, //functional restriction now
      wd: '',
      order: false,
      std: 'id',

      //poekemon
      list: [],

      //v-if flag
      listShow: false,
      typesShow: false,
      imgShow: false,

      //Modal
      modal: false,
      typeButton: 'タイプ',
      typeChecked: [],

      //btn
      idBtn: true,
      nameBtn: false,
    }
  },
  created() {
    window.scroll(0, 0),
      //1.get text of pokemon zukan
      axios(deck).then((res) => {
        res.data.slice(0, this.tail).forEach((el, index) => {
          this.list.push({
            id: el.id,
            name: el.name.japanese,
            types: [],
            spriteURL: '',
          })
        })
        this.listShow = true
        //2.a get types of pokemon
        getTypes(this.tail, 1).then((el) => {
          el.forEach((obj) => {
            const i = this.list.findIndex((el) => el.id == obj.id)
            this.list[i].types = obj.types
          })
          this.typesShow = true
        })
        //2.b get sprites img
        getSpritesData(this.tail).then((res) => {
          res.forEach((url, index) => {
            const i = this.list.findIndex((el) => el.id == index + 1) //現状はasset=1
            this.list[i].spriteURL = url
          })
          this.imgShow = true
        })
      })
  },
  computed: {
    //search name
    filterName() {
      if (this.wd == '') return this.filterType
      else {
        return this.filterType.filter((el) => {
          return (
            moji(el.name).convert('KK', 'HG').toString().includes(this.wd) ||
            el.name.includes(this.wd)
          ) //実名 or よみがな でincludes
        })
      }
    },
    filterType() {
      if (isEmpty(this.typeChecked)) return this.list
      else {
        return this.list.filter((el) => {
          return this.typeChecked.some((type) => {
            if (type == el.types[0]) return true
            else if (el.types.length == 2) {
              if (type == el.types[1]) return true
            }
            return false
          })
        })
      }
    },
    //setting class of type filter
    typeActive() {
      return !isEmpty(this.typeChecked)
    },
    //order by
    items() {
      return orderBy(this.filterName, this.std, this.order ? 'desc' : 'asc')
    },
    //desplay a symbol on botton
    arrow() {
      return (btn) => (this.std == btn ? (!this.order ? '▲' : '▼') : '　')
    },
    typeList() {
      return typeList.fetch()
    },
  },
  methods: {
    //setting sort param
    sortOrder(btn) {
      //setting sort & order
      if (this.std == btn) {
        this.order = !this.order
      } else {
        this.std = btn
        this.order = false
      }
      // setting active-class
      if (btn == 'id') {
        this.idBtn = true
        this.nameBtn = false
      } else {
        this.idBtn = false
        this.nameBtn = true
      }
    },
    //日本語入力未決定でもinputする
    handleInput(event) {
      this.wd = event.target.value
    },
    //clear checked types
    clearChecked() {
      this.typeChecked = []
    },

    //modal
    toggleModal() {
      this.modal = !this.modal
    },
    closeModal() {
      this.modal = false
    },
    //getting type checkbox color
    getColor(type) {
      if (this.typeChecked.includes(type.name)) {
        return `background: ${type.color}; color: #fff;`
      }
    },
  },
}
/**
 * get URL [blob: spriitesimg]
 * @param {Number} limit
 * @returns {Array}
 */
const getSpritesData = (leng) => {
  let urlList = [] //axios module list

  for (let i = 1; i <= leng; i++) urlList.push(imageConfig(i))
  return Promise.all(urlList.map((obj) => axios(obj))).then((res) => {
    const data = []
    for (let i = 0; i < leng; i++) {
      data.push(window.URL.createObjectURL(res[i].data))
    }
    return Promise.resolve(data)
  })
}
</script>

<style lang="scss" scoped>
$main-c: #4e4e4e;
$light-c: #e4e4e4;

.wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  z-index: 20;
}

.btn {
  font-family: 'pokemon-font', 'Noto Sans JP';
  width: 100%;
  font-size: 1.4rem;
  font-weight: bold;
  line-height: 48px;
  display: block;
  border: 0px solid;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  text-align: center;
  // vertical-align: middle;
  text-decoration: none;
  letter-spacing: 0.1em;
  color: $main-c;
  background: $light-c;
  &.active {
    background: $main-c;
    color: #fff;
  }
}
.zukan {
  font-size: 1.6rem;
  .example-modal-window {
    .checkbox {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      .item {
        display: inline-block;
        filter: saturate(70%);
        label {
          width: 100%;
          display: inline-block;
          padding: 1.2rem 0;
          box-sizing: border-box;
          border: 1px dashed $light-c;
          cursor: pointer;
          text-align: center;
          input {
            display: none;
          }
        }
      }
      .is-checked {
        background: $light-c;
      }
    }
    .footer {
      margin-top: 2.4rem;
      .btn {
        margin-left: auto;
        width: 100px;
      }
    }
  }
  .search-box {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    li {
      height: 48px;
      input {
        height: 48px;
      }
    }
  }
  .main {
    padding-bottom: 48px;
    .load {
      padding: 2.4rem;
    }
  }
  .spacer {
    height: 50px;
  }
}

@media screen and (min-width: 800px) {
  $header: 48px;

  .wrapper {
    top: 0;
    left: 200px;
    right: 0;
    height: $header;
    z-index: 2;
    border: 1px solid #e4e4e4;
    background-color: #fff;
    .search-box {
      display: flex;
      justify-content: flex-end;
      .btn {
        width: 100px;
      }
    }
  }
  .pc-spacer {
    height: $header;
  }
}
</style>
