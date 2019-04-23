import PropTypes from 'prop-types'
import React from 'react'
import './TreeCellExpander.scss'

const TreeCellExpander = ({
  children,
  iconExpandClosed,
  iconExpandOpened,
  iconNonExpander,
  isExpanded,
  level,
  isExpandable,
  onExpand,
  paddingLeftInitial,
  paddingLeftMultiplier
}) => (
  <td
    className='cell-expander-container'
    style={{
      paddingLeft: `${level * paddingLeftMultiplier + paddingLeftInitial}px`
    }}>
    {isExpandable ? (
      <span onClick={onExpand} className='cell-expander'>
        {isExpanded ? iconExpandOpened : iconExpandClosed}
      </span>
    ) : (
      iconNonExpander
    )}
    <span className='cell-title' onClick={onExpand}>
      {children}
    </span>
  </td>
)

TreeCellExpander.propTypes = {
  children: PropTypes.node,
  iconExpandClosed: PropTypes.node, // expand closed icon
  iconExpandOpened: PropTypes.node, // expand opened icon
  iconNonExpander: PropTypes.node, // unexpandable icon
  paddingLeftInitial: PropTypes.number, // intitial left padding (i.e: Bootstrap default is 16px)
  paddingLeftMultiplier: PropTypes.number // padding left multiplier for level
}

TreeCellExpander.defaultProps = {
  iconExpandClosed: <span>[+]</span>,
  iconExpandOpened: <span>[-]</span>,
  iconNonExpander: <span className='cell-expander' />,
  paddingLeftInitial: 16,
  paddingLeftMultiplier: 15
}

export default TreeCellExpander
