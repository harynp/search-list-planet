<template>
  <div class="container-pages" >
    <div class="wrapper-input-search">
      <v-text-field
        v-model="planetName"
        solo
        :label="'Search Names . . .'"
        append-icon="mdi-search-web"
        @change="onHandleSearch"
        autofocus
        :validate-on-blur="true"
      />
    </div>
    <div class="spacer"></div>
    <list-planets v-if="computeListPlanets.length" @go-detail="onHandleDetail" :list="computeListPlanets"/>
    <v-row v-else>
      <v-col align="center">That's Planet Not Registered</v-col>
    </v-row>
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
      return this.$store.getters['planets/getListPlanets'];
    },
  },
  methods: {
    async onHandleSearch() {
      try {
        if (this.planetName.length) {
          await this.$store.dispatch('planets/searchByName', this.planetName);
        } else {
          this.getListPlanets();
        }
      } catch (err) {
        console.log(err);
      }
    },
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