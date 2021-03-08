<template>

  <div class="ui left sidebar inverted vertical menu">
    <div class="ui container">
      <div class="ui right aligned container actions btn-sidebar-hide">
        <i class="icon close cancel button large " ></i>
      </div>
      <div class=" tabs ui secondary stackable menu">
        <div class="item">
          <router-link :to="{ name: 'Home'}" class="logo-link"><img class="logo" :src="logo" alt="Logo de Avo"></router-link>
        </div>
        <div class="right menu">
          <a class=" item user-name-container" v-if="userName.length !== 0">
            <span class="user-name">{{ userName }}</span>
          </a>
          <a class="ui item" >
            <button class="ui white fluid button" @click="showModal('disconnection')" v-if="userToken.length !== 0">
              Logout
            </button>
            <button class="ui white fluid button btn-signup" @click="showModal('connection'); currentTab='signup'" v-if="userToken.length === 0">
              Sign up
            </button>
            <button class="ui white fluid button" @click="showModal('connection'); currentTab='login'" v-if="userToken.length === 0">
              Login
            </button>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div class=" dimmed pusher"  >
    <div v-if="!loadingArticles">
      <header :style="{backgroundImage: `url('${image}')`}">
        <div class=" tabs ui secondary menu tabs-hide ">
          <div class="item">
            <router-link :to="{ name: 'Home'}" class="logo-link"><img class="logo" :src="logo" alt="Logo de Avo"></router-link>
          </div>
          <div class="right menu">
            <a class=" item" v-if="userName.length !== 0">
              <span class="user-name">{{ userName }}</span>
            </a>
            <a class="ui item" >
              <button class="ui white button" @click="showModal('disconnection')" v-if="userToken.length !== 0">
                Logout
              </button>
              <button class="ui white button btn-signup" @click="showModal('connection'); currentTab='signup'" v-if="userToken.length === 0">
                Sign up
              </button>
              <button class="ui white button" @click="showModal('connection'); currentTab='login'" v-if="userToken.length === 0">
                Login
              </button>
            </a>
          </div>
        </div>
        <div class=" tabs ui secondary menu tabs-show  ">
          <div class="item right aligned">
            <button class="ui icon button btn-sidebar-show ">
              <i class="align justify icon large  "></i>
            </button>
          </div>
        </div>
        <transition name="fade" appear>
          <div class="article-header">
            <div class="title-article"><h1>{{ title }}</h1></div>
            <div class="btn-next">
              <a href="#article"><i class="icon huge angle down"></i></a>
            </div>
          </div>
        </transition>
      </header>
      <main class=" ui container font-comfortia" v-if="errorMessage.length === 0">
        <div class="ui two column grid"  >
          <section class="ui row stackable mobile vertically reversed grid ">
            <transition name="slide-fade" appear>
              <aside class="ui four wide computer column recommanded-aside" v-if="similars.length !== 0" >
                <div class="ui segment raised secondary " >
                  <h4 class="ui header recommanded-header">
                    <div class="content font-assitant">
                      You may like
                      <div class="sub header"><div class="ui divider"></div></div>
                    </div>
                  </h4>
                  <div>
                    <div class="recommanded-item" v-for="(similar, index) in similars" :key="similar.slug">
                      <div class=" ui teal" >
                        <router-link :to="{ name: 'ViewArticle', params: { slug: similar.slug }}">
                          {{ similar.title }}
                        </router-link>
                      </div>
                      <div class="ui divider" v-if="index !== (similars.length - 1)"></div>
                    </div>
                  </div>
                </div>
              </aside>
            </transition>
            <article class="ui column" :class="{'twelve wide' : similars.length !== 0, 'sixteen wide' : similars.length === 0 }" id="article">
              <transition name="slide-fade-up" appear>
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
                    <Section
                        v-for="section in content"
                        :key="section.title"
                        :section="section"
                    />
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
                      <div class="ui left mini labeled button"  tabindex="0">
                        <a class="ui basic mini right pointing label" :class="{purple : liked}">
                          {{like}}
                        </a>
                        <div class="ui mini button " @click="makelike(!liked)" :class="{purple : liked}">
                          <i class="heart icon"></i> Like
                        </div>
                      </div>
                    </div>
                    <div class="ui negative message tiny container message-like-error" v-if="errorLike.length !== 0">
                      <p>{{errorLike}}</p>
                    </div>
                  </div>
                </div>
              </transition>

              <transition name="slide-fade-up" appear >
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
                    <div>
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
                        <div class="ui icon message tiny" v-if="commentingMessage.length !== 0" :class="{negative: commentingResult === false, positive: commentingResult === true}">
                          <p>{{ commentingMessage }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>

            </article>
          </section>
        </div>
      </main>
      <div class="ui container raised segment to-center "  v-if="errorMessage.length !== 0">
        <div class="ui negative icon message center aligned">
          <i class="frown icon"></i>
          <div class="content">
            <div class="header">
              Errors
            </div>
            <p>{{ errorMessage }}</p>
          </div>
        </div>
      </div>
      <footer class="ui inverted segment center aligned">
        <span class=" font-pacifico">Made by Amen Alahassa.</span> <span class=" font-comfortia">Web Mobile Developer.</span>
      </footer>

      <div :class="['ui modal connection']">
        <keep-alive>
          <component :is="currentTab" @connect ="displayComponent"></component>
        </keep-alive>
      </div>

      <div :class="['ui modal disconnection']">
        <div class="content">
          <div class="ui right aligned container actions">
            <i class="icon close cancel button "  @click="hideModal('disconnection')"></i>
          </div>
          <div class="ui icon message">
            <div class=" ui container ">
              <p>Are you sure to logout ?</p>
            </div>
          </div>
          <div class="ui tiny negative message" v-if="errorLogout.length !== 0">
            <p>{{errorLogout}}</p>
          </div>
          <div class=" ui right aligned container ">
            <button class="ui cancel button red" @click="disconnect" >Continue</button>
          </div>
        </div>
      </div>

    </div>
    <div class="ui segment on-load" v-if="loadingArticles">
      <p></p>
      <div :class="[ 'ui dimmer', {active : loadingArticles}]">
        <div class="ui text loader">Loading</div>
      </div>
    </div>
  </div>

</template>

<script>


import {useStore} from "vuex";
import {ref, onMounted, onUpdated} from "vue";
import logo from "@/assets/avô2.png";
import {computed} from "@vue/reactivity";
import {getUserFromLocal, initAccordion, showModal, hideModal, initSidebar} from "@/module/biblio";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import Comment from "@/components/Comment";
import Section from "@/components/Section";
import { commentMixin } from "@/module/mixins";
import store from "@/datas/store";

export default {

  name: "ViewArticle",
  props : [ 'slug' ],
  mixins: [ commentMixin ],
  components: {
    Login,
    Signup,
    Comment,
    Section
  },
  data() {
    return {
      logo,
      currentTab: 'login',
      errorLogout: "",
      errorLike: "",
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
      initSidebar()
    })

    let errorMessage = computed(() => store.getters.getLoadingError)


    return {
      loadingArticles,
      errorMessage,
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
      liked: computed(() => store.getters.isLiked),
      similars: computed(() => store.getters.similarArticle),
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
        showModal('connection')
      }
      else {
        this.sendComment()
      }
    },
    makelike(act) {
      let token = getUserFromLocal()
      if (token === null)
      {
        this.currentTab = 'login'
        showModal('connection')
      }
      else {
        if (act) {
          store.dispatch('like').then((response) => {
            let status = response.data.status
            if (status.success){
              store.dispatch('getArticle', this.$props.slug)
            }
            else {
              this.errorLike = status.message
            }
          }).catch((error) => {
            this.errorLike = "Like article failed. Details :" + error
          }).then(() => {
            setTimeout(() => {
              this.errorLike = ""
            }, 3000)
          })
        }
        else {
          store.dispatch('unlike').then((response) => {
            let status = response.data.status
            if (status.success){
              store.dispatch('getArticle', this.$props.slug)
            }
            else {
              this.errorLike = status.message
            }
          }).catch((error) => {
            this.errorLike = "Unlike article failed. Details :" + error
          }).then(() => {
            setTimeout(() => {
              this.errorLike = ""
            }, 3000)
          })

        }
      }
    },
    displayComponent(component){
      this.currentTab = component
    },
    disconnect(){
      store.dispatch('logout').then((response) => {
        let status = response.data.status
        if (status.success)
        {
          store.commit('DISCONNECT_USER')
          hideModal('disconnection')
        }
        else {
          this.errorLogout = status.message
        }
      }).catch((error) => {
        this.errorLogout = "Logout failed. Details : " + error
      })
    },
    showModal,
    hideModal
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
        () => this.$route.params,
        () => {
          if (this.$route.params.slug !== undefined) {
            store.dispatch('getArticle', this.$route.params.slug)
          }
        },
        // fetch the data when the view is created and the data is
        // already being observed
        { immediate: true }
    )
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
  height: inherit;
  text-align: center;
  background-color: #34343473;
}

.title-article h1
{
  font-family: 'Comfortaa', cursive;
  font-size: 2.8em !important;
  margin-bottom: 100px;
  color: white;
  margin-left: 20px !important;
  margin-right: 20px !important;
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

.btn-signup {
  margin-right: 20px !important;
}

.message-like-error {
  margin: 0 10px 10px 10px !important;
}

.to-center {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.7s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.slide-fade-up-enter-active {
  transition: all 0.7s ease-out;
}

.slide-fade-up-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-up-enter-from,
.slide-fade-up-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

.tabs-show {
  display: none;
  margin: 0 !important;

}
.tabs-show .item {
  justify-content: flex-end;
  color: white;
}

.ui.sidebar {
  width: 100vw !important;
  text-align: center;
  padding: 20px !important;
}

.ui.sidebar .icon {
  color: white;
}

.btn-sidebar-hide {
  margin-bottom: 20px;
}

.ui.sidebar .tabs .logo {
  width: 40% !important;
}

.ui.sidebar .user-name-container {
  margin: 20px 0px !important;
}

.ui.sidebar a.ui.item button {
  margin: 10px 0 !important;
}




@media only screen and (max-width: 767px) {

  .slide-fade-enter-active {
    transition: all 0.7s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(30px);
    opacity: 0;
  }

  .tabs-show {
    display: block;
  }
  .tabs-hide {
    display: none;
  }

}

@media only screen and (max-width: 567px) {

  .title-article h1 {
    font-size: 1.8em !important;
  }

}


</style>