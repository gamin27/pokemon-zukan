<template>
  <div class="home">
    <div class="top">
      <div class="wrapper">
        <h1>ポケモン ずかん</h1>
        <div class="pokemon">
          <Jump>
            <img v-show="show" :src="image" alt="top image" />
          </Jump>
        </div>
        <div class="itype-box">
          <div id="text1" class="text"></div>
          <div id="text2" class="text"></div>
        </div>
        <router-link :to="{ name: 'zukan' }" class="to-zukan">
          > ずかん を みる
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { init } from 'ityped'
import { imageConfig } from '@/public/pokemonJSON/image'
import Jump from '@/components/Jump'
export default {
  name: 'Home',
  components: { Jump },
  data() {
    return {
      max: 151,
      image: '',
      show: false,
      isActive: false,
    }
  },
  created() {
    window.scroll(0, 0)
    //get a pokemon image
    axios(imageConfig(Math.floor(Math.random() * (this.max - 1) + 1)))
      .then((res) => {
        this.image = window.URL.createObjectURL(res.data)
        this.show = true
      })
      .catch((er) => {
        console.error(er)
      })
  },
  mounted() {
    typing()
  },
}

async function typing() {
      //iTyped.js
    init(`#text1`, {
      strings: [`おきにいりのパーティをつくって`],
      typeSpeed: 100,
      startDelay: 2000,
      loop: false,
      showCursor: false,
    })
    init(`#text2`, {
      strings: [`ポケモンマスターをめざそう! ▼`],
      typeSpeed: 100,
      startDelay: 4500,
      loop: false,
      showCursor: false,
    })
}
</script>

<style lang="scss" scoped>
$main: #4e4e4e;
.home {
  .to-zukan {
    display: inline-block;
    border-radius: 30px;
    box-sizing: border-box;
    background: $main;
    color: #fff;
    text-decoration: none;
  }
}
//sp
@media screen and (max-width: 800px) {
  .home {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    .wrapper {
      margin: auto;
      min-width: 300px;
    }
    h1 {
      font-weight: bold;
      font-size: 2.4rem;
    }
    .pokemon {
      margin-top: 48px;
      height: 100px;
      img {
        max-width: 100%;
        width: 100px;
        height: 100px;
      }
    }
    .itype-box {
      margin: 0;
      padding: 0 16px;
      min-height: 12rem;

      .text {
        font-size: 1.4rem;
        line-height: 3.6rem;
      }
    }
    .to-zukan {
      margin-top: 16px;
      padding: 8px 16px 12px 16px;
    }
  }
}

@media screen and (min-width: 800px) {
  $pokemon-image: 150px;
  .home {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    h1 {
      font-weight: bold;
      font-size: 4.8rem;
    }
    .pokemon {
      margin-top: 48px;
      height: $pokemon-image;
      img {
        max-width: 100%;
        width: $pokemon-image;
        height: $pokemon-image;
      }
    }
    .itype-box {
      padding: 0 16px;
      min-height: 12rem;
      .text {
        font-size: 2rem;
        line-height: 5.6rem;
      }
    }
    .to-zukan {
      margin-top: 32px;
      padding: 8px 32px 12px 32px;
      font-size: 2.4rem;
    }
  }
}
</style>
