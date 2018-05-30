<template>
  <transition name="wait-for-panel-bounce">
    <div v-show="open" class="Ranking-container" :class="{ open }">
      <div class="Ranking-foreground" @click="handleClose"></div>

      <transition name="bounce">
        <Panel v-show="open" heading="Ranking" class="Ranking-panel">
          <div v-for="(user, i) in topUsers" :key="i" class="Ranking-Entry">
            <span class="Ranking-Position">#{{ i + 1 }}</span>
            <img :src="avatarPlaceholderImg" alt="Player avatar">
            <span>{{ user.name }}</span>
          </div>

          <div class="separator">...</div>

          <div class="Ranking-Entry">
            <span class="Ranking-Position">#{{ userPosition }}</span>
            <img :src="avatarPlaceholderImg" alt="Player avatar">
            <span>{{ userName }}</span>
          </div>
        </Panel>
      </transition>
    </div>
  </transition>
</template>

<script>
import Panel from './Panel.vue'
import avatarPlaceholderImg from '../../assets/avatar-placeholder.png'

export default {
  name: 'Ranking',

  components: { Panel },

  props: {
    open: {
      type: Boolean,
      default: false
    },

    handleClose: {
      type: Function,
      default: () => {}
    }
  },

  data: () => ({
    avatarPlaceholderImg,
    topUsers: [
      { name: 'Merlin' },
      { name: 'Waver' },
      { name: 'Ozymandias' },
    ],
    userPosition: 33,
    userName: 'Vlad III'
  })
}
</script>

<style scoped>
@keyframes wait-for-panel-bounce {
  0% {
    display: flex;
  }
  100% {
    display: none;
  }
}

.wait-for-panel-bounce-enter-active {
  animation: wait-for-panel-bounce .5s;
}
.wait-for-panel-bounce-leave-active {
  animation: wait-for-panel-bounce .5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}

.Ranking-container {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.Ranking-container .Ranking-foreground {
  position: fixed;
  z-index: 100;
  background-color: rgb(255, 255, 255);
  opacity: 0;
  filter: blur(100px);
  transition: opacity .2s ease;
  width: 100%;
  height: 100%;
}

.Ranking-container.open .Ranking-foreground {
  opacity: .6;
}

.Ranking-container .Ranking-panel {
  z-index: 101;
  margin: auto;
  width: 50%;
  min-height: 30%;
}

.Ranking-Entry {
  display: flex;
  align-items: center;
  justify-content: stretch;
}

.Ranking-Entry .Ranking-Position {
  width: 50px;
}

.Ranking-Entry img {
  width: 64px;
  height: 64px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.separator {
  text-align: center;
  font-size: 36px;
}
</style>
