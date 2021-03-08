<template>
    <div v-if="!loadingArticles">
      <header >
        <transition name="fade" appear>
          <div class="content-header">
            <img class="ui large image logo" :src="logo" alt="Logo de Avo">
              <div>
                <p>Le blog du pagne africain.</p>
              </div>
          </div>
        </transition>
      </header>


      <main class="">
        <div class="ui container raised segment search-container" v-show="errorMessage.length === 0 && displayedArticles.length !== 0">
          <div class="ui icon input">
            <input type="text" placeholder="Search by article title..." v-model.trim="searched" v-on:keyup="onSearch">
            <i class="search link icon"></i>
          </div>
        </div>
        <div class="ui container raised segment" v-if="searching && errorMessage.length === 0">
          <transition-group name="flip-list" tag="p" >
            <Article
                v-for="(item, index) in findArticles(searched)"
                :item="item"
                :index="index"
                :key="item._id"
            >
              <div class="ui divider" v-if="index !== (findArticles(searched).length - 1)"></div>
            </Article>
          </transition-group>

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
        <div class="ui container raised segment" v-if="!searching && errorMessage.length === 0">
          <transition-group name="list" tag="p" appear>
            <Article
                v-for="(item, index) in displayedArticles"
                :item="item"
                :index="index"
                :key="item._id"
            >
              <div class="ui divider" v-if="index !== (displayedArticles.length - 1)"></div>
            </Article>
          </transition-group>
          <div class="ui info message" v-if="displayedArticles.length === 0" >
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
import {useStore} from "vuex";
import {ref} from "vue";
import {computed} from "@vue/reactivity";

export default {
  name: "Home",
  components: { Article },

  data() {
    return {
      logo,
      searched: "",
      searching: false,
    }
  },


  setup() {

    const store = useStore()

    let displayedArticles = computed(() => store.getters.displayedArticles)
    let findArticles = computed(() => store.getters.findArticles)
    let errorMessage = computed(() => store.getters.getError)

    let loadingArticles = ref(true)
    store.dispatch('getArticles').then(() => {
      loadingArticles.value = false
    })



    return {
      displayedArticles,
      findArticles,
      errorMessage,
      loadingArticles
    }

  },


  methods : {
    onSearch(){
      this.searching = this.searched.length !== 0;
    }
  },

}

</script>

<style  scoped>

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

/* Define image heigth in your project to 300px */
.article-img img
{
  max-height: 300px !important;
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


.search-container {
  padding: 0 !important;
}

.search-container div {
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.flip-list-move {
  transition: transform 0.2s ease;
}

@media only screen and (max-width: 767px) {
  .content-header {
    width: 300px;
  }

}


@media only screen and (max-width: 567px) {
  .content-header {
    width: 250px;
  }

}
</style>