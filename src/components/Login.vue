<template>
  <div class="content">
    <div class="ui right aligned container actions">
      <i class="icon close cancel button "></i>
    </div>
    <div class="ui text container">
      <div class="ui center aligned container set-margin-30">
        <h1>Login in your account</h1>
      </div>
      <form class="ui form">
        <div class="field">
          <label>Email</label>
          <input type="email" name="email" placeholder="exemple@ok.com">
        </div>
        <div class="field">
          <label>Password</label>
          <input type="password" name="password">
        </div>
        <div class="actions ui center aligned container set-margin-30">
          <button class="ui cancel button green fluid" @click.prevent >Submit</button>
        </div>
        <div class="ui center aligned container set-margin-30">
          <p>Don't have an account ? <span class="text-button-connect " @click="$emit('connect', 'signup')">Sign up</span></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  emits: ['connect']

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