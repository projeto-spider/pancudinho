import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'

import Inputble from '../components/book/select-fill-game/Inputble.vue'
import Selectable from '../components/book/select-fill-game/Selectable.vue'
import FillPage from '../components/book/select-fill-game/FillPage.vue'
import BookSelectManual from '../components/book/select-fill-game/BookSelectManual.vue'
import SelectFillGame from '../components/book/select-fill-game/SelectFillGame.vue'

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

  .add('Book Select Manual', (h) => ({
    render: h => h(BookSelectManual, { props: {
    } })
  }))

  .add('Fill Page', (h) => ({
    render: h => h(FillPage, { props: {
    } })
  }))

  .add('Select Fill Game', (h) => ({
    render: h => h(SelectFillGame, { props: {
    } })
  }))
