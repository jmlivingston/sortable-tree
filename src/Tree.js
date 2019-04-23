import React, {Fragment, useEffect, useState} from 'react'

const Tree = ({children, node, getData, level, sort, onDrop, canExpand, treeKey = 0}) => {
  const [nodes, setNodes] = useState({[treeKey]: []})
  const [expandedNodes, setExpandedNodes] = useState({})

  const loadData = async ({node, key}) =>
    setNodes({
      ...nodes,
      [key]: (await getData(node)).reduce(
        (acc, value, index) => ({
          ...acc,
          [key + 1 + index]: value
        }),
        {}
      )
    })

  useEffect(() => {
    ;(async () => await loadData({node, key: treeKey}))()
  }, [])

  const renderTree = (key, level) =>
    nodes[key] &&
    Object.keys(nodes[key])
      .map(childKey => ({...nodes[key][childKey], childKey}))
      .sort(sort)
      .map((node, index) => (
        <Fragment key={index}>
          <tr key={index}>
            {children({
              node,
              level,
              canExpand: canExpand,
              isExpandable: canExpand(node),
              onExpand: async () => {
                setExpandedNodes({
                  ...expandedNodes,
                  [node.childKey]: expandedNodes[node.childKey] === undefined ? true : !expandedNodes[node.childKey]
                })
                loadData({node, key: node.childKey})
              },
              isExpanded: expandedNodes[node.childKey] || false
            })}
          </tr>
          {expandedNodes[node.childKey] && renderTree(node.childKey, level + 1)}
        </Fragment>
      ))

  return renderTree(treeKey, level)
}

export default Tree
