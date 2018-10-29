import { configure } from '@storybook/vue'

import Vue from 'vue'
import '../src/assets/global-fonts.css'
import '../src/inject-globals'

function loadStories() {
  require('../src/stories/Engine')
  require('../src/stories/Pages')
  require('../src/stories/Ui')
  require('../src/stories/MemoryGame')
  require('../src/stories/GqimGame')
  require('../src/stories/Animation')
  require('../src/stories/BookDragDropGame')
  require('../src/stories/AnalysisGame')
  require('../src/stories/BookSelectFillGame')
  require('../src/stories/HeightGame')
  require('../src/stories/Select-Game')
  require('../src/stories/SeesawGame')
}

configure(loadStories, module);
