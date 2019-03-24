<template>
  <div>
    <audio
      v-if="false"
      v-for="[key, source] in Object.entries(this.files)"
      :key="key"
      :src="source"
    ></audio>

    <iframe
      :src="files.BgSilenceMp3"
      allow="autoplay"
      id="audio"
      style="display:none"
    ></iframe>

    <audio
      v-if="currentBackground"
      :src="currentBackground"
      loop
      autoplay

    ></audio>
  </div>
</template>

<script>
// BGM
import BgSilence from '../assets/audio/250-milliseconds-of-silence.mp3'
import BgHoneyBearOgg from '../assets/audio/honey-bear-loop.ogg'
import BgMenuSongWav from '../assets/audio/menu-song.wav'
import BgSchoolOfQuirksBearOgg from '../assets/audio/Zander Noriega - School of Quirks.mp3'
import BgModernCastleAtmosphereOgg from '../assets/audio/Modern Castle Atmosphere.mp3'
import BgJumpAndRunTropicsOgg from '../assets/audio/jump and run - tropics.ogg'
import BgSidekickMp3 from '../assets/audio/02 Sidekick.mp3'

export default {
  name: 'Mixer',

  data: () => ({
    currentBackground: false,

    files: {
      BgSilence,
      BgHoneyBearOgg,
      BgMenuSongWav,
      BgSchoolOfQuirksBearOgg,
      BgModernCastleAtmosphereOgg,
      BgJumpAndRunTropicsOgg,
      BgSidekickMp3
    }
  }),

  methods: {
    setBackground (key) {
      this.currentBackground = this.files[key]
    }
  }
}
</script>
