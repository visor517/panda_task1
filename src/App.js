import TodoRow from './Todo/TodoRow'
import TodoColName from './Todo/TodoColName'
import TodoPagination from './Todo/TodoPagination'
let jsonTable = require('./data.json')
let rows = jsonTable.content

function App() {
  const rowsLimit = 4
  let startRow = 0
  let rowsForView = jsonTable.content.slice(startRow, startRow + rowsLimit)

  function changePage(page) {
    startRow = 0 + (page - 1)*rowsLimit
  }

  return (
    <div className='wrapper'>
      <h1>{ jsonTable.tableName }</h1>
      <table className="reactTable">
        <thead>
          <tr>
            { Object.keys(rows[0]).map((keyName, index) => {return <TodoColName name={keyName} key={index} />} )}
          </tr>
        </thead>
        <tbody>
          { rowsForView.map(item => {
            return <TodoRow item={item} key={item.id} />
          })}
        </tbody>
      </table>
      <TodoPagination numRows={rows.length} onClick={changePage} />
    </div>
  )
}

export default App;
