import { configure } from '@storybook/react'
import '@storybook/addon-console'

import 'typeface-roboto'

function loadStories() {
  require('../src/stories/table.js')
}

configure(loadStories, module)
