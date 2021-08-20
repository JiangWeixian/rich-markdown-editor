import * as React from "react";
import { EditorView } from "prosemirror-view";
import { Portal } from 'react-portal'
import styled, { withTheme } from "styled-components";
import ToolbarButton from "./ToolbarButton";
import ToolbarSeparator from "./ToolbarSeparator";
import theme from "../theme";
import { MenuItem } from "../types";
import FloatingToolbar, { Wrapper as FloatingToolbarWrapper } from "./FloatingToolbar";

type Props = {
  tooltip: typeof React.Component | React.FC<any>;
  commands: Record<string, any>;
  view: EditorView;
  theme: typeof theme;
  items: MenuItem[];
};

const FlexibleWrapper = styled.div`
  display: flex;
  position: relative;
`;

const SubFlexibleWrapper = styled.div`
  display: flex;
  position: absolute;
  top: -40px;
  left: 0px;
`;

type State = {
  subItems: MenuItem[]
  showSubItems: boolean
  subItemsPositions: Record<string, number>
}

class Menu extends React.Component<Props, State> {
  state: State = {
    subItems: [],
    showSubItems: false,
    subItemsPositions: {}
  }

  ref: HTMLDivElement | null

  handleHover = (subItems: MenuItem[] = []) => {
    const rect = this.ref?.getBoundingClientRect();
    console.log(this.ref, rect)
    this.setState({
      showSubItems: true,
      subItems,
      subItemsPositions: {
        top: rect?.top || 0,
        left: rect?.left || 0
      }
    })
  }

  render() {
    const { view, items } = this.props;
    const { state } = view;
    const Tooltip = this.props.tooltip;

    return (
      <FlexibleWrapper ref={ref => (this.ref = ref)}>
        {items.map((item, index) => {
          if (item.name === "separator" && item.visible !== false) {
            return <ToolbarSeparator key={index} />;
          }
          if (item.visible === false || !item.icon) {
            return null;
          }
          const Icon = item.icon;
          const isActive = item.active ? item.active(state) : false;

          return (
            <ToolbarButton
              key={index}
              onMouseEnter={() => {
                // TODO: should not detect item.items
                if (item.items) {
                  this.handleHover(item.items)
                }
              }}
              onClick={() => {
                return item.name && this.props.commands[item.name](item.attrs)
              }}
              active={isActive}
            >
              <Tooltip tooltip={item.tooltip} placement="top">
                <Icon color={this.props.theme.toolbarItem} />
              </Tooltip>
            </ToolbarButton>
          );
        })}
        <Portal>
          <FloatingToolbarWrapper
            active={this.state.showSubItems}
            offset={0}
            noArrow={true}
            style={{
              top: `${(this.state.subItemsPositions.top || 0) - 50}px`,
              // TODO: left related to hover index
              left: `${(this.state.subItemsPositions.left || 0) + 4 * 24}px`,
            }}
          >
            {this.state.subItems.map((item, index) => {
              return (
                <ToolbarButton
                  key={index}
                  onClick={() => {
                    return (
                      item.name && this.props.commands[item.name](item.attrs)
                    );
                  }}
                  active={false}
                >
                  <Tooltip tooltip={item.tooltip} placement="top">
                    {item.icon}
                  </Tooltip>
                </ToolbarButton>
              );
            })}
          </FloatingToolbarWrapper>
        </Portal>
        {/* <FloatingToolbar
          view={this.props.view}
          active={this.state.showSubItems}
          offset={{
            top: -40,
            left: 0
          }}
        >
          {this.state.subItems.map((item, index) => {
            return (
              <ToolbarButton
                key={index}
                onClick={() => {
                  return (
                    item.name && this.props.commands[item.name](item.attrs)
                  );
                }}
                active={false}
              >
                <Tooltip tooltip={item.tooltip} placement="top">
                  {item.name}
                </Tooltip>
              </ToolbarButton>
            );
          })}
        </FloatingToolbar> */}
      </FlexibleWrapper>
    );
  }
}

export default withTheme(Menu);
