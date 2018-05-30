<template>
  <div>
    <Panel class="Sidebar" :class="{ open: open }">
      Flashbacks
    </Panel>
    <Panel color="blue" class="Sidebar-Toggler" :class="{ open: open }" @click.native="toggleSidebar">
      <img :src="iconBarsHorizontal" alt="Toggle Sidebar">
    </Panel>
  </div>
</template>

<script>
import Panel from './Panel.vue'
import iconBarsHorizontal from '../../assets/barsHorizontal.png'

export default {
  name: 'Sidebar',

  components: { Panel },

  data: () => ({
    iconBarsHorizontal,
    open: false
  }),

  methods: {
    toggleSidebar () {
      this.open = !this.open
    }
  }
}
</script>

<style scoped>
.Sidebar {
  position: fixed;
  width: 240px;
  height: 100%;
  top: 0;
  left: -240px;
  z-index: 100;
}

.Sidebar.open {
  left: -10px; /* Hides left border to feel more like a navbar */
}

.Sidebar-Toggler {
  position: fixed;
  width: 64px;
  height: 74px;
  top: 0;
  left: -10px;
  z-index: 99;
  cursor: pointer;
}

.Sidebar-Toggler.open {
  left: 220px;
}

.Sidebar-Toggler img {
  width: 32px;
  height: 32px;
  max-width: unset;
  margin: -10px;
}
</style>

