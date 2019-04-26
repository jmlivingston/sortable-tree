import PropTypes from 'prop-types'
import React, { Fragment, useEffect } from 'react'
import uuid from 'uuid/v4'

const rootParentId = uuid()

const Tree = ({ canExpand, children, getData, idProperty, nodes, setNodes, sort }) => {
  const loadData = async ({ node, parentId, level }) => {
    const data = await getData(node) // TODO: Add configurable memoization

    // Toggle parent expanding if it exists
    const updatedParent = nodes[parentId] && {
      [parentId]: {
        ...nodes[parentId],
        isExpanded: !nodes[parentId].isExpanded
      }
    }

    // Tranform data into parent / child
    const transformedData = data.reduce(
      (acc, value) => ({
        ...acc,
        [value[idProperty]]: {
          ...nodes[value[idProperty]],
          parentId,
          level,
          value,
          isExpanded: false
        }
      }),
      {}
    )

    setNodes({
      ...nodes,
      ...updatedParent,
      ...transformedData
    })
  }

  useEffect(() => {
    ;(async () => await loadData({ node: {}, parentId: rootParentId, level: 0 }))()
    // TODO: Cleanup async...await
    // TODO: Fix lint rule below. Call loadData once on load, but also from children *
    //// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderTree = (id, level) => {
    const filteredNodes = nodes
      ? Object.keys(nodes)
          .filter(key => (nodes[key].parentId === rootParentId && level === 0 ? true : nodes[key].parentId === id))
          .map(key => nodes[key])
          .sort((a, b) => sort(a.value, b.value))
      : []

    // Always expand if root, otherwise look if parent isExpanded
    return filteredNodes.map((node, index) => {
      return (
        (node.parentId === rootParentId ? true : nodes[node.parentId].isExpanded) && (
          <Fragment key={index}>
            {children({
              node,
              level: node.level,
              canExpand: canExpand,
              isExpandable: canExpand(node.value),
              // * - Calls loadData here
              onExpand: () => loadData({ node: node.value, parentId: node.value[idProperty], level: node.level + 1 }),
              isExpanded: nodes[node.value[idProperty]].isExpanded
            })}
            {nodes[node.value[idProperty]].isExpanded && renderTree(node.value[idProperty], node.level + 1)}
          </Fragment>
        )
      )
    })
  }

  return renderTree(0, 0)
}

Tree.propTypes = {
  canExpand: PropTypes.func, // params: node value
  children: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired, // params: node value
  idProperty: PropTypes.string.isRequired, // unique property defined in data
  nodes: PropTypes.oneOfType([PropTypes.shape({})]), // TODO: also allow tranformed node shape (see below.)
  setNodes: PropTypes.func.isRequired, // for setting nodes
  sort: PropTypes.func // array sort function
}

Tree.defaultProps = {
  canExpand: () => true
}

export default Tree

// Transformed Node Shape
// {
//   "unique id 1": {
//     "parentId": PropTypes.string,
//     "level": PropTypes.number,
//     "value": PropTypes.object, // actual value
//     "isExpanded": PropTypes.bool
//   },
//   "unique id 2": {
//     "parentId": PropTypes.string,
//     "level": PropTypes.number,
//     "value": PropTypes.object, // actual value
//     "isExpanded": PropTypes.bool
//   }
// }
