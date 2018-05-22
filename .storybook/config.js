import { configure } from '@storybook/vue'

import Vue from 'vue'
import 'milligram/dist/milligram.css'

function loadStories() {
  require('../src/stories/MemoryGame')
  require('../src/stories/BookDragDropGame')
  require('../src/stories/Select-Game')
}

configure(loadStories, module);
