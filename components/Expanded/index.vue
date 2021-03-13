<template lang="html">
<v-main>
  <v-card-actions>
    <v-btn
      color="orange lighten-2"
      text
    >
      {{ info.title }}
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn
      icon
      @click="show = !show"
    >
      <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
    </v-btn>
  </v-card-actions>

  <v-expand-transition>
    <div v-show="show">
      <v-divider></v-divider>
      <v-card-text>
        <v-main v-if="!info.value.length">-</v-main>
        <v-main v-else-if="!checkValueArr(info.value)">{{ info.value }}</v-main>
        <v-main v-else v-for="(link, idx) in info.value" :key="idx">
          {{ info.title }} {{idx + 1}}  : <a class="link-url" :href="link">info</a>
        </v-main>
      </v-card-text>
    </div>
  </v-expand-transition>
</v-main>
  
</template>


<script>
export default {
  data() {
    return {
      show: false,
    }
  },
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    checkValueArr(value) {
      return Array.isArray(value) && value.length > 0;
    }
  }
}
</script>

<style lang="scss">
  .link-url {
    text-decoration: unset;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    min-width: unset !important;
  }
</style>