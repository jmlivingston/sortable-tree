import React, {useState} from 'react'
import dummyData from './data.json'
import Tree from './Tree'
import TreeCellExpander from './TreeExpander'

const Tester = () => {
  const [nodes, setNodes] = useState()

  const [sortInfo, setSortInfo] = useState({
    property: 'title',
    isAsc: true
  })

  const styles = {
    header: {
      cursor: 'pointer'
    }
  }

  const getData = async ({id}) => {
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

  const onHeaderClick = ({property}) => {
    setSortInfo({
      ...sortInfo,
      property,
      isAsc: sortInfo.property === property ? !sortInfo.isAsc : true
    })
  }

  const onDrop = evt => {
    evt.preventDefault()
    if (evt.nodesTransfer.items) {
      for (let i = 0; i < evt.nodesTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (evt.nodesTransfer.items[i].kind === 'file') {
          const file = evt.nodesTransfer.items[i].getAsFile()
          console.log(file.name)
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < evt.nodesTransfer.files.length; i++) {
        console.log(evt.nodesTransfer.files[i].name)
      }
    }
  }

  const Expander = ({property}) =>
    sortInfo.property === property ? sortInfo.isAsc ? <span>▼</span> : <span>▲</span> : null

  return (
    <table className='table table-bordered'>
      <thead>
        <tr>
          <th style={styles.header}>
            <span onClick={() => onHeaderClick({property: 'title'})}>
              Title <Expander property='title' />
            </span>
          </th>
          <th style={styles.header}>
            <span onClick={() => onHeaderClick({property: 'id'})}>
              ID <Expander property='id' />
            </span>
          </th>
          <th style={styles.header}>
            <span onClick={() => onHeaderClick({property: 'isFolder'})}>
              Is Folder? <Expander property='isFolder' />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <Tree
          canExpand={node => node.isFolder}
          getData={getData}
          isInitialExpanded={true}
          level={0}
          node={{id: '0'}}
          nodes={nodes}
          setNodes={setNodes}
          onDrop={onDrop}
          sort={sort}>
          {({node, level, onExpand, canExpand, isExpanded, isExpandable, childNodes}) => (
            <tr>
              <td style={{whiteSpace: 'nowrap', width: '1px'}}>
                <TreeCellExpander level={level} onExpand={onExpand} isExpanded={isExpanded} isExpandable={isExpandable}>
                  <span onClick={onExpand}>{node.value.title}</span>
                </TreeCellExpander>
              </td>
              <td>{node.id}</td>
              <td>{node.value.isFolder.toString()}</td>
            </tr>
          )}
        </Tree>
      </tbody>
    </table>
  )
}

export default Tester
