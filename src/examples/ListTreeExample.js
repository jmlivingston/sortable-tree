import React, { Fragment, useState } from 'react'
import Expander from '../components/Expander'
import Tree from '../components/Tree'
import dummyData from './data.json'

const ListTreeExample = () => {
  const [nodes, setNodes] = useState({})

  const getData = async ({ id = '0' }) => {
    return await new Promise(resolve => {
      let filteredData = dummyData.filter(d => d.parentId === id)
      resolve(filteredData)
    })
  }

  const sort = (a, b) => (a.title > b.title ? 1 : -1)

  return (
    <Fragment>
      <h2>List Example (with custom icons)</h2>
      <Tree
        canExpand={node => node.isFolder}
        getData={node => getData(node)}
        idProperty="id"
        nodes={nodes}
        setNodes={setNodes}
        sort={sort}>
        {({ node, level, onExpand, isExpanded, isExpandable }) => (
          <div className="my-3">
            <Expander
              iconClosed={<span>▶</span>}
              iconOpened={<span>▼</span>}
              isExpandable={isExpandable}
              isExpanded={isExpanded}
              level={level}
              onExpand={onExpand}>
              <span onClick={onExpand}>{node.value.title}</span>
            </Expander>{' '}
            ({node.value.id} - {node.value.isFolder.toString()})
          </div>
        )}
      </Tree>
      <hr />
      <h2>nodes (count: {Object.keys(nodes).length})</h2>
      <pre>
        <code>{JSON.stringify(nodes, null, 2)}</code>
      </pre>
    </Fragment>
  )
}

export default ListTreeExample
