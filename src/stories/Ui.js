import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'
import { action } from '@storybook/addon-actions'

import Background from '../components/ui/Background.vue'
import Panel from '../components/ui/Panel.vue'
import Tip from '../components/ui/Tip.vue'
import Button from '../components/ui/Button.vue'

const stories = storiesOf('UI', module)
stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('Background', (h) => ({
    render: h => h(Background, { props: {
    } })
  }))
  .add('Background with Panel', (h) => ({
    render: h => h(Background, { props: {
    } }, [
      h(Panel, {}, ['Aqui começa o jogo do pançudinho.'])
    ])
  }))
  .add('Panel', (h) => ({
    render: h => h(Panel, { props: {
    } }, [
      'Olá mundo'
    ])
  }))
  .add('Tip', (h) => ({
    render: h => h(Tip, { props: {
      open: boolean('Open Message', true),
      handleClose: action('Closing window')
    } }, [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo libero et facilisis porta. Morbi molestie est eu augue euismod faucibus. Nullam id laoreet neque, eget placerat urna. Phasellus et odio facilisis purus aliquam pellentesque. Nulla facilisi. Nulla facilisi. Mauris sit amet nisi nec velit feugiat mattis non ut nunc.'
    ])
  }))
  .add('Tip with Background', (h) => ({
    render: h => h(Background, { props: {
    } }, [
      h(Tip, { props: {
        open: boolean('Open Message', true),
        handleClose: action('Closing window')
      } }, [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo libero et facilisis porta. Morbi molestie est eu augue euismod faucibus. Nullam id laoreet neque, eget placerat urna. Phasellus et odio facilisis purus aliquam pellentesque. Nulla facilisi. Nulla facilisi. Mauris sit amet nisi nec velit feugiat mattis non ut nunc.'
      ])
    ])
  }))
  .add('Tip you can close', (h) => ({
    template: `
      <Background>
        <Tip :open="open" :handle-close="() => open = false">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo libero et facilisis porta. Morbi molestie est eu augue euismod faucibus. Nullam id laoreet neque, eget placerat urna. Phasellus et odio facilisis purus aliquam pellentesque. Nulla facilisi. Nulla facilisi. Mauris sit amet nisi nec velit feugiat mattis non ut nunc.
        </Tip>
        <button @click="() => open = true">Open</button>
      </Background>
    `,

    components: { Background, Tip },

    data: () => ({ open: true })
  }))
  .add('Button', (h) => ({
    render: h => h(Button, { props: {
      handleClick: action('Button Pressed'),
      label: text('Button Name', 'CLICK ME!')
    }})
  }))
