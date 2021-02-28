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

    <main class="">
      <div class="ui container raised segment search-container" v-show="errors.length === 0 && displayedArticles.length !== 0">
        <div class="ui icon input">
          <input type="text" placeholder="Search by article title..." v-model.trim="searched" v-on:keyup="onSearch">
          <i class="search link icon"></i>
        </div>
      </div>
      <div class="ui container raised segment" v-if="searching && errors.length === 0">
        <Article
            v-for="(item, index) in findArticles(searched)"
            :item="item"
            :index="index"
            :key="item._id"
        >
          <div class="ui divider" v-if="index !== (findArticles(searched).length - 1)"></div>
        </Article>
        <div class="ui negative icon message" v-if="findArticles(searched).length === 0" >
          <i class="frown icon"></i>
          <div class="content">
            <div class="header">
              Not found
            </div>
            <p>We're sorry. No match with this article title</p>
          </div>
        </div>
      </div>
      <div class="ui container raised segment" v-if="!searching && errors.length === 0">
        <Article
            v-for="(item, index) in displayedArticles"
            :item="item"
            :index="index"
            :key="item._id"
        >
          <div class="ui divider" v-if="index !== (displayedArticles.length - 1)"></div>
        </Article>
        <div class="ui info message" v-if="displayedArticles.length === 0" >
          <div class="header">
            Sorry...
          </div>
          <p>No article is yet published. Come back a bit later.</p>
        </div>
      </div>
      <div class="ui container raised segment" v-if="errors.length !== 0">
        <div class="ui negative icon message">
          <i class="frown icon"></i>
          <div class="content">
            <div class="header">
              Errors
            </div>
            <p>{{ errors }}</p>
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: { Article },
  data() {
    return {
      logo,
      searched: "",
      loadingArticles: false,
      searching: false,
    }
  },

  created() {
    this.loadingArticles = true
    this.loadArticles().then(() => {
      this.loadingArticles = false
    })
  },

  computed : {
    ...mapGetters([
      'displayedArticles',
      'findArticles',
      'errors'
    ])
  },

  methods : {
    ...mapActions({
      loadArticles : 'getArticles',
    }),
    onSearch(){
      this.searching = this.searched.length !== 0;
    }
  }
}

</script>

<style >

body, html, header
{
  padding: 0;
  margin: 0;
}

header, .on-load {
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  text-align: center;
  display: flex;
  flex-direction: column ;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: larger;
  font-family: 'Comfortaa', cursive;
}

body
{
  background-size: cover;
  background-repeat: no-repeat;
  background-image: linear-gradient(45deg, #e37682 15%, #5f4d93 85%);
}


.content-header
{
  width: 500px;
  display: flex !important;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}


img.logo
{
  margin-bottom: 30px;
}

main
{
  background-color: transparent;
  margin: 10px;
}

.article-section
{
  padding: 30px !important;
}

.article-list
{
  padding: 20px;
}


.article-desc
{
  margin-bottom: 20px;
}

.article-img
{
  display: flex !important;
  justify-content: center;
  align-items: center;
  padding: 20px !important;
}

/* Define image heigth in your project to 300px */
.article-img img
{
  max-height: 300px !important;
}

.article-presentation
{
  padding: 40px !important;
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.article-presentation h3
{
  font-family: 'Assistant', sans-serif !important;
  margin-top: 0 !important;
}

.article-presentation .date {
  color: gray;
}

.article-presentation h3 .divider
{
  max-width: 100px !important;
}

footer
{
  margin: 0 !important;
}

.font-comfortia
{
  font-family: 'Comfortaa', cursive;

}

.font-pacifico
{

  font-family: 'Pacifico', cursive;

}

.btn-like {
  padding-left: 1em !important;
  padding-right: 1em !important;
}

.btn-like-icon {
  margin: 0 !important;
}

.search-container {
  padding: 0 !important;
}

.search-container div {
  width: 100%;
}
</style>