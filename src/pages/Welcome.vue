<template>
  <header >
    <div class="content-header">
      <img class="ui large image logo" :src="logo" alt="Logo de Avo">
      <div>
        <p>Le blog du pagne africain.</p>
      </div>
    </div>
  </header>

  <main class=" ui  container raised segment ">
    <Article
        v-for="(item, index) in articles"
        v-bind:item="item"
        v-bind:index="index"
        v-bind:key="item._id"
    >
      <div class="ui divider" v-if="index !== (articles.length -1)"></div>
    </Article>
  </main>

  <footer class="ui inverted segment center aligned">
    <span class=" font-pacifico">Made by Amen Alahassa.</span> <span class=" font-comfortia">Web Mobile Developer.</span>
  </footer>

</template>

<script>

import logo from "../assets/avô.png"
import Articles from "@/models/ArticlesStores";
import Article from "@/components/Article";

export default {
  name: "Welcome",
  components:{ Article },
  data() {
    return {
      logo,
      articleList : [],
      loading: true
    }
  },

  mounted() {
    Articles.getAll(this.articleList, (err) => {
      console.log(err)
    })
  },


  computed : {
    articles () {
      return this.articleList
    }
  }
}
</script>

<style scoped>

</style>