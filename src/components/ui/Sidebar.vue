<template>
  <div>
    <Panel class="Sidebar sliding-transition" :class="{ open: open }">
      <div class="sidebar-profile">
        <img :src="avatarPlaceholderImg" alt="Player avatar">
        <span>John Doe</span>
      </div>

      <div class="Sidebar-Menu">
        <Button color="blue" @click.native="rankingOpen = true">
          Ranking
        </Button>
      </div>

      <div class="Sidebar-Footer">
        <Button color="blue">
          <img :src="gearImg" alt="Settings">
        </Button>
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

    <Ranking
      :open="rankingOpen"
      :handle-close="() => rankingOpen = false"
    >
    </Ranking>
  </div>
</template>

<script>
import Panel from './Panel.vue'
import Button from './Button.vue'
import Ranking from './Ranking.vue'
import iconBarsHorizontal from '../../assets/barsHorizontal.png'
import avatarPlaceholderImg from '../../assets/avatar-placeholder.png'
import gearImg from '../../assets/gear.png'

export default {
  name: 'Sidebar',

  components: { Panel, Button, Ranking },

  data: () => ({
    iconBarsHorizontal,
    avatarPlaceholderImg,
    gearImg,
    open: false,
    rankingOpen: false
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
  box-sizing: border-box;
  position: fixed;
  width: 240px;
  height: 100%;
  top: 0;
  left: -240px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.Sidebar.open {
  left: -10px; /* Hides left border to feel more like a navbar */
}

.Sidebar-Toggler {
  position: fixed;
  width: 68px;
  height: 72px;
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
  margin: -6px;
}

.Sidebar .sidebar-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.Sidebar .sidebar-profile img {
  width: 64px;
  height: 64px;
  margin-bottom: 10px;
}

.Sidebar .sidebar-profile span {
  font-size: 14px;
}

.Sidebar-Menu .Button {
  width: 100%;
}

.Sidebar-Footer {
  text-align: center;
}

.Sidebar-Footer .Button {
  width: 100%
}

.Sidebar-Footer img {
  width: 32px;
  height: 32px;
  margin-left: -25px;
  margin-right: -25px;
  max-width: unset;
}
</style>
