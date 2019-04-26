import React, { Fragment, useState } from 'react'
import Expander from '../components/Expander'
import Tree from '../components/Tree'
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

  const Sorter = ({ property }) =>
    sortInfo.property === property ? sortInfo.isAsc ? <span>▼</span> : <span>▲</span> : null

  return (
    <Fragment>
      <h2>Table Example (with sorting)</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th style={styles.header}>
              <span onClick={() => onHeaderClick({ property: 'title' })}>
                Title <Sorter property="title" />
              </span>
            </th>
            <th style={styles.header}>
              <span onClick={() => onHeaderClick({ property: 'id' })}>
                ID <Sorter property="id" />
              </span>
            </th>
            <th style={styles.header}>
              <span onClick={() => onHeaderClick({ property: 'isFolder' })}>
                Is Folder? <Sorter property="isFolder" />
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
                  <Expander level={level} onExpand={onExpand} isExpanded={isExpanded} isExpandable={isExpandable}>
                    <span onClick={onExpand}>{node.value.title}</span>
                  </Expander>
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
