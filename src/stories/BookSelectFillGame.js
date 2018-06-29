import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { withKnobs, object } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'
import { action } from '@storybook/addon-actions'

import Inputble from '../components/book/select-fill-game/Inputble.vue'
import Selectable from '../components/book/select-fill-game/Selectable.vue'
import SelectOption from '../components/book/select-fill-game/SelectOption.vue'
import FillPage from '../components/book/select-fill-game/FillPage.vue'
import SelectFillGame from '../components/book/select-fill-game/SelectFillGame.vue'
import SelectPage from '../components/book/select-fill-game/SelectPage.vue'
import Background from '../components/ui/Background.vue'

const stories = storiesOf('Book Select Fill', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('Inputble', (h) => ({
    render: h => h(Inputble, { props: {
    } })
  }))

  .add('Select Option', (h) => ({
    render: h => h(SelectOption, { props: {
      option: object('Option', {
        id: 2,
        text: 'lorem',
        isAnswer: true
      }),
      handleClick: action('Click')
    } })
  }))

  .add('Selectable', (h) => ({
    render: h => h(Selectable, { props: {
      handleClick: action('Click'),
      options: object('Items', [
        {
          id: 2,
          text: 'lorem',
          isAnswer: true
        },
        {
          id: 4,
          text: 'ipsum',
          isAnswer: true
        },
        {
          id: 6,
          text: 'vehicula',
          isAnswer: true
        }
      ])
    } })
  }))

  .add('Fill Page', (h) => ({
    render: h => h(FillPage, { props: {
    } })
  }))

  .add('Select Page', (h) => ({
    render: h => h(SelectPage, { props: {
    } })
  }))

  .add('Select Fill Game', (h) => ({
    render: h => h(SelectFillGame, { props: {
    } })
  }))

  .add('Select Fill Game with Background', (h) => ({
    render: h => h(Background, { props: {
    } }, [
      h(SelectFillGame, { props: {
      }})
    ])
  }))
