<template>
  <div class="page">
    <div class="page container">
      <div class="band"></div>
      <span class="page-parent">Error 404</span>
      <h2 class="page-title">No hem trobat la pàgina solicitada 🚫</h2>
      <hr />
      <p><router-link to="/">🏠 Torna a la pàgina principal</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error'
}
</script>
