import React from 'react'

export default function FlexContainer(props) {
  let styles = {
    'display':'flex',
    // 'border':'solid green 3px',
    // 'flexWrap':'wrap',
    'height':'100vh'
  }

  return (
    <div style={styles}>{props.children}</div>
  )
}