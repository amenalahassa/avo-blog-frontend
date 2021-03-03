<template>
  <div v-if="!loadingArticles">
    <header :style="{backgroundImage: `url('${image}')`}">
      <div class=" tabs ui secondary menu">
        <div class="item">
          <router-link :to="{ name: 'Home'}" class="logo-link"><img class="logo" :src="logo" alt="Logo de Avo"></router-link>
        </div>
        <div class="right menu">
          <a class=" item" v-if="userName.length !== 0">
            <span class="user-name">{{ userName }}</span>
          </a>
          <a class="ui item" >
            <button class="ui white button" @click="disconnect" v-if="userToken.length !== 0">
              Logout
            </button>
            <button class="ui white button" @click="showConnectionModal(); currentTab='signup'" v-if="userToken.length === 0">
              Sign up
            </button>
            <button class="ui white button" @click="showConnectionModal(); currentTab='login'" v-if="userToken.length === 0">
              Login
            </button>
          </a>
        </div>
      </div>
      <div class="article-header">
        <div class="title-article"><h1>{{ title }}</h1></div>
        <div class="btn-next">
          <a href="#article"><i class="icon huge angle down"></i></a>
        </div>
      </div>
    </header>

    <main class=" ui container font-comfortia">
      <div class="ui two column grid">
        <section class="ui row stackable mobile vertically reversed grid ">
          <aside class="ui four wide computer column recommanded-aside">
            <div class="ui segment raised secondary ">
              <h4 class="ui header recommanded-header">
                <div class="content font-assitant">
                  You may like
                  <div class="sub header"><div class="ui divider"></div></div>
                </div>
              </h4>
              <div>
                <div class="recommanded-item">

                  <div class=" ui teal">
                    <a href="./index.html">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quod quibusdam adipisci alias assumenda
                      inventore repellendus neque nihil
                    </a>
                  </div>

                </div>
                <div class="ui divider"></div>
                <div class="recommanded-item">

                  <div class=" ui teal">
                    <a href="./index.html">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quod quibusdam adipisci alias assumenda
                      inventore repellendus neque nihil
                    </a>
                  </div>

                </div>
                <div class="ui divider"></div>
                <div class="recommanded-item">

                  <div class=" ui teal">
                    <a href="./index.html">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quod quibusdam adipisci alias assumenda
                      inventore repellendus neque nihil
                    </a>
                  </div>

                </div>
              </div>
            </div>
          </aside>
          <article class="ui twelve wide column" id="article">
            <div class="ui segment raised article-section tall stacked">
              <div class="article-title">
                <div class="ui feed">
                  <div class="event">
                    <div class="label">
                      <img class="" :src="authorLogo">
                    </div>
                    <div class="content">
                      {{ author }}
                    </div>
                  </div>
                </div>
                <div class="ui feed">
                  <div class="event">
                    <div class="label">
                      <i class="pencil icon"></i>
                    </div>
                    <div class="content">
                      {{ date }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="article-content">
                <div v-for="section in content" :key="section.title">
                  <h3>{{ section.title }}</h3>
                  <p class="img ui floated left image" v-if="section.img.length !== 0"><img class="ui rounded image" :src="getImage(section.img)" alt="Article illustration"><span>Credit: By Avo</span></p>
                  <div v-for="(paragraph, index) in section.paragraphs" :key="index">
                    <p class="img ui floated left image" v-if="paragraph.img.length !== 0"><img class="ui rounded image" :src="getImage(paragraph.img)" alt="Article illustration"><span>Credit: By Avo</span></p>
                    <p>{{ paragraph.text }}</p>
                  </div>
                </div>
              </div>
              <div class="ui divider"></div>
              <div class="ui equal width grid">
                <div class="column tags ui left aligned">
                  <button class="ui mini basic button" v-for="tag in tags" :key="tag">
                    <i class="icon tags"></i>
                    {{ tag }}
                  </button>
                </div>
                <div class=" column likes ui right aligned ">
                  <div class="ui  left mini  labeled button" tabindex="0">
                    <a class="ui basic mini right pointing label">
                      {{like}}
                    </a>
                    <div class="ui mini button ">
                      <i class="heart icon"></i> Like
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="ui raised styled fluid accordion pilled">
                <div v-if="totalComments !== 0">
                  <div class="title">
                    <div class="ui equal width middle aligned grid">
                      <div class="ui column left aligned">
                        <i class="dropdown icon"></i>
                        Comments
                      </div>

                      <div class="ui right aligned column">
                        <div class="ui mini left labeled button" tabindex="0">
                          <a class="ui mini basic label">
                            {{ totalComments }}
                          </a>
                          <div class="ui mini icon button">
                            <i class="comments icon"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="content ">
                    <div class="ui container small comments">
                      <Comment
                      v-for="comment in comments"
                      :key="comment"
                      :id="comment"
                      />
                    </div>
                  </div>
                </div>
                <div class="title active ">
                  <i class="dropdown icon"></i>
                  Make a comment
                </div>
                <div class="content active ">
                  <form class="ui reply form">
                    <div class="field">
                      <textarea v-model="message" v-on:focus="commentingMessage = '' "></textarea>
                    </div>
                    <div class="ui green labeled submit icon button" @click="makeComment"  :class="{disabled : message.length === 0}">
                      <i class="icon send" ></i> Comment
                    </div>
                  </form>
                  <div class="ui icon message" v-if="commentingMessage.length !== 0" :class="{negative: commentingResult === false, positive: commentingResult === true}">
                    <p>{{ commentingMessage }}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>

    <footer class="ui inverted segment center aligned">
      <span class=" font-pacifico">Made by Amen Alahassa.</span> <span class=" font-comfortia">Web Mobile Developer.</span>
    </footer>

    <div :class="['ui modal connection']">
      <keep-alive>
        <component :is="currentTab" @connect ="displayComponent"></component>
      </keep-alive>
    </div>

  </div>
  <div class="ui segment on-load" v-if="loadingArticles">
    <p></p>
    <div :class="[ 'ui dimmer', {active : loadingArticles}]">
      <div class="ui text loader">Loading</div>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {ref, onMounted, onUpdated} from "vue";
import logo from "@/assets/avô2.png";
import {computed} from "@vue/reactivity";
import {getUserFromLocal, initAccordion, showConnectionModal} from "@/module/biblio";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import Comment from "@/components/Comment";
import { commentMixin } from "@/module/mixins";
import store from "@/datas/store";

export default {
  name: "ViewArticle",
  props : [ 'slug' ],
  mixins: [ commentMixin ],
  components: {
    Login,
    Signup,
    Comment
  },
  data() {
    return {
      logo,
      currentTab: 'login',
    }
  },
  setup(props) {

    const store = useStore()
    const loadingArticles = ref(true)
    store.dispatch('getArticle', props.slug).then(() => {
      loadingArticles.value = false
    })


    onMounted(() => {
      let user = getUserFromLocal()
      if (user !== null)
      {
        store.commit('SET_USER', user)
      }
    })

    onUpdated(() => {
      initAccordion()
    })

    return {
      loadingArticles,
      image: computed(() => store.getters.getBackgroundImage),
      title: computed(() => store.getters.getTitle),
      author: computed(() => store.getters.getAuthor),
      date: computed(() => store.getters.getPubDate),
      authorLogo: computed(() => store.getters.getAuthorLogo),
      totalComments: computed(() => store.getters.getCommentsLength),
      like: computed(() => store.getters.getLikes),
      tags: computed(() => store.getters.getTags),
      content: computed(() => store.getters.getContent),
      comments: computed(() => store.getters.getComments),
      userName: computed(() => store.getters.getUserName),
      userToken: computed(() => store.getters.getUserToken),
    }
  },
  watch:{
    commentingMessage(val){
      if (val.length > 0)
      {
        setTimeout(() => {
          this.commentingMessage = ""
        }, 2000)
      }
    }
  },
  methods: {
    getImage(link){
      let baseURL = "http://" + process.env.VUE_APP_SERVER_HOST
      return baseURL + link
    },
    sendComment() {
      store.dispatch('makeComment', this.message).then((response) => {
        let status = response.data.status
        this.commentingResult = status.success
        this.commentingMessage = status.message
        this.message = ""
        store.dispatch('getArticle', this.$props.slug)
      }).catch((error) => {
        this.commentingResult = false
        this.commentingMessage = "Comment sending failed. Details: " + error
      })
    },
    makeComment() {
      let token = getUserFromLocal()
      if (token === null)
      {
        showConnectionModal()
      }
      else {
        this.sendComment()
      }
    },
    displayComponent(component){
      this.currentTab = component
    },
    disconnect(){
      store.dispatch('logout').then((response) => {
        let status = response.data.status
        store.commit('DISCONNECT_USER')
        console.log(status.message)
      }).catch((error) => {
        console.log(error)
      })
    },
    showConnectionModal
  }
}
</script>

<style scoped>

header, .on-load{
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  /*background-image: url("./images/cartoon-3236539_1920.jpg");*/
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: white !important;
  font-size: larger;
  font-family: 'Comfortaa', cursive;
  padding-right: 10px!important;

}

body
{
  background-size: cover;
  background-repeat: no-repeat;
  background-image: linear-gradient(45deg, #e37682 15%, #5f4d93 85%);
}


.user-name
{
  color:white !important
}

.tabs
{
  background-color: #34343473 !important;
  margin-bottom: 0 !important;
}

.tabs .logo
{
  width: 20% !important;
}


main
{
  background-color: transparent;
  margin: 10px;
}

footer
{
  margin: 0 !important;
}

.font-assitant {

  font-family: 'Assistant', sans-serif !important;

}

.font-comfortia
{
  font-family: 'Comfortaa', cursive;

}

.font-pacifico
{

  font-family: 'Pacifico', cursive;

}

.recommanded-aside .recommanded-item
{
  font-size: 12px !important;
  color: teal;
}

.recommanded-aside .recommanded-item button
{
  font-size: 12px !important;
}

.recommanded-header .divider
{
  max-width: 50px;
}

.tags button
{
  margin-right: 5px;
  margin-bottom: 5px;
  margin-top: 5px !important;
}

.article-content .img img
{
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}


.article-content .img
{
  padding: 5px !important;
}

.article-content .img span
{
  margin: 0;
  padding: 0;
  font-size: 10px;
  color: grey;
}

.article-content h4, h3 {
  font-family: 'Assistant', sans-serif !important;
}

.article-header
{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 88.5%;
  text-align: center;
  background-color: #34343473;
}

.title-article h1
{
  font-family: 'Comfortaa', cursive;
  font-size: 2.8em !important;
  margin-bottom: 100px;
  color: white;
}

.btn-next a {
  color: white;
}


.btn-next a:hover {
  color: white;
}

.article-title
{
  margin-top: 5px;
  margin-bottom: 30px;
  font-size: 0.1em !important;
}

</style>