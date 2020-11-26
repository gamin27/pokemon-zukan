<template>
  <div class="zukan-detail">
    <MyAlert :message="alert" :level="altLv" @close="alertClose"></MyAlert>
    <div class="register">
      <button
        @click="storeAction"
        class="btn"
        :class="{ active: isActive, load: isLoad }"
      >
        {{ temotiMess }}
      </button>
    </div>
    <router-link :to="{ name: p_bk }" class="back">もどる</router-link>
    <div class="no">No.{{ pokemon.id }}</div>
    <div v-if="imgShow" class="img" :style="typeColor(dispType(0))">
      <img :src="pokemon.imgURL" :alt="pokemon.name" />
    </div>
    <div v-else class="img" :style="typeColor(dispType(0))">
      <p class="dummy"></p>
    </div>
    <ul class="flex name-type">
      <li>
        <h2>{{ pokemon.name }}</h2>
      </li>
      <li class="type" :style="typeColor(dispType(0))">{{ dispType(0) }}</li>
      <li class="type" :style="typeColor(dispType(1))">{{ dispType(1) }}</li>
    </ul>
    <dl class="stuts">
      <dt>HP</dt>
      <dd class="stut">{{ stats.hp }}</dd>
      <dd id="hp"></dd>
      <dt>こうげき</dt>
      <dd class="stut">{{ stats.attack }}</dd>
      <dd id="atk"></dd>
      <dt>ぼうぎょ</dt>
      <dd class="stut">{{ stats.defense }}</dd>
      <dd id="dfn"></dd>
      <dt>とくこう</dt>
      <dd class="stut">{{ stats.spAttack }}</dd>
      <dd id="spAtk"></dd>
      <dt>とくぼう</dt>
      <dd class="stut">{{ stats.spDefense }}</dd>
      <dd id="spDfn"></dd>
      <dt>すばやさ</dt>
      <dd class="stut">{{ stats.speed }}</dd>
      <dd id="spd"></dd>
    </dl>
    <div class="spacer"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { isEmpty } from 'lodash'
import ProgressBar from 'progressbar.js'
import { getName } from '@/public/pokeAPI/name'
import { getType } from '@/public/pokeAPI/type'
import { getStats } from '@/public/pokeAPI/stats'
import { imageConfig } from '@/public/pokemonJSON/image'
import typeDB from '@/api/type'
import MyAlert from '@/components/MyAlert'
export default {
  props: {
    p_id: Number,
    p_name: String,
    p_types: Array,
    p_spriteURL: String,
    p_bk: String,
  },
  components: { MyAlert },
  data() {
    return {
      pokemon: {
        id: this.p_id,
        name: this.p_name,
        types: this.p_types,
        spriteURL: this.p_sprite,
        imgURL: '',
      },
      stats: {
        hp: null,
        attack: null,
        defense: null,
        spAttack: null,
        spDefense: null,
        speed: null,
      },
      temotiMess: '',
      addMess: 'てもち に くわえる',
      rmMess: 'てもち から はずす',
      loadMess: 'とうろくちゅう...',
      processing: '',
      //flag
      imgShow: false,
      isActive: false,
      isLoad: false,
      // MyAlert
      alert: '',
      altLv: '',
    }
  },
  created() {
    window.scroll(0, 0)
    //complement name
    if (isEmpty(this.pokemon.name) || this.p_name === 'undefined') {
      getName(this.pokemon.id).then((e) => {
        this.pokemon.name = e
      })
    }
    //complement type
    if (isEmpty(this.p_types)) {
      //failed to props
      getType(this.pokemon.id).then((el) => {
        this.pokemon.types = el.types
      })
    }
    //complement sprite
    if (isEmpty(this.p_spriteURL) || this.p_spriteURL === 'undefined') {
      axios(imageConfig(this.pokemon.id)).then((el) => {
        this.pokemon.spriteURL = window.URL.createObjectURL(el.data)
      })
    }
    //get image
    axios(imageConfig(this.pokemon.id, 'images')).then((el) => {
      this.pokemon.imgURL = window.URL.createObjectURL(el.data)
    })
    //get statuses
    getStats(this.pokemon.id).then((el) => {
      this.stats = el
    })
    //check state ids
    if (this.searchId()) {
      this.temotiMess = this.rmMess
      this.isActive = true
    } else {
      this.temotiMess = this.addMess
      this.isActive = false
    }
  },
  mounted() {},
  computed: {
    dispType() {
      return (type) => {
        if (isEmpty(this.pokemon.types)) return '--'
        else return this.pokemon.types[type]
      }
    },
    ids() {
      return this.$store.getters['temoti/ids']
    },
  },
  methods: {
    //push button
    storeAction() {
      if (this.searchId()) {
        //remove from temoti
        this.$store.dispatch('temoti/removePoke', this.pokemon.id)
        this.temotiMess = this.addMess
        this.isActive = false
        this.setAlert('てもち から はずしました。')
      } else {
        //check temoti storage
        if (this.ids.length >= 6) {
          this.setAlert('てもち が いっぱいです。', 'warning')
        } else {
          //wait load
          const id = setInterval(() => {
            if (
              isEmpty(this.pokemon.name) ||
              this.pokemon.name === 'undefined' ||
              isEmpty(this.pokemon.imgURL) ||
              isEmpty(this.pokemon.types) ||
              isEmpty(this.pokemon.spriteURL)
            ) {
              this.isLoad = true
              this.processing = 'とうろくちゅう...'
              this.temotiMess = this.loadMess
            } else {
              //add to temoti
              this.$store.dispatch('temoti/pushPoke', this.pokemon)
              this.temotiMess = this.rmMess
              clearInterval(id)
              this.processing = ''
              this.isActive = true
              this.isLoad = false
              this.setAlert('てもち に いれました。')
            }
          }, 100)
        }
      }
    },
    // check if temoti pokemon is included
    searchId() {
      return this.ids.some((el) => el == this.pokemon.id)
    },
    typeColor(nm) {
      const code = typeDB.nmSearch(nm)
      return isEmpty(code) ? '' : `background: ${typeDB.nmSearch(nm).color};`
    },
    //alert
    alertClose() {
      this.alert = ''
    },
    /**
     * for MyAlert
     * ms: message, lv: importance level ['default' or 'warning']
     */
    setAlert(ms, lv = 'default') {
      this.alert = ms
      this.altLv = lv
    },
  },
  watch: {
    pokemon: {
      handler() {
        this.imgShow = this.pokemon.imgURL
      },
      deep: true,
    },
    stats: {
      handler() {
        //make a graph with progressbar.js
        const param = {
          strokeWidth: 10,
          easing: 'easeInOut',
          duration: 1400,
          color: '#4e4e4e',
          trailColor: '#e4e4e4',
          trailWidth: 1,
          svgStyle: { width: '100px', height: '10px' },
        }
        const hpBar = new ProgressBar.Line(hp, param)
        const atkBar = new ProgressBar.Line(atk, param)
        const dfnBar = new ProgressBar.Line(dfn, param)
        const spAtkBar = new ProgressBar.Line(spAtk, param)
        const spDfnBar = new ProgressBar.Line(spDfn, param)
        const spdBar = new ProgressBar.Line(spd, param)
        hpBar.animate(this.stats.hp / 255)
        atkBar.animate(this.stats.attack / 255)
        dfnBar.animate(this.stats.defense / 255)
        spAtkBar.animate(this.stats.spAttack / 255)
        spDfnBar.animate(this.stats.spDefense / 255)
        spdBar.animate(this.stats.speed / 255)
      },
      deep: true,
    },
  },
}
</script>

<style lang="scss" scoped>
$main: #4e4e4e;
$light: #e4e4e4;
$img: 150px;
.flex {
  display: flex;
  margin-left: -12px;
  li {
    margin-left: 12px;
  }
}
.btn {
  font-family: 'pokemon-font', 'Noto Sans JP';
  font-size: 1.4rem;
  display: block;
  border: 1px solid $main;
  border-radius: 2px;
  padding: 8px 0;
  min-width: 20rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: center;
  text-decoration: none;
  letter-spacing: 0.1em;
  color: $light;
  background: $main;
  transition: all 0.4s;
  &.active {
    background: #fff;
    color: $main;
  }
  &.load {
    border: 0;
    background: $light;
    color: #a40405;
  }
}
.zukan-detail {
  padding: 32px 24px 64px 24px;
  .back {
    display: inline-block;
    background: #e4e4e4;
    padding: 0px 0px;
    border-radius: 2px;
    box-sizing: border-box;
    color: #4e4e4e;
    font-size: 1.4rem;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
  }
  .no {
    margin-top: 16px;
    font-weight: bold;
    font-size: 1.4rem;
  }
  .name-type {
    margin-top: 12px;
    h2 {
      font-weight: bold;
    }
    .type {
      margin-top: 0.4rem;
      border-radius: 6px;
      padding: 1px 3px 4px 5px;
      text-align: center;
      color: #fff;
      font-size: 1.2rem;
      font-weight: bold;
      filter: saturate(70%);
    }
  }

  .img {
    background: #e4e4e4;
    margin-top: 8px;
    border-radius: 2px;
    box-sizing: border-box;
    padding: 8px;
    width: 100%;
    height: $img + 16px;
    img {
      display: block;
      margin: auto;
      width: $img;
      height: $img;
    }

    .dummy {
      background: #e4e4e4;
    }
  }
  .stuts {
    margin-top: 32px;
    display: grid;
    grid-template-columns: 80px 50px 1fr;
    font-size: 1.4rem;
    dt,
    dd {
      padding-top: 8px;
    }
    dd {
      margin-left: 12px;
      &.stut {
        text-align: right;
      }
    }
  }
  .register {
    position: fixed;
    z-index: 1;
    bottom: 32px;
    right: 16px;
    transform: none !important;
  }
  //bar
  #hp,
  #atk,
  #dfn,
  #spAtk,
  #spDfn,
  #spd {
    width: 100%;
    height: 8px;
  }
  .spacer {
    height: 100px;
  }
}

@media screen and (min-width: 800px) {
  $img: 300px;
  .zukan-detail {
    .back {
      padding: 8px;
      font-size: 1.6rem;
      transition: border-radius 0.4s;
    }
    .no {
      font-size: 1.6rem;
    }
    .name-type {
      h2 {
        font-size: 1.8rem;
      }
      .type {
        font-size: 1.6rem;
        padding: 2px 4px 6px 8px;
      }
    }
    .img {
      margin-top: 16px;
      padding: 8px;
      width: 100%;
      height: $img + 16px;
      img {
        width: $img;
        height: $img;
      }
    }
    .stuts {
      font-size: 1.6rem;
      grid-template-columns: 100px 70px 1fr;
    }
  }
}
</style>
