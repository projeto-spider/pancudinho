import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'

import SceneManager from '../components/SceneManager.vue'

const stories = storiesOf('Engine', module)
stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('SceneManager', (h) => ({
    render: h => h(SceneManager, { props: {
    } })
  }))
