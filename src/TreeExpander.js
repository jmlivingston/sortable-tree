import PropTypes from 'prop-types'
import React from 'react'
import './TreeExpander.scss'

const TreeExpander = ({
  children,
  iconExpandClosed,
  iconExpandOpened,
  iconNonExpander,
  isExpandable,
  isExpanded,
  level,
  onExpand,
  paddingLeftMultiplier
}) => (
  <div
    className='tree-expander-container'
    style={{
      paddingLeft: `${level * paddingLeftMultiplier}px`
    }}>
    {isExpandable ? (
      <span onClick={onExpand} className='tree-expander'>
        {isExpanded ? iconExpandOpened : iconExpandClosed}
      </span>
    ) : (
      iconNonExpander
    )}
    <span className='tree-title' onClick={onExpand}>
      {children}
    </span>
  </div>
)

TreeExpander.propTypes = {
  children: PropTypes.node,
  iconExpandClosed: PropTypes.node, // expand closed icon
  iconExpandOpened: PropTypes.node, // expand opened icon
  iconNonExpander: PropTypes.node, // unexpandable icon
  paddingLeftMultiplier: PropTypes.number // padding left multiplier for level
}

TreeExpander.defaultProps = {
  iconExpandClosed: <span>[+]</span>,
  iconExpandOpened: <span>[-]</span>,
  iconNonExpander: <span className='tree-expander' />,
  paddingLeftMultiplier: 15
}

export default TreeExpander
