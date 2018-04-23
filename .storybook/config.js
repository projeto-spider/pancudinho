import { configure } from '@storybook/vue'

import Vue from 'vue'
import 'milligram/dist/milligram.css'

function loadStories() {
  require('../src/stories/MemoryGame')
}

configure(loadStories, module);
