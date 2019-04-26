import PropTypes from 'prop-types'
import React from 'react'
import './TreeExpander.css'

const TreeExpander = ({
  children,
  iconClosed,
  iconOpened,
  iconUnexpandable,
  isExpandable,
  isExpanded,
  level,
  onExpand,
  paddingLeftMultiplier
}) => (
  <div
    className="tree-expander-container"
    style={{
      paddingLeft: `${level * paddingLeftMultiplier}px`
    }}>
    {isExpandable ? (
      <span onClick={onExpand} className="tree-expander">
        {isExpanded ? iconOpened : iconClosed}
      </span>
    ) : (
      iconUnexpandable
    )}
    <span className="tree-title" onClick={onExpand}>
      {children}
    </span>
  </div>
)

TreeExpander.propTypes = {
  children: PropTypes.node,
  iconClosed: PropTypes.element, // closed icon
  iconOpened: PropTypes.element, // opened icon
  iconUnexpandable: PropTypes.element, // unexpandable icon
  paddingLeftMultiplier: PropTypes.number // padding left multiplier for level
}

TreeExpander.defaultProps = {
  iconClosed: <span>[+]</span>,
  iconOpened: <span>[-]</span>,
  iconUnexpandable: <span className="tree-expander" />,
  paddingLeftMultiplier: 15
}

export default TreeExpander
