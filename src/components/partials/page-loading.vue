<template>
  <div class="loading">
    <div class="subheading" v-if="isPost">
      <span class="filler" style="width: 100px"></span>
    </div>
    <div class="heading">
      <span class="filler"></span>
      <span class="filler" style="width: 60%" v-if="isPost"></span>
      <span class="filler" style="width: 70%" v-if="isPost"></span>
    </div>
    <div class="post-image" v-if="isPost">
      <span class="filler"></span>
    </div>
    <div class="subheading">
      <span class="filler"></span>
      <span class="filler" style="width: 60%"></span>
      <span class="filler" style="width: 80%"></span>
      <span class="filler" style="width: 70%"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-loading',

  props: {
    isPost: Boolean
  }
}
</script>
