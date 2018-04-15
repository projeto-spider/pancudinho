import { configure } from '@storybook/vue'

import Vue from 'vue'

function loadStories() {
  require('../src/stories/MemoryGame')
}

configure(loadStories, module);
