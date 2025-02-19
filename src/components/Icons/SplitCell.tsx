import React from "react";
import styled from "styled-components";
import Icon from "./Icon";

const StyledSplitCell = styled.i`
  & {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs, 1));
    width: 20px;
    height: 10px;
    background: linear-gradient(to left, currentColor 15px, transparent 0)
        no-repeat 2px 4px/6px 2px,
      linear-gradient(to left, currentColor 15px, transparent 0) no-repeat 12px
        4px/6px 2px;
  }
  &::after,
  &::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 6px;
    height: 6px;
    transform: rotate(45deg);
    top: 2px;
  }
  &::after {
    border-bottom: 2px solid;
    border-left: 2px solid;
    left: 1px;
  }
  &::before {
    border-top: 2px solid;
    border-right: 2px solid;
    right: 1px;
  }
`;
export const SplitCell = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>((props, ref) => {
  return (
    <Icon>
      <StyledSplitCell {...props} ref={ref} icon-role="arrows-h" />
    </Icon>
  );
});
