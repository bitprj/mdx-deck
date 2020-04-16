import React from 'react'

export default function FlexItem(props) {
  return (
    <div style={{
      'padding':props.padding,
      'border':props.border,
      }}>
      {props.children}
    </div>
  )
}