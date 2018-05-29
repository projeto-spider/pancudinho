import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'

import Inputble from '../components/book/select-fill-game/Inputble.vue'
import Selectable from '../components/book/select-fill-game/Selectable.vue'
import InputbleVerificationSystem from '../components/book/select-fill-game/InputbleVerificationSystem.vue'
import BookSelectManual from '../components/book/select-fill-game/BookSelectManual.vue'

const stories = storiesOf('Book Select Fill', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('Inputble', (h) => ({
    render: h => h(Inputble, { props: {
    } })
  }))

  .add('Selectable', (h) => ({
    render: h => h(Selectable, { props: {
    } })
  }))

  .add('Imputble Verification System', (h) => ({
    render: h => h(InputbleVerificationSystem, { props: {
    } })
  }))

  .add('BookSelectManual', (h) => ({
    render: h => h(BookSelectManual, { props: {
    } })
  }))



