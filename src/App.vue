<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
}

</script>

<style>

html {
  scroll-behavior: smooth;
}

body, html, header
{
  padding: 0;
  margin: 0;
}

body
{
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-image: linear-gradient(45deg, #e37682 15%, #5f4d93 85%) !important;
}

</style>
