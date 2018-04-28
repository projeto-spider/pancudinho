import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { text, withKnobs } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'

import Tips from '../components/analysis-game/Tips.vue'
import VisualNovel from '../components/analysis-game/VisualNovel.vue'
import VerificationSystem from '../components/analysis-game/VerificationSystem.vue'

const stories = storiesOf('Analysis Game', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('Tips', (h) => ({
    render: h => h(Tips, { props: {
      Tip: text('Tip', 'Lorem inpsun dolor')
    } })
  }))
  .add('VerificationSystem', (h) => ({
    render: h => h(VerificationSystem, { props: {
      Tip: text('Answer Correct', 'Lorem')
    } })
  }))
  .add('VisualNovel', (h) => ({
    render: h => h(VisualNovel, { props: {
      Tip: text('Tip:', 'Lorem ipsum dolor')
    } })
  }))
