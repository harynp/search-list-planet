<template>
  <v-virtual-scroll
    :items="list"
    height="630"
    item-height="190"
  >
    <template v-slot:default="{ item }">
      <v-list-item :key="item.name">
        <v-card
          class="mx-auto"
          max-width="320"
          @click="goDetail(item)"
        >
          <v-img
            class="white--text align-end"
            height="100px"
            src="https://wink.earth/wp-content/uploads/2018/03/You-Are-Here-Icon.jpeg"
          >
            <v-card-title>{{ item.name.toUpperCase() }}</v-card-title>
          </v-img>
          <v-card-subtitle class="pb-0">
            {{ item.name }}
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <v-main>diameters: {{ item.diameter }}</v-main>
          </v-card-text>
        </v-card>
      </v-list-item>
    </template>
  </v-virtual-scroll>
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