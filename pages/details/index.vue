<template lang="html">
  <v-card
    class="mx-auto"
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="300px"
    ></v-img>

    <v-card-title>
      {{ storeDetail.name }}
    </v-card-title>

    <v-card-subtitle>
      the following is the explanation
    </v-card-subtitle>
    <v-main v-for="(list, idx) in getInfoDetail()" :key="idx">
      <detail-item :info="list"/>
    </v-main>
  </v-card>
</template>

<script>
import DetailItem from '~/components/Expanded';

export default {
  components: {
    DetailItem
  },
  computed: {
    storeDetail() {
      return this.$store.getters['planets/getDetailPlanet'];
    }
  },
  methods: {
    getInfoDetail() {
      const temp = [];
      Object.keys(this.storeDetail).map(x => {
        temp.push({
          title: x,
          value: this.storeDetail[x]
        })
      })
      return temp;
    }
  }
}
</script>