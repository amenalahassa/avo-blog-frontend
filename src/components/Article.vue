<template>
  <div>
    <div class=" ui two column stackable mobile vertically reversed grid article-item ">
      <div class="ui column article-img" v-if="(index % 2) === 0">
        <p><img class="ui large rounded   image" :src="url + item.img " alt="Article illustration"></p>
      </div>
      <div class="column article-presentation">
        <div class="date">
          <span>{{ showDateInLocal(item.datePub) }}</span>
        </div>
        <h3 class="ui header">
          <div class="content">
            {{ item.title }}
            <div class="sub header"><div class="ui divider"></div></div>
          </div>
        </h3>
        <div class="article-desc">
          {{ item.resume }}
        </div>
        <div>
          <div class="ui labeled button" tabindex="0">
            <div class="ui button btn-like ">
              <i class="heart icon btn-like-icon"></i>
            </div>
            <a class="ui basic label">
              {{ item.like.length }}
            </a>
          </div>
          <router-link :to="{ name: 'ViewArticle', params: { slug: item.slug }}"><div class="ui basic  button">Read</div></router-link>
        </div>
      </div>
      <div class="ui column article-img" v-if="(index % 2) !== 0">
        <p><img class="ui large rounded image" :src="url + item.img " alt="Article illustration"></p>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>

import * as b from '../module/biblio'

export default {
  name: "Article",
  props: {
    item: Object,
    index: Number
  },
  data(){
    return {
      url : "http://" + process.env.VUE_APP_SERVER_HOST,
    }
  },

  methods: {
    showDateInLocal (date)  {
      return b.formatDateInLocal(date.toString())
    }
  }

}
</script>

<style scoped>

</style>