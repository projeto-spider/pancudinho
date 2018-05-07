import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'

import Phaser from '../components/gqim-game-phaser/Phaser.vue'
import GqimNode from '../components/gqim-game-phaser/GqimNode'

const stories = storiesOf('GQIM Game Phaser', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('GqimNode', (h) => ({
    render: h => h(Phaser, { props: {
      config: {
        physics: {
          default: 'arcade'
        },
        scene: {
          preload () {},
          create () {
            new GqimNode(this, this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'lalala') // eslint-disable-line
          },
          update () {}
        }
      }
    } })
  }))
  .add('Zoom and Drag-n-Drop Systems', (h) => ({
    render: h => h(Phaser, { props: {
      config: {
        physics: {
          default: 'arcade'
        },
        scene: {
          preload () {},
          create () {
            const camera = this.cameras.main
            camera.setBackgroundColor('#bdbdbd')
            const lorem = 'NAOCMD – Nota do aluno obtida em cada módulo da disciplina'
            new GqimNode(this, 50, 400, lorem) // eslint-disable-line
            new GqimNode(this, 50, 100, '2' + lorem) // eslint-disable-line
            let isDraggingSomething = false
            let paddingDrag = { x: 0, y: 0 }

            this.input.on('dragstart', function dragstart (pointer, gameObject) {
              paddingDrag.x = pointer.x - gameObject.x
              paddingDrag.y = pointer.y - gameObject.y
            })
            this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
              isDraggingSomething = true
              if (camera.zoom < 0.7) {
                const { x, y } = camera.getWorldPoint(pointer.position.x, pointer.position.y)
                gameObject.x = x - (paddingDrag.x * Math.min(camera.zoom, 1))
                gameObject.y = y - (paddingDrag.y * Math.min(camera.zoom, 1))
              } else {
                gameObject.x = dragX
                gameObject.y = dragY
              }
            })

            this.input.on('dragend', function dragend (pointer, gameObject) {
              isDraggingSomething = false
            })

            let lastPointerPosition = { x: 0, y: 0 }

            this.sys.canvas.onmousewheel = function onmousewheel ({ deltaY }) {
              console.log(arguments)
              camera.setZoom(
                camera.zoom - (deltaY / 2000)
              )
            }

            let originDragPoint = null

            this.input.on('pointermove', function pointermove (pointer, objects) {
              if (isDraggingSomething) return
              lastPointerPosition.x = pointer.x
              lastPointerPosition.y = pointer.y

              if (pointer.isDown) {
                if (originDragPoint) {
                  camera.setScroll(
                    camera.scrollX + (originDragPoint.x - pointer.x),
                    camera.scrollY + (originDragPoint.y - pointer.y)
                  )
                }

                originDragPoint = Object.assign({}, lastPointerPosition)
              } else {
                originDragPoint = null
              }
            })
          },
          update () {}
        }
      }
    } })
  }))
