import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { text, withKnobs } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'

import Tips from '../components/analysis-game/Tips.vue'
import VisualNovel from '../components/analysis-game/VisualNovel.vue'

const stories = storiesOf('Analysis Game', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('Tips', (h) => ({
    render: h => h(Tips, { props: {
      Tip: text('Content', 'Lorem inpsun dolor')
    } })
  }))
  .add('VisualNovel', (h) => ({
    render: h => h(VisualNovel, { props: {
      Tip: text('Content', 'Lorem inpsun dolor')

    } })
  }))
