import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { text, withKnobs, object, boolean } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'

import Tips from '../components/analysis-game/Tips.vue'
import VisualNovel from '../components/analysis-game/VisualNovel.vue'
import VerificationSystem from '../components/analysis-game/VerificationSystem.vue'
import Draggable from '../components/analysis-game/Draggable.vue'
import Droppable from '../components/analysis-game/Droppable.vue'
import Goal from '../components/analysis-game/Goal.vue'
import AnalysisGame from '../components/analysis-game/Game.vue'

const stories = storiesOf('Analysis Game', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('Tips', (h) => ({
    render: h => h(Tips, { props: {
      tip: text('Tip', 'Lorem inpsun dolor')
    } })
  }))
  .add('VerificationSystem', (h) => ({
    render: h => h(VerificationSystem, { props: {
      Tip: text('Answer Correct', 'Lorem')
    } })
  }))
  .add('VisualNovel', (h) => ({
    render: h => h(VisualNovel, { props: {
      talks: object('Talks', [
        {task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia risus ut orci hendrerit rhoncus. Etiam imperdiet, sapien non feugiat molestie.'},
        {task: 'Usce efficitur posuere elit, varius gravid dolor feugiat eget. Vestibulum condimentum odio ac erat fermentum tincidunt.'},
        {task: 'Quisque tempor, tortor at maximus finibus, tellus felis fermentum ligula, ut hendrerit magna ex non ipsum. Ut bibendum dui id diam luctus elementum.'}
      ])
    } })
  }))
  .add('Draggable', (h) => ({
    render: h => h(Draggable, { props: {
      option: object('Option', {id: 1, text: 'Lorem impsun dolor'}),
      drag: boolean('Drag ability', true)
    } })
  }))
  .add('Droppable', (h) => ({
    render: h => h(Droppable, { props: {} })
  }))
  .add('Goal', (h) => ({
    render: h => h(Goal, { props: {
      goal: text('Goal', 'Loren inpsun dolor')
    } })
  }))
  .add('Game', (h) => ({
    render: h => h(AnalysisGame, { props: {} })
  }))
