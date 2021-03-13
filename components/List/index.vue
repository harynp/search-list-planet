<template>
  <div >
    <div v-for="(item, idx) in list" :key="idx">
      <v-col justify="center">
        <v-card
          class="mx-auto"
          @click="goDetail(item)"
        >
          <v-img
            class="white--text align-end"
            height="100px"
            src="https://wink.earth/wp-content/uploads/2018/03/You-Are-Here-Icon.jpeg"
            position="bottom"
          >
            <v-card-title>{{ item.name.toUpperCase() }}</v-card-title>
          </v-img>
          <v-card-subtitle class="pb-0">
            {{ item.name }}
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <div>diameters: {{ item.diameter }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    goDetail(data) {
      this.$emit('go-detail', data);
    }
  }
}
</script>