<template>
  <v-container>
    <v-text-field
      v-model="planetName"
      solo
      :label="'Search Names . . .'"
      append-icon="mdi-search-web"
    />
    <list-planets @go-detail="onHandleDetail" :list="computeListPlanets"/>
  </v-container>
</template>

<script>
import ListPlanets from '~/components/List';
export default {
  mounted () {
    this.getListPlanets();
  },
  data() {
    return {
      planetName: '',
      list: []
    }
  },
  components: {
    ListPlanets
  },
  computed: {
    computeListPlanets() {
      const arrPlanets = this.$store.getters['planets/getListPlanets'];
      if (this.planetName.length) {
        return arrPlanets.filter(x => x.name.toLowerCase().includes(this.planetName.toLowerCase()));
      } else {
        return arrPlanets;
      }
    }
  },
  methods: {
    async getListPlanets() {
      try {
        await this.$store.dispatch('planets/getList');
        this.list = this.$store.getters['planets/getListPlanets'];
      } catch (error) {
        console.log(error);
      }
    },
    onHandleDetail(detail) {
      this.$store.commit('planets/setDetail', detail);
      this.$router.push(`details`);
    }
  },
}
</script>
