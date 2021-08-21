import React from 'react'
import styled from 'styled-components'

const Item = styled.span`
  border-radius: 100%;
  aspect-ratio: 1 / 1;
  width: 20px;
  display: inline-block;
  align-self: center;
  &.red {
    background-color: #F7E5E4;
  }

  &.blue {
    background-color: #E0EBF0;
  }
`

type ColorifyItemProps = {
  className: string
}

export const ColorifyItem = (props: ColorifyItemProps) => {
  return <Item className={props.className} />
}
