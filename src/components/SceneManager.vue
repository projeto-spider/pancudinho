<template>
  <PageStart
    v-if="state.page === PAGE.START"
    :state="state"
  ></PageStart>

  <PageAbout
    v-else-if="state.page === PAGE.ABOUT"
    :state="state"
  ></PageAbout>

  <PageAuthentication
    v-else-if="state.page === PAGE.AUTHENTICATION"
    :state="state"
  ></PageAuthentication>
</template>

<script>
import * as engine from '../engine'

import PageStart from './pages/Start.vue'
import PageAbout from './pages/About.vue'
import PageAuthentication from './pages/Authentication.vue'

export default {
  name: 'SceneManager',

  components: {
    PageStart,
    PageAbout,
    PageAuthentication
  },

  props: {
    state: {
      type: Object,
      default: engine.defaultState
    }
  },

  data: () => ({
  }),

  methods: {
  }
}
</script>
