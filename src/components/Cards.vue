<template>
  <ul class="cards">
    <li v-for="item in items" :key="item.id" class="card">
      <router-link
        :to="{
          name: 'zukan-detail',
          params: {
            id: item.id,
            name: item.name,
            types: item.types,
            sprite: item.spriteURL,
            backPage: pathName(),
          },
        }"
      >
        <div class="no">{{ item.id }}</div>
        <div class="poke-img">
          <p v-if="imgShow"><img :src="item.spriteURL" :alt="item.name" /></p>
          <p v-else class="dummy-box"></p>
        </div>
        <p class="name">{{ item.name }}</p>
        <div v-if="typesShow" class="type">
          <span :style="getColor(item.types[0])">
            {{ item.types[0] }}
          </span>
          <span v-if="item.types[1] != null" :style="getColor(item.types[1])">
            {{ item.types[1] }}
          </span>
        </div>
        <div v-else class="type">--</div>
      </router-link>
    </li>
  </ul>
</template>

<script>
import typeDB from '@/api/type'
export default {
  name: 'Card',
  props: {
    items: Array,
    imgShow: Boolean,
    typesShow: Boolean,
  },
  data() {
    return {}
  },
  methods: {
    //getter a background color of type
    getColor(c) {
      return `background: ${typeDB.nmSearch(c).color};`
    },
    pathName() {
      return this.$router.history.current.name
    },
  },
}
</script>

<style lang="scss" scoped>
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  padding: 0;
  text-align: center;

  .card {
    position: relative;
    box-sizing: border-box;
    border: 1px dashed #d0d0d0;
    a {
      display: block;
      text-decoration: none;
      color: #4e4e4e;
      padding-bottom: 1.6rem;
      .no {
        position: absolute;
        top: 0;
        left: 0;
        padding-top: 2px;
        padding-left: 4px;
        font-size: 1.4rem;
      }
      .poke-img {
        margin: auto;
        text-align: center;
        height: 80px;
        img {
          margin: auto;
          width: 80px;
          height: 80px;
        }
      }
      .dummy-box {
        margin: auto;
        margin-top: 16px;
        width: 80px;
        height: 64px;
        background: #e4e4e4;
      }
      .name {
        font-size: 1.4rem;
      }
      .type {
        margin-top: 0.8rem;
        font-size: 1rem;
        span {
          display: inline-block;
          margin-top: 0.4rem;
          border-radius: 6px;
          padding: 1px 3px 4px 5px;
          text-align: center;
          color: #fff;
          font-weight: bold;
          filter: saturate(70%);
        }
      }
    }
  }
}

@media screen and (min-width: 800px) {
  .cards {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    .card {
      a {
        .no {
          font-size: 1.6rem;
        }
        .name {
          font-size: 1.6rem;
        }
        .type {
          font-size: 1.4rem;
        }
      }
    }
  }
}
@media screen and (min-width: 1200px) {
  .cards {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
}
</style>
