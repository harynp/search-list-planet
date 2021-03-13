<template>
  <v-text-field
    solo
    :label="placeholder"
    append-icon="mdi-search-web"
    :value="value"
    @change="onChangeText"
  />
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Search . . .'
    },
    value: {
      type: String
    }
  },
  methods: {
    onChangeText(e) {
      console.log('e', e);
      // this.$emit('value-change', e);
    }
  }
}
</script>