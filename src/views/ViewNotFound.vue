<template>
  <div class="ui container raised segment to-center root " >
    <div><img :src="logo" alt="Not found"></div>
    <div><p>Oups... Page not found.</p></div>
  </div>
</template>

<script>

import notFoundLogo from '../assets/undraw_page_not_found_su7k.png'

export default {
  name: "PageNotFound",
  data() {
    return {
      logo: notFoundLogo
    }
  }
}
</script>

<style scoped>

.root{
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: white !important;
  font-size: larger;
  font-family: 'Comfortaa', cursive;
  padding-right: 10px!important;
  flex-direction: column;
}

.to-center {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}

img {
  width: 300px !important;
}

p {
  margin-top: 20px;
}

</style>