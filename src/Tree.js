import React, {Fragment, useEffect} from 'react'

const Tree = ({children, node, nodes, setNodes, getData, level, sort, onDrop, canExpand}) => {
  const loadData = async ({node, key, level = 0}) =>
    setNodes({
      ...nodes,
      ...(key === 0
        ? {}
        : {
            [key]: {
              ...nodes[key],
              isExpanded: nodes ? (nodes[key] === undefined ? false : !nodes[key].isExpanded) : false
            }
          }),
      ...(await getData(node)).reduce(
        (acc, value, index) => ({
          ...acc,
          [value.id]: {
            ...(nodes ? nodes[value.id] || {} : {}),
            id: value.id,
            parentId: key,
            level,
            value,
            isExpanded: false
          }
        }),
        {}
      )
    })

  useEffect(() => {
    ;(async () => await loadData({node, key: 0}))()
  }, [])

  const renderTree = (id, level) =>
    nodes
      ? nodes &&
        Object.keys(nodes)
          .filter(key => (nodes[key].parentId === 0 && level === 0 ? true : nodes[key].parentId === id))
          .map(key => nodes[key])
          .sort((a, b) => sort(a.value, b.value))
          .map(
            (node, index) =>
              (node.parentId === 0 ? true : nodes[node.parentId].isExpanded) && (
                <Fragment key={index}>
                  {children({
                    node,
                    level: node.level,
                    canExpand: canExpand,
                    isExpandable: canExpand(node.value),
                    onExpand: () => loadData({node: node.value, key: node.id, level: node.level + 1}),
                    isExpanded: nodes[node.id].isExpanded || false
                  })}
                  {nodes[node.id].isExpanded && renderTree(node.id, node.level + 1)}
                </Fragment>
              )
          )
      : null

  return renderTree(0, level)
}

export default Tree
