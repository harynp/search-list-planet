<template>
  <div class="container-pages" >
    <div class="wrapper-input-search">
      <v-text-field
        v-model="planetName"
        solo
        :label="'Search Names . . .'"
        append-icon="mdi-search-web"
      />
    </div>
    <div class="spacer"></div>
    <list-planets @go-detail="onHandleDetail" :list="computeListPlanets"/>
  </div>
</template>

<script>
import ListPlanets from '~/components/List';
export default {
  mounted () {
    this.getListPlanets();
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  data() {
    return {
      planetName: '',
      list: [],
      count: 60,
      metaData: 10,
      page: 1
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
    },
  },
  methods: {
    isBottomVisible() {
      return window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
    },
    async getListPlanets() {
      try {
        await this.$store.dispatch('planets/getList', {
          params: {
            page: this.page
          }
        });
        this.list = this.$store.getters['planets/getListPlanets'];
      } catch (error) {
        console.log(error);
      }
    },
    async handleScroll() {
      const limitPage = this.count / this.metaData;
      if (this.isBottomVisible() && this.page < limitPage) {
        this.page = this.page + 1;
        this.$store.commit('planets/setPage', this.page);
        await this.getListPlanets();
      }
    },
    onHandleDetail(detail) {
      const index = this.list.findIndex(x => x.name === detail.name);
      this.$store.commit('planets/setId', index + 1);
      /* ALTERNATIVE if get CORS */
      this.$store.commit('planets/setDetail', detail);
      this.$router.push(`details`);
    }
  },
}
</script>

<style lang="scss">
  .container-pages {
    position: relative;
  }

  .wrapper-input-search {
    position:fixed;
    z-index: 1; 
    width: 100%;
  }

  .spacer {
    padding: 25px;
  }
</style>