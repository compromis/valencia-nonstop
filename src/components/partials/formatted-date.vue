<template>
  <span>{{ date | formatDate }}</span>
</template>

<script>
export default {
  name: 'formatted-date',

  props: {
    date: String
  },

  filters: {
    formatDate (value) {
      if (value) {
        const date = new Date(value)
        const monthNames = ['gener', 'febrer', 'març',
          'abril', 'maig', 'juny', 'juliol',
          'agost', 'setembre', 'octubre',
          'novembre', 'desembre']
        const monthStartingWithVowels = [3, 7, 9]

        const day = date.getDate()
        const monthIndex = date.getMonth()
        const year = date.getFullYear()
        const prep = (monthStartingWithVowels.includes(monthIndex)) ? 'd\' ' : 'de '

        return day + ' ' + prep + monthNames[monthIndex] + ' de ' + year
      }
    }
  }
}
</script>
