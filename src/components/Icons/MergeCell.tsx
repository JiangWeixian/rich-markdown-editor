import React from 'react'
import styled from 'styled-components'
import Icon from './Icon'

const StyledMergeVertical = styled.i`
  & {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs, 1));
    width: 2px;
    height: 14px;
    border-radius: 3px;
    background: currentColor;
  }
  &::after,
  &::before {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 6px;
    height: 6px;
    border-bottom: 2px solid;
    top: 4px;
  }
  &::after {
    border-left: 2px solid;
    left: 5px;
    transform: rotate(45deg);
  }
  &::before {
    border-right: 2px solid;
    transform: rotate(-45deg);
    right: 5px;
  }
`

export const MergeCell = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  (props, ref) => {
    return (
      <Icon>
        <StyledMergeVertical {...props} ref={ref} icon-role="merge-vertical" />
      </Icon>
    )
  },
)