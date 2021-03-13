<template lang="html">
  <v-row justify="space-between">
    <v-col @click="onHandleBack()">
      <v-btn
        class="ma-2"
        color="orange darken-2"
        dark
      >
        <v-icon
          dark
          left
        >
          mdi-arrow-left
        </v-icon>Back
      </v-btn>
    </v-col>
    <v-col></v-col>
    <v-col></v-col>
  </v-row>
</template>

<script>
export default {
  methods: {
    onHandleBack() {
      window.history.back();
    }
  }
}
</script>