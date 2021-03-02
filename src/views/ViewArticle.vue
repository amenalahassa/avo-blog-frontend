<template>
  <div v-if="!loadingArticles">
    <header :style="{backgroundImage: `url('${image}')`}">
      <div class=" tabs ui secondary menu">
        <div class="item">
          <router-link :to="{ name: 'Home'}" class="logo-link"><img class="logo" :src="logo" alt="Logo de Avo"></router-link>
        </div>
        <div class="right menu">
          <a class=" item">
            <span class="user-name">Amen Le geek.</span>
          </a>
          <a class="ui item">
            <button class="ui white button">
              Logout
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
                    <div class="ui container threaded minimal comments">
                      <div class="comment">
                        <a class="avatar">
                          <img src="https://eu.ui-avatars.com/api/?name=John+Doe">
                        </a>
                        <div class="content">
                          <a class="author">Matt</a>
                          <div class="metadata">
                            <span class="date">Today at 5:42PM</span>
                          </div>
                          <div class="text">
                            How artistic!
                          </div>
                          <div class="actions">
                            <a class="reply">Reply</a>
                          </div>
                        </div>
                      </div>
                      <div class="comment">
                        <a class="avatar">
                          <img src="https://eu.ui-avatars.com/api/?name=John+Doe">
                        </a>
                        <div class="content">
                          <a class="author">Elliot Fu</a>
                          <div class="metadata">
                            <span class="date">Yesterday at 12:30AM</span>
                          </div>
                          <div class="text">
                            <p>This has been very useful for my research. Thanks as well!</p>
                          </div>
                          <div class="actions">
                            <a class="reply">Reply</a>
                          </div>
                        </div>
                        <div class="comments">
                          <div class="comment">
                            <a class="avatar">
                              <img src="https://eu.ui-avatars.com/api/?name=John+Doe">
                            </a>
                            <div class="content">
                              <a class="author">Jenny Hess</a>
                              <div class="metadata">
                                <span class="date">Just now</span>
                              </div>
                              <div class="text">
                                Elliot you are always so right :)
                              </div>
                              <div class="actions">
                                <a class="reply">Reply</a>
                              </div>
                              <form class="ui reply form">
                                <div class="field">
                                  <textarea></textarea>
                                </div>
                                <div class="ui primary submit labeled icon button">
                                  <i class="icon edit"></i> Add Reply
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="comment">
                        <a class="avatar ui large rounded image">
                          <img  src="https://eu.ui-avatars.com/api/?name=John+Doe">
                        </a>
                        <div class="content">
                          <a class="author">Joe Henderson</a>
                          <div class="metadata">
                            <span class="date">5 days ago</span>
                          </div>
                          <div class="text">
                            Dude, this is awesome. Thanks so much
                          </div>
                          <div class="actions">
                            <a class="reply">Reply</a>
                          </div>
                        </div>
                      </div>

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
                      <textarea v-model="message"></textarea>
                    </div>
                    <div class="ui green labeled submit icon button" @click="sendComment"  :class="{disabled : message.length === 0}">
                      <i class="icon send" ></i> Comment
                    </div>
                  </form>
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

    <div :class="['ui modal']">
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
import {ref} from "vue";
import logo from "@/assets/avô2.png";
import {computed} from "@vue/reactivity";
import {initAccordion, showModal} from "@/module/biblio";
import Login from "@/components/Login";
import Signup from "@/components/Signup";

export default {
  name: "ViewArticle",
  props : [ 'slug'],
  components: {
    Login,
    Signup
  },
  data() {
    return {
      logo,
      message: "",
      currentTab: 'signup',
    }
  },
  setup(props) {

    const store = useStore()
    const loadingArticles = ref(true)
    store.dispatch('getArticle', props.slug).then(() => {
      loadingArticles.value = false
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
    }

  },
  methods: {
    getImage(link){
      let baseURL = "http://" + process.env.VUE_APP_SERVER_HOST
      return baseURL + link
    },
    sendComment() {
      console.log(this.message)
      showModal()
    },
    displayComponent(component){
      this.currentTab = component
    }
  },
  updated() {
    initAccordion()
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