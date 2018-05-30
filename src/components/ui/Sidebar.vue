<template>
  <div>
    <Panel class="Sidebar sliding-transition" :class="{ open: open }">
      <div class="sidebar-profile">
        <img :src="avatarPlaceholderImg" alt="Player avatar">
        <span>John Doe</span>
      </div>
    </Panel>

    <Panel
      color="blue"
      class="Sidebar-Toggler sliding-transition"
      :class="{ open: open }"
      @click.native="toggleSidebar"
    >
      <img :src="iconBarsHorizontal" alt="Toggle Sidebar">
    </Panel>
  </div>
</template>

<script>
import Panel from './Panel.vue'
import iconBarsHorizontal from '../../assets/barsHorizontal.png'
import avatarPlaceholderImg from '../../assets/avatar-placeholder.png'

export default {
  name: 'Sidebar',

  components: { Panel },

  data: () => ({
    iconBarsHorizontal,
    avatarPlaceholderImg,
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
.sliding-transition {
  transition: left 0.3s ease;
}

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

.Sidebar .sidebar-profile {
  display: flex;
  align-items: center;
}

.Sidebar .sidebar-profile img {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}

.Sidebar .sidebar-profile span {
  font-size: 14px;
}
</style>

