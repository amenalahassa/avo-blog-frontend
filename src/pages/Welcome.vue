<template>
  <div v-if="!loadingArticles">
    <header >
      <div class="content-header">
        <img class="ui large image logo" :src="logo" alt="Logo de Avo">
        <div>
          <p>Le blog du pagne africain.</p>
        </div>
      </div>
    </header>

    <main class="  ">
      <div class="ui container raised segment search-container">
        <div class="ui icon input">
          <input type="text" placeholder="Search by article title..." v-model.trim="searched" v-on:keyup="onSearch" v-on:blur="quiteSearch" v-on:focus="readyForSearch" >
          <i class="search link icon"></i>
        </div>
      </div>
      <div :class="['ui container raised segment', { loading: loadingSearched }]" v-if="articleList.length !== 0">
        <Article
            v-for="(item, index) in articles"
            v-bind:item="item"
            v-bind:index="index"
            v-bind:key="item._id"
        >
          <div class="ui divider" v-if="index !== (articles.length - 1)"></div>
        </Article>
      </div>
      <div class="ui container raised segment" v-if="articleList.length === 0 && searched.length !== 0">
        <div class="ui negative icon message" >
          <i class="frown icon"></i>
          <div class="content">
            <div class="header">
              Not found
            </div>
            <p>We're sorry. No match with this article title</p>
          </div>
        </div>
      </div>
      <div class="ui container raised segment" v-if="articleList.length === 0 && searched.length === 0">
        <div class="ui info message" >
          <div class="header">
            Sorry...
          </div>
          <p>No article is yet published. Come back a bit later.</p>
        </div>
      </div>
      <div class="ui container raised segment" v-if="errorMessage.length !== 0">
        <div class="ui negative icon message">
          <i class="frown icon"></i>
          <div class="content">
            <div class="header">
              Errors
            </div>
            <p>{{ errorMessage }}</p>
          </div>
        </div>
      </div>

    </main>

    <footer class="ui inverted segment center aligned">
      <span class=" font-pacifico">Made by Amen Alahassa.</span> <span class=" font-comfortia">Web Mobile Developer.</span>
    </footer>
  </div>
  <div class="ui segment on-load" v-if="loadingArticles">
    <p></p>
    <div :class="[ 'ui dimmer', {active : loadingArticles}]">
      <div class="ui text loader">Loading</div>
    </div>
  </div>

</template>

<script>

import logo from "../assets/avô.png"
import Article from "@/components/Article";
import axios from "axios";

let url = "http://" + process.env.VUE_APP_SERVER_HOST + "/article"

const instance = axios.create({
  baseURL: url,
});


export default {
  name: "Welcome",
  components:{ Article },
  data() {
    return {
      logo,
      articleList : [],
      searched: "",
      loadingArticles: false,
      loadingSearched: false,
      errorMessage: ""
    }
  },

  mounted() {
    this.loadingArticles = true
    instance.get("")
        .then((res) => {
          if (res.data.status.success)
          {
            // You can use setTimeout to see effect
            // setTimeout(() => {
              for (const article of res.data.data) {
                this.articleList.push(article)
              }
              this.loadingArticles = false
            // }, 5000)
          }
          else {
            this.errorMessage = res.data.status.message
          }
        })
        .catch((err) => {
          this.errorMessage = err
        })
  },

  computed : {
    articles () {
      return this.articleList
    },
  },

  methods : {
    onSearch(){
      this.loadingSearched = true
      if (this.searched.length !== 0)
      {
        this.articleList = this.$tampon.filter((item) => {
          return item.title.toLowerCase().includes(this.searched.toLowerCase())
        })
        this.loadingSearched = false
      }
      else {
        this.articleList = this.$tampon.filter(() => {
          return true
        })
        this.loadingSearched = false
      }
    },
    readyForSearch(){
      this.$tampon = this.articleList.filter(() => {
        return true
      })
    },
  }
}
</script>

<style scoped>

</style>