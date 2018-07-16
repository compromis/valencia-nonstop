<template>
  <div>
    <div v-for="(post, index) in 4" :key="index" class="post-container container">
      <div class="band"></div>
      <div class="post-summary loading">
        <div class="post-thumbnail">
          <span class="filler"></span>
        </div>
        <div class="post-summary-content">
          <div class="subheading">
            <span class="filler" style="width: 50px"></span>
          </div>
          <div class="heading">
            <span class="filler"></span>
            <span class="filler" style="width: 60%"></span>
          </div>
          <div class="subheading">
            <span class="filler"></span>
            <span class="filler" style="width: 60%"></span>
            <span class="filler" style="width: 80%"></span>
            <span class="filler" style="width: 70%"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'posts-loading'
}
</script>
