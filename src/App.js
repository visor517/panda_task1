import React, {useState} from 'react'
import TodoColName from './Todo/TodoColName'
import TodoPagination from './Todo/TodoPagination'
import TodoFilter from './Todo/TodoFilter'
import TodoRow from './Todo/TodoRow'

let jsonTable = require('./data.json')
let rows = jsonTable.content
let rowsPrepared = rows

const ROWSLIMIT = 50

function App() {
  
  const [sortSet, setSortSet] = useState([undefined, true])  // в первом элементе колонка сортировки, во втором направление сортировки
  const [page, setPage] = useState(rows.slice(0,50))
  
  function changePage(pageNum = 1) {
    setPage(rowsPrepared.slice((pageNum - 1) * ROWSLIMIT, pageNum * ROWSLIMIT))
  }

  function doPreparation(template = "") {
    let rowsFiltered = rows.filter(item => {
      for (let key in item) {
        if (String(item[key]).toLowerCase().indexOf(template) !== -1) return true
      }
      return false 
    })
    sortSet[0] ? doSorting(sortSet[0], sortSet[1], rowsFiltered) : rowsPrepared = rowsFiltered
  }

  function selectSortSet(keyName) {
    if ((sortSet[0] === keyName) && sortSet[1]) {
      setSortSet([keyName, false])
      doSorting(keyName, false)
    }
    else {
      setSortSet([keyName, true])
      doSorting(keyName, true)
    }
  }

  function doSorting(keyName,wayOfSort, rowsForSort = rowsPrepared) {
    rowsPrepared = wayOfSort ? rowsForSort.sort((a, b) => (a[keyName] < b[keyName]) ? -1 : 1)
                             : rowsForSort.sort((a, b) => (a[keyName] > b[keyName]) ? -1 : 1)
    changePage()
  }

  return (
    <div className='wrapper'>
      <h1>{jsonTable.tableName}</h1>
      <TodoFilter onChange={doPreparation}/>
      <table className="reactTable">
        <thead>
          <tr>
            { Object.keys(rows[0]).map((keyName, col_i) => {return <TodoColName keyName={keyName} key={col_i} onClick={selectSortSet} sorting={sortSet}/>} )}
          </tr>
        </thead>  
        <tbody>
          { page.map((item,row_i) => <TodoRow item={item} key={row_i} />)}
        </tbody>
      </table>
      <TodoPagination numRows={rows.length} rowsLimit={ROWSLIMIT} onClick={changePage} />
    </div>
  )
}

export default App;
