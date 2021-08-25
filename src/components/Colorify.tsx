import React from 'react'
import styled from 'styled-components'

const Item = styled.span`
  border-radius: 100%;
  aspect-ratio: 1 / 1;
  width: 20px;
  display: inline-block;
  align-self: center;
  &.red {
    background-color: #FBBFBC;
  }

  &.yellow {
    background-color: #FFF895;
  }

  &.green {
    background-color: #C5F1C1;
  }
`

type ColorifyItemProps = {
  className: string
}

export const ColorifyItem = (props: ColorifyItemProps) => {
  return <Item className={props.className} />
}
