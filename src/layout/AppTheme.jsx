import { ThemeProvider  } from '@material-ui/core/es/styles'
import React from 'react'

export const AppTheme = (props) => {
    return (
      <ThemeProvider  theme={props.theme}>
        {props.children}
      </ThemeProvider >
    )
  }
  
export default AppTheme