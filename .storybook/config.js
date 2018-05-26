import { configure } from '@storybook/vue'

import Vue from 'vue'
import '../src/assets/global-fonts.css'

function loadStories() {
  require('../src/stories/Ui')
  require('../src/stories/MemoryGame')
  require('../src/stories/GqimGame')
  require('../src/stories/Animation')
  require('../src/stories/BookDragDropGame')
}

configure(loadStories, module);
