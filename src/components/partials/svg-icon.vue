<template>
  <span>
    <span v-if="icon === 'bird'">
      <img class="bird" svg-inline src="../../images/icons/icon-bird-positive.svg" alt="Icona d'un pardal" />
    </span>
    <span v-else-if="icon === 'micalet'">
      <img class="micalet" svg-inline src="../../images/icons/icon-micalet.svg" alt="Icona del micalet" />
    </span>
    <span v-else-if="icon === 'palmtree'">
      <img class="palmtree" svg-inline src="../../images/icons/icon-palmtree.svg" alt="Icona d'una palmera" />
    </span>
    <span v-else-if="icon === 'wave'">
      <img class="wave" svg-inline src="../../images/icons/icon-wave.svg" alt="Icona d'una ona" />
    </span>
    <span v-else-if="icon === 'tower'">
      <img class="tower" svg-inline src="../../images/icons/icon-tower.svg" alt="Icona de una torre" />
    </span>
  </span>
</template>

<script>
export default {
  name: 'svg-icon',

  props: {
    icon: String
  }
}
</script>
