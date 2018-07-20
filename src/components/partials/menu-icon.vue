<template>
  <div :class="['category-icon', classes]">
    <span v-if="classes === 'category-sostenible'">
      <svg-icon icon="palmtree" />
    </span>
    <span v-else-if="classes === 'category-persones'">
      persones
    </span>
    <span v-else-if="classes === 'category-barris'">
      <svg-icon icon="tower" />
    </span>
    <span v-else-if="classes === 'category-cultural'">
      <svg-icon icon="micalet" />
    </span>
    <span v-else-if="classes === 'category-participativa'">
      participativa
    </span>
  </div>
</template>

<script>
export default {
  name: 'menu-icon',

  props: {
    classes: String
  }
}
</script>
