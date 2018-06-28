<template>
  <Background>
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

    <Sidebar
      v-if="state.isAuthenticated()"
      :state="state"
    ></Sidebar>
  </Background>
</template>

<script>
import * as engine from '../engine'

import Background from './ui/Background.vue'
import Sidebar from './ui/Sidebar.vue'

import PageStart from './pages/Start.vue'
import PageAbout from './pages/About.vue'
import PageAuthentication from './pages/Authentication.vue'

export default {
  name: 'SceneManager',

  components: {
    Background,
    Sidebar,

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
