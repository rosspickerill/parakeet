import {
 createMuiTheme
} from '@material-ui/core/styles'

import grey from '@material-ui/core/colors/grey'
import green from '@material-ui/core/colors/green'

const theme = createMuiTheme({
 palette: {
   primary: grey,
   accent: green,
   type: 'dark',
 },
})

export default theme
