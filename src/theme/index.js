import {
 createMuiTheme
} from '@material-ui/core/styles'

import grey from '@material-ui/core/colors/bluegrey'
import green from '@material-ui/core/colors/green'

const theme = createMuiTheme({
 palette: {
   primary: {
     main: '#383B4F',
   },
   secondary: green,
   type: 'dark',
 },
})

export default theme
