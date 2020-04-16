import React from 'react'

export default function Layout(props) {
  let styles = {
    'textAlign':'center',
    'backgroundColor':props.bg,
    'width':'100%',
    'height':'100%',
  }

  return (
    <div style={styles}>
      {props.children}
    </div>
  )
}