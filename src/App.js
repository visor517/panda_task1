import {useState} from 'react'
import TodoRow from './Todo/TodoRow'
import TodoColName from './Todo/TodoColName'
import TodoPagination from './Todo/TodoPagination'

let jsonTable = require('./data.json')
let rows = jsonTable.content

function App() {

  const ROWSLIMIT = 4

  const [rowsForView, setRowsForView] = useState(rows.slice(0, ROWSLIMIT))

  const [sorting, setSorting] = useState(["none", true])

  function choseView(page) {
    let startRow = 0 + (page - 1)*ROWSLIMIT
    setRowsForView(
      rows.slice(startRow, startRow + ROWSLIMIT)
    )
  }

  function makeSort(keyName) {
    if ((sorting[0] == keyName) && sorting[1]) {
      setSorting([keyName, false])
      setRowsForView(
        rows.sort((a, b) => (a[keyName] > b[keyName]) ? -1 : 1).slice(0, ROWSLIMIT)
      )
    }
    else {
      setSorting([keyName, true])
      setRowsForView(
        rows.sort((a, b) => (a[keyName] < b[keyName]) ? -1 : 1).slice(0, ROWSLIMIT)
      )
    }
    console.log(rowsForView)
  }

  return (
    <div className='wrapper'>
      <h1>{ jsonTable.tableName }</h1>
      <table className="reactTable">
        <thead>
          <tr>
            { Object.keys(rows[0]).map((keyName, index) => {return <TodoColName keyName={keyName} key={index} onClick={makeSort} sorting={sorting}/>} )}
          </tr>
        </thead>
        <tbody>
          { rowsForView.map(item => {
            return <TodoRow item={item} key={item.id} />
          })}
        </tbody>
      </table>
      <TodoPagination numRows={rows.length} onClick={choseView} />
    </div>
  )
}

export default App;
