import { configure } from '@storybook/react'
import '@storybook/addon-console'

import 'typeface-roboto'
import { install } from '@material-ui/styles'

install()

function loadStories() {
  require('../src/stories/form.js')
  require('../src/stories/table.js')
}

configure(loadStories, module)
