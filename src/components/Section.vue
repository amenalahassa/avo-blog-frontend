<template>
  <div >
    <h3 class="title">{{ section.title }}</h3>
    <div class="img  " v-if="section.img.length !== 0"><img class="ui rounded large centered  image" :src="getImage(section.img)" alt="Article illustration"><span>Credit: By Avo</span></div>
    <div v-for="(paragraph, index) in section.paragraphs" :key="index">
      <div class="img  " v-if="paragraph.img.length !== 0"><img class="ui rounded large centered   image" :src="getImage(paragraph.img)" alt="Article illustration"><span>Credit: By Avo</span></div>
      <div class="text">{{ paragraph.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Section",
  props: ['section'],
  methods: {
    getImage(link){
      let baseURL = "http://" + process.env.VUE_APP_SERVER_HOST
      return baseURL + link
    },
  },
  mounted() {
    console.log(this.$props.section)
  }
}
</script>

<style scoped>

.img {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
}

.title {
  font-size: x-large;
}

.text {
  margin: 20px 0 !important;
}

.img span {
  font-size: smaller;
  color: #908f8f;
}

</style>