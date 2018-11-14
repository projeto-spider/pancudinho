import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { number, withKnobs } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'

import VisualNovel from '../components/visual-novel/VisualNovel.vue'

const stories = storiesOf('Visual Novel', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('Visual Novel', (h) => ({
    render: h => h(VisualNovel, { props: {
    } })
  }))

