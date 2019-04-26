import PropTypes from 'prop-types'
import React from 'react'
import './Expander.css'

const Expander = ({
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
    className="expander-container"
    style={{
      paddingLeft: `${level * paddingLeftMultiplier}px`
    }}>
    {isExpandable ? (
      <span onClick={onExpand} className="expander">
        {isExpanded ? iconOpened : iconClosed}
      </span>
    ) : (
      iconUnexpandable
    )}
    <span className="expander-title" onClick={onExpand}>
      {children}
    </span>
  </div>
)

Expander.propTypes = {
  children: PropTypes.node,
  iconClosed: PropTypes.element, // closed icon
  iconOpened: PropTypes.element, // opened icon
  iconUnexpandable: PropTypes.element, // unexpandable icon
  paddingLeftMultiplier: PropTypes.number // padding left multiplier for level
}

Expander.defaultProps = {
  iconClosed: <span>[+]</span>,
  iconOpened: <span>[-]</span>,
  iconUnexpandable: <span className="expander" />,
  paddingLeftMultiplier: 15
}

export default Expander
