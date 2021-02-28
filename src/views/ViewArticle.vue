<template>
  <div>Page  of an article :  {{ $route.params.slug }}</div>
</template>

<script>
export default {
  name: "ViewArticle"

}
</script>

<style >

html {
  scroll-behavior: smooth;
}

body, html, header
{
  padding: 0;
  margin: 0;
}

header {
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
  padding: 0 10px!important;
}

body
{
  background-size: cover;
  background-repeat: no-repeat;
  background-image: linear-gradient(45deg, #e37682 15%, #5f4d93 85%) !important;
}


.content-header
{
  width: 500px;
  display: flex !important;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.user-name
{
  color:white !important
}

.tabs
{
  background-color: rgb(255 255 255 / 25%) !important;
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
  height: 100%;
  text-align: center;
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