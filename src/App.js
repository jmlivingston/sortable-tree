import React, { useState } from 'react'
import ListTreeExample from './examples/ListTreeExample'
import TableTreeExample from './examples/TableTreeExample'

const App = () => {
  const [showTable, setShowTable] = useState(false) // change to show default example
  return (
    <div className="container-fluid mt-3">
      <h1>Tree & Expander Components</h1>
      <hr />
      <button className={`btn btn-${!showTable ? 'primary' : 'secondary'} mr-2`} onClick={() => setShowTable(false)}>
        List Example
      </button>
      <button className={`btn btn-${showTable ? 'primary' : 'secondary'}`} onClick={() => setShowTable(true)}>
        Table Example
      </button>
      <hr />
      {showTable && <TableTreeExample />}
      {!showTable && <ListTreeExample />}
    </div>
  )
}

export default App
