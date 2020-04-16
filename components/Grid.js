import React from 'react'

export default function Grid(props) {

  let styles = {
    'display':'grid',
    'gridTemplateColumns':'50% 50%',
    'gridTemplateRows':'20% 20%',
    'border':'solid green 5px',
    // 'padding':props.padding,
    'margin':'0'
  }
  
  return (
    <div style={styles}>
      {props.children}
    </div>
  )
}