import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { text, withKnobs, boolean, object } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'
import { action } from '@storybook/addon-actions'

import Draggable from '../components/book/drag-drop-game/Draggable.vue'
import Droppable from '../components/book/drag-drop-game/Droppable.vue'
import BookPage from '../components/book/drag-drop-game/BookPage.vue'
import Tip from '../components/book/drag-drop-game/Tip.vue'
import TipButton from '../components/book/drag-drop-game/TipButton.vue'
import BookDragDropGame from '../components/book/drag-drop-game/Game.vue'
import Background from '../components/ui/Background.vue'

const stories = storiesOf('Book Drag n Drop', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('Draggable', (h) => ({
    render: h => h(Draggable, { props: {
      option: object('Option', {id: 1, text: 'Lorem inpsun dolor'}),
      drag: boolean('Drag ability', true)
    } })
  }))
  .add('Droppable', (h) => ({
    render: h => h(Droppable, { props: {} })
  }))
  .add('Book Page', (h) => ({
    render: h => h(BookPage, { props: {
      items: object('Items', [
        {
          id: 1,
          text: 'Lorem ipsum dolor sit amet,'
        },
        {
          id: 2,
          text: 'Lurest farm',
          isAnswer: true
        },
        {
          id: 3,
          text: 'id quo paulo scaevola. Eu everti feugait vel, utamur discere ne duo.'
        },
        {
          id: 4,
          text: 'Loren impsun',
          isAnswer: true
        },
        {
          id: 5,
          text: 'Ex odio adhuc comprehensam eos, cum dicunt maiestatis ad.'
        },
        {
          id: 6,
          text: 'Tomes net',
          isAnswer: true
        },
        {
          id: 7,
          text: 'id quo paulo scaevola'
        }
      ])
    } })
  }))


  .add('Book Page with background', (h) => ({
    render: h => h(Background, { props: {
    } }, [
    h(BookPage, { props: {
      items: object('Items', [
        {
          id: 1,
          text: 'Lorem ipsum dolor sit amet,'
        },
        {
          id: 2,
          text: 'Lurest farm',
          isAnswer: true
        },
        {
          id: 3,
          text: 'id quo paulo scaevola. Eu everti feugait vel, utamur discere ne duo.'
        },
        {
          id: 4,
          text: 'Loren impsun',
          isAnswer: true
        },
        {
          id: 5,
          text: 'Ex odio adhuc comprehensam eos, cum dicunt maiestatis ad.'
        },
        {
          id: 6,
          text: 'Tomes net',
          isAnswer: true
        },
        {
          id: 7,
          text: 'id quo paulo scaevola'
        }
      ])
    }})
  ])
}))

  .add('Tip', (h) => ({
    render: h => h(Tip, { props: {
      tip: text('Tip', 'Lorem ipsum dolor sit amet, an pro eruditi prodesset tincidunt.'),
      showTip: boolean('Show tip', false),
      closeTip: action('Closing window')
    } })
  }))



  .add('Tip with background', (h) => ({
    render: h => h(Background, { props: {
    } }, [
    h(Tip, { props: {
      tip: text('Tip', 'Lorem ipsum dolor sit amet, an pro eruditi prodesset tincidunt.'),
      showTip: boolean('Show tip', false),
      closeTip: action('Closing window')
    }})
  ])
}))

  .add('Tip Button', (h) => ({
    render: h => h(TipButton, { props: {} })
  }))


  .add('Game', (h) => ({
    render: h => h(BookDragDropGame, { props: {
      items: object('Items', [
        {
          id: 1,
          text: 'Lorem ipsum dolor sit amet,'
        },
        {
          id: 2,
          text: 'Lurest farm',
          isAnswer: true
        },
        {
          id: 3,
          text: 'id quo paulo scaevola. Eu everti feugait vel, utamur discere ne duo.'
        },
        {
          id: 4,
          text: 'Loren impsun',
          isAnswer: true
        },
        {
          id: 5,
          text: 'Ex odio adhuc comprehensam eos, cum dicunt maiestatis ad.'
        },
        {
          id: 6,
          text: 'Tomes net',
          isAnswer: true
        },
        {
          id: 7,
          text: 'id quo paulo scaevola'
        }
      ])
    } })
  }))

  .add('Game with background', (h) => ({
    render: h => h(Background, { props: {
    } }, [
      h(BookDragDropGame, { props: {
      items: object('Items', [
        {
          id: 1,
          text: 'Lorem ipsum dolor sit amet,'
        },
        {
          id: 2,
          text: 'Lurest farm',
          isAnswer: true
        },
        {
          id: 3,
          text: 'id quo paulo scaevola. Eu everti feugait vel, utamur discere ne duo.'
        },
        {
          id: 4,
          text: 'Loren impsun',
          isAnswer: true
        },
        {
          id: 5,
          text: 'Ex odio adhuc comprehensam eos, cum dicunt maiestatis ad.'
        },
        {
          id: 6,
          text: 'Tomes net',
          isAnswer: true
        },
        {
          id: 7,
          text: 'id quo paulo scaevola'
        }
      ])
    }})
  ])
}))
