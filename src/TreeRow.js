import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import TreeRowContext from './TreeRowContext'

const TreeRow = props => {
  const {
    children,
    isExpanded,
    setIsExpanded,
    level,
    maxLevel,
    canExpand,
    node,
    childNodes = [],
    onDrop,
    onGetData,
    sort
  } = props
  const [isDraggedOver, setIsDraggedOver] = useState(false)
  // const [isExpanded, setIsExpanded] = useState(false)
  // const [data, setData] = useState([])

  const getData = async () => {
    // setData(await onGetData(node))

    await onGetData(node)
  }

  useEffect(() => {
    if (level < maxLevel) {
      onExpand()
    }
  }, [])

  const onExpand = () => {
    if (canExpand(node) && !isExpanded) {
      getData()
    }
    setIsExpanded(!isExpanded)
  }

  return (
    <TreeRowContext.Provider value={{onExpand, getData, canExpand: canExpand(node), isExpanded, level}}>
      <tr
        className={isDraggedOver ? 'table-info' : ''}
        onDrop={onDrop}
        onDragOver={evt => {
          evt.stopPropagation()
          evt.preventDefault()
          setIsDraggedOver(true)
        }}
        onDragLeave={() => setIsDraggedOver(false)}>
        {children({node})}
      </tr>
      {childNodes.length > 0 &&
        isExpanded &&
        childNodes.sort(sort).map((datum, index) => (
          <TreeRow {...props} canExpand={datum => canExpand(datum)} key={index} level={level + 1} node={datum}>
            {/* {({node}) => children({node})} */}
            {children}
          </TreeRow>
        ))}
    </TreeRowContext.Provider>
  )
}

TreeRow.propTypes = {
  canExpand: PropTypes.func, // function that returns boolean
  children: PropTypes.func, // render props
  level: PropTypes.number, // starting level
  maxLevel: PropTypes.number, // maximum initialized level
  node: PropTypes.object, // object to be passed to render prop
  onDrop: PropTypes.func, // onDrop event handler
  onGetData: PropTypes.func, // get data promise
  sort: PropTypes.func
}

TreeRow.defaultProps = {
  canExpand: () => false,
  children: null,
  level: 0,
  maxLevel: 0,
  node: {},
  onDrop: () => {},
  onGetData: async () => [],
  sort: () => true
}

export default TreeRow
