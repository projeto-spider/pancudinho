import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'

import Background from '../components/ui/Background.vue'
import HeightGame from '../components/height-game/HeightGame.vue'
import TutorialPart1 from '../components/height-game/TutorialPart1.vue'
import TutorialPart2 from '../components/height-game/TutorialPart2.vue'
import TutorialPart3 from '../components/height-game/TutorialPart3.vue'
import TutorialPart4 from '../components/height-game/TutorialPart4.vue'
import TutorialPart5 from '../components/height-game/TutorialPart5.vue'
import TutorialPart6 from '../components/height-game/TutorialPart6.vue'
import Game from '../components/height-game/Game.vue'

const stories = storiesOf('Height Game', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('Height Game', (h) => ({
    render: h => h(Background, { props: {} }, [
      h(HeightGame, { props: {
      } })
    ])
  }))
  .add('Tutorial Part 1', (h) => ({
    render: h => h(Background, { props: {} }, [
      h(TutorialPart1, { props: {
      } })
    ])
  }))

  .add('Tutorial Part 2', (h) => ({
    render: h => h(Background, { props: {} }, [
      h(TutorialPart2, { props: {
      } })
    ])
  }))

  .add('Tutorial Part 3', (h) => ({
    render: h => h(Background, { props: {} }, [
      h(TutorialPart3, { props: {
      } })
    ])
  }))

  .add('Tutorial Part 4', (h) => ({
    render: h => h(Background, { props: {} }, [
      h(TutorialPart4, { props: {
      } })
    ])
  }))

  .add('Tutorial Part 5', (h) => ({
    render: h => h(Background, { props: {} }, [
      h(TutorialPart5, { props: {
      } })
    ])
  }))

  .add('Tutorial Part 6', (h) => ({
    render: h => h(Background, { props: {} }, [
      h(TutorialPart6, { props: {
      } })
    ])
  }))

  .add('Game', (h) => ({
    render: h => h(Background, { props: {} }, [
      h(Game, { props: {
      } })
    ])
  }))
