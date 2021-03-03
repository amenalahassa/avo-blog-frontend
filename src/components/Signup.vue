<template>
  <div class="content" v-if="!connected">
    <div class="ui right aligned container actions">
      <i class="icon close cancel button " @click="resetForm"></i>
    </div>
    <div class="ui text container">
      <div class="ui center aligned container set-margin-30">
        <h1>Create an account</h1>
      </div>
      <form class="ui form signup">
        <div class="field">
          <label>Name</label>
          <input type="text" name="name" v-model="name" placeholder="Your name">
        </div>
        <div class="field">
          <label>Email</label>
          <input type="email" name="email" v-model="email" placeholder="exemple@ok.com">
        </div>
        <div class="field">
          <label>Password</label>
          <input type="password" v-model="password" name="password">
        </div>
        <div class="field">
          <label>Confirm Password</label>
          <input type="password" v-model="confPwd" name="confirmationpassword">
        </div>
        <div class=" ui center aligned container set-margin-30">
          <button class="ui submit cancel button green fluid" @click.prevent="submitForm" >Submit</button>
        </div>
        <div class="ui center aligned container set-margin-30">
          <p>Already have an account ? <span class="text-button-connect" @click="$emit('connect', 'login')">Sign in</span> </p>
        </div>
        <div class="ui error message"></div>
        <div class="ui icon message" v-if="error.length !== 0" >
          <p>{{ error }}</p>
        </div>
      </form>
    </div>
  </div>
  <div class="ui icon message" v-if="connected" >
    <div class=" ui container ">
      <p>Great ! Your account is created.</p>
    </div>
    <div class=" ui actions right aligned container ">
      <button class="ui cancel button green" @click="resetForm" >Continue</button>
    </div>
  </div>
</template>

<script>
import {checkFormValidation, hideConnectionModal, initFormValidation, resetConnectionForm} from "@/module/biblio";
import store from "@/datas/store";

export default {
  store,
  name: "Signup",
  emits: ['connect'],
  data() {
    return {
      name : "",
      email: "",
      password: "",
      confPwd: "",
      connected: false,
      error: ""
    }
  },
  mounted() {
    initFormValidation('signup')
  },
  methods: {
    submitForm () {
      if (checkFormValidation('signup'))
      {
        store.dispatch('signup', {name: this.name, email: this.email, password: this.password})
            .then(({data}) => {
              if (data.status.success) {
                store.commit('SET_USER', data.data)
                this.connected = true
              }
              else {
                this.error = data.status.message
              }
            }).catch((err) => {
            this.error  = "Something goes wrong. Details : " + err
          })
      }
    },
    resetForm() {
      this.password = ""
      this.email = ""
      this.name = ""
      this.confPwd = ""
      this.error = ""
      this.connected = false
      hideConnectionModal()
      resetConnectionForm('signup')
    }
  }
}
</script>

<style scoped>
.set-margin-30 {
  margin: 30px 0 !important;
}

.ui.cancel.button.green.fluid {
  margin: 0 !important;
}

span.text-button-connect {
  font-weight: bold;
  font-size: 1.2em;
  color: #0ea432;
}
</style>