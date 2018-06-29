import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'

import Start from '../components/pages/Start.vue'


const stories = storiesOf('Pages', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('Start', (h) => ({
    render: h => h(Start, { props: {
    } })
  }))

