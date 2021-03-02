<template>
    <div class="comment" v-if="!loadingComment">
        <a class="avatar" v-if="error.length === 0">
          <img :src="getAuthorLogo(comment.value.users_name)">
        </a>
        <div class="content" v-if="error.length === 0">
          <a class="author">{{comment.value.users_name}}</a>
          <div class="metadata">
            <span class="date">{{ formatDateTimeInLocal(comment.value.dateAdd)}}</span>
          </div>
          <div class="text">
            {{ comment.value.message }}
          </div>
          <div class="actions">
            <a class="reply" v-on:click="displayReplyForm = !displayReplyForm; commentingMessage = '' ">Reply</a>
          </div>
          <form class="ui reply form" v-if="displayReplyForm">
            <div class="field">
              <textarea v-model="message" v-on:focus="commentingMessage = '' " placeholder="your comment"></textarea>
            </div>
            <div class="ui primary submit labeled icon button" @click="reply">
              <i class="icon edit"></i> Add Reply
            </div>
          </form>
          <div class="ui icon message" v-if="commentingMessage.length !== 0" :class="{negative: commentingResult === false, positive: commentingResult === true}">
            <p>{{ commentingMessage }}</p>
          </div>
          <div class="comments" v-if="comment.value.reply.length !== 0">
            <Comment
                v-for="commentReply in commentReplys"
                :key="commentReply"
                :id="commentReply"
            />
          </div>
      </div>
      <div class="ui negative icon message" v-if="error.length !== 0">
        <p>{{ error }}</p>
      </div>
    </div>
    <div class="ui segment on-comment-load" v-if="loadingComment">
      <div :class="[ 'ui dimmer', {active : loadingComment}]">
        <div class="ui text loader mini">Loading</div>
      </div>
    </div>
</template>

<script>
import {useStore} from "vuex";
import {ref} from "vue";
import {reactive} from "@vue/reactivity";
import { formatDateTimeInLocal } from "@/module/biblio";
import { commentMixin } from "@/module/mixins";
import store from "@/datas/store";

export default {
  name: "Comment",
  props: ['id'],
  mixins: [ commentMixin ],
  data() {
    return {
      displayReplyForm: false
    }
  },
  setup (props) {
    const store = useStore()

    let loadingComment = ref(true)
    let comment = reactive({})
    let error = ref('')

    store.dispatch('getComment', props.id).then(({ data }) => {
      if (data.status.success) {
        comment.value =  data.data
      }
      else {
        error.value = data.status.message
      }
    }).catch((err) => {
      error.value = "Something goes wrong when loading article. Details : " + err
    })
    .then(() => {
      loadingComment.value = false
    })

    return {
      loadingComment,
      comment,
      error
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

  methods : {
    getAuthorLogo: (author) => {
      let all =  author.split(' ')
      let name = all[0]
      let surname = all.splice(1).join(' ')
      return `https://eu.ui-avatars.com/api/?name=${name}+${surname}`
    },
    formatDateTimeInLocal,
    reply() {
      store.dispatch('replyComment', { message: this.message, commentId: this.comment.value._id}).then((response) => {
        let status = response.data.status
        this.commentingResult = status.success
        this.commentingMessage = status.message
        this.message = ""
        this.displayReplyForm = false
        store.dispatch('getArticle', store.getters.getSlug).then(() =>{
          console.log(store.getters.getComments)
        })
      }).catch((error) => {
        this.commentingResult = false
        this.commentingMessage = "Comment reply sending failed. Details: " + error
      })
    }
  },

  computed: {
    commentReplys() {
      console.log(this.comment.value.reply)
      return this.comment.value.reply
    },
  },

  updated() {
    store.dispatch('getComment', this.$props.id).then(({ data }) => {
      if (data.status.success) {
        let oldReply = this.comment.value.reply.length
        let newReply = data.data.reply.length

        if (oldReply !== newReply) {
          this.comment.value =  data.data
        }
      }
      else {
        this.error.value = data.status.message
      }
    }).catch((err) => {
      this.error.value = "Something goes wrong when loading article. Details : " + err
    })
  }
}
</script>

<style scoped>

.on-comment-load {
  height: 50px !important;

}

</style>