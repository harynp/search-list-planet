<template lang="html">
<v-main>
  <v-card
    class="mx-auto"
  >
    <back-navigation />
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
  </div>
</v-main>
  
</template>

<script>
import DetailItem from '~/components/Expanded';
import BackNavigation from '~/components/Navigation';
import moment from 'moment';

export default {
  /* KENA CORS */
  async mounted() {
    try {
      const response = await this.$store.dispatch('planets/getDetail', this.getId);
      if (response) {
        this.planetDetails = response;
      }
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      planetDetails: {}
    }
  },
  components: {
    DetailItem,
    BackNavigation
  },
  computed: {
    getId() {
      return this.$store.getters['planets/getId'];
    },
    storeDetail() {
      return this.$store.getters['planets/getDetail'];
    }
  },
  methods: {
    onHandleBack() {
      window.history.back();
    },
    convertNominal(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    getInfoDetail() {
      const data = [];
      Object.keys(this.storeDetail).map(x => {
        const modX = x.replace(/_/g, ' ');
        data.push({
          title: modX,
          value: this.storeDetail[x]
        })
      })
      data.map(list => {
        switch(list.title) {
          case 'diameter': 
            if (list.value !== 'unknown') {
              list.value = `${list.value / 1000} km`;
            }
          break;
          case 'rotation period': 
            list.value = `${list.value} hours`;
          break;
          case 'orbital period':
            list.value = `${list.value} days`;
          break;
          case 'gravity': 
            if (list.value === 2) {
              list.value = 'Twice';
            } else if (list.value === 1) {
              list.value = 'Normal';
            } else {
              list.value = 'Half';
            }
          break;
          case 'population': 
            list.value = `${this.convertNominal(list.value)} population`;
            break;
          case 'surface water':
            list.value = `${list.value} percentage`;
            break;
          case 'created':
            list.value = moment(list.value).format('DD MMM YYYY');
            break;
          case 'edited':
            list.value = moment(list.value).format('DD MMM YYYY');
            break;
          default: 
            return list.value;
        }
      })
      return data;
    }
  }
}
</script>
