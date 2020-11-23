<template>
  <div id="app">
    <div class="wrapper">
      <header>
        <div class="title sp-non">ぽけもん ずかん</div>
        <nav>
          <router-link :to="{ name: 'home' }" exact>ほーむ</router-link>
          <router-link :to="{ name: 'zukan' }">ずかん</router-link>
          <router-link :to="{ name: 'temoti' }">てもち</router-link>
        </nav>
      </header>
      <div class="main">
        <router-view />
      </div>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components: { Footer },
  data() {
    return {
      alertMess: 'test',
    }
  },
  methods: {
    alert() {
      return 'test'
    },
  },
  watch: {},
}
</script>

<style lang="scss" scoped>
//COMMON
$main: #4e4e4e;
$light: #e4e4e4;
#app {
  font-size: 1.6rem;
  header {
    nav {
      background: $light;
      a {
        color: $main;
        font-weight: bold;
        transition: all 0.2s;
        &::before {
          content: '　';
        }
      }
      .router-link-active {
        color: #fff;
        background: $main;
        &::before {
          content: '>';
        }
      }
    }
  }
  .main {
    min-height: 100vh;
  }
  .footer {
    position: fixed;
    z-index: 1;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
//SP
@media screen and (max-width: 800px) {
  #app {
    $header-height: 3.2rem; //header height
    .sp-non {
      display: none;
    }
    header {
      //variable
      position: fixed;
      display: block;
      box-sizing: border-box;
      width: 100vw;
      height: $header-height;
      top: 0;
      left: 0;
      z-index: 2;
      nav {
        display: flex;
        justify-content: space-between;
        a {
          display: inline-block;
          box-sizing: border-box;
          width: 33vw;
          line-height: $header-height;
          text-decoration: none;
          text-align: center;
        }
      }
    }
    .main {
      padding-top: $header-height;
    }
  }
}
//PC
@media screen and (min-width: 800px) {
  #app {
    .sp-non {
      display: block;
    }
    a {
      text-decoration: none;
    }
    header {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      border-right: 1px solid $light;
      padding-top: 16px;
      box-sizing: border-box;
      width: 200px;
      .title {
        font-weight: bold;
        padding-left: 16px;
      }
      nav {
        display: block;
        margin-top: 32px;
        width: 100%;
        background: transparent;
        a {
          display: block;
          margin-top: 16px;
          padding: 8px 16px;
          text-align: left;
          transition: background-color 0.2s;
          &:hover {
            background-color: #e4e4e4;
          }
        }
      }
    }
    .main {
      margin-left: 200px;
    }
  }
}
</style>
