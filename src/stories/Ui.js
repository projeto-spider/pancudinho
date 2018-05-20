import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'

import Background from '../components/ui/Background.vue'

const stories = storiesOf('UI', module)
stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('Background', (h) => ({
    render: h => h(Background, { props: {
    } })
  }))
