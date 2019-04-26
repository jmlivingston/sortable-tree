import React, { Fragment, useState } from 'react'
import Tree from '../components/Tree'
import TreeCellExpander from '../components/TreeExpander'
import dummyData from './data.json'

const TableTreeExample = () => {
  const [nodes, setNodes] = useState({})

  const [sortInfo, setSortInfo] = useState({
    property: 'title',
    isAsc: true
  })

  const styles = {
    header: {
      cursor: 'pointer'
    }
  }

  const getData = async ({ id = '0' }) => {
    return await new Promise(resolve => {
      let filteredData = dummyData.filter(d => d.parentId === id)
      resolve(filteredData)
    })
  }

  const sort = (a, b) =>
    sortInfo.isAsc
      ? a[sortInfo.property] > b[sortInfo.property]
        ? 1
        : -1
      : a[sortInfo.property] > b[sortInfo.property]
      ? -1
      : 1

  const onHeaderClick = ({ property }) => {
    setSortInfo({
      ...sortInfo,
      property,
      isAsc: sortInfo.property === property ? !sortInfo.isAsc : true
    })
  }

  const Expander = ({ property }) =>
    sortInfo.property === property ? sortInfo.isAsc ? <span>▼</span> : <span>▲</span> : null

  return (
    <Fragment>
      <h2>Table Example (with sorting)</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th style={styles.header}>
              <span onClick={() => onHeaderClick({ property: 'title' })}>
                Title <Expander property="title" />
              </span>
            </th>
            <th style={styles.header}>
              <span onClick={() => onHeaderClick({ property: 'id' })}>
                ID <Expander property="id" />
              </span>
            </th>
            <th style={styles.header}>
              <span onClick={() => onHeaderClick({ property: 'isFolder' })}>
                Is Folder? <Expander property="isFolder" />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <Tree
            canExpand={node => node.isFolder}
            getData={node => getData(node)}
            idProperty="id"
            nodes={nodes}
            setNodes={setNodes}
            sort={sort}>
            {({ node, level, onExpand, isExpanded, isExpandable }) => (
              <tr>
                <td style={{ whiteSpace: 'nowrap', width: '1px' }}>
                  <TreeCellExpander
                    level={level}
                    onExpand={onExpand}
                    isExpanded={isExpanded}
                    isExpandable={isExpandable}>
                    <span onClick={onExpand}>{node.value.title}</span>
                  </TreeCellExpander>
                </td>
                <td>{node.value.id}</td>
                <td>{node.value.isFolder.toString()}</td>
              </tr>
            )}
          </Tree>
        </tbody>
      </table>
      <hr />
      <h2>nodes (count: {Object.keys(nodes).length})</h2>
      <pre>
        <code>{JSON.stringify(nodes, null, 2)}</code>
      </pre>
    </Fragment>
  )
}

export default TableTreeExample
