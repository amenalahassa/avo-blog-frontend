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
    <div>Article liste components</div>
  </main>

  <footer class="ui inverted segment center aligned">
    <span class=" font-pacifico">Made by Amen Alahassa.</span> <span class=" font-comfortia">Web Mobile Developer.</span>
  </footer>

</template>

<script>

import logo from "../assets/avô.png"

export default {
  name: "Welcome",
  date () {
    logo
  },

}
</script>

<style scoped>

</style>