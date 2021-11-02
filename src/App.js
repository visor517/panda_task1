import React, {useState, useEffect} from 'react'
import ColName from './components/ColName'
import Pagination from './components/Pagination'
import Filter from './components/Filter'
import Row from './components/Row'

function App() {
  
  const ROWSLIMIT = 50
  
  let tableName = 'Таблица'
  const [sortSettings, setSortSettings] = useState({
    sortBy: undefined,
    isIncrease: true 
  })
  const [rows, setRows] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [filterText, setFilterText] = useState('')
  
  function changePage(pageNum = 1) {
    setPageNum(pageNum)
  }

  function changeSort(keyName) {
    if (sortSettings.sortBy === keyName) {
      setSortSettings(oldSort => ({ ...oldSort, 'isIncrease': !oldSort.isIncrease}))
    }
    else setSortSettings({sortBy: keyName, isIncrease: true})
  }

  function getData() {
    // по идее получаем данные с api
    const JSON_DATA = require('./data.json')
    return {
      tableName: JSON_DATA.tableName,
      rows: JSON_DATA.content
    }    
  }

  useEffect(() => {
    const result = getData()
    tableName = result.tableName
    setRows(result.rows)
  }, [])

  return (
    <div className='wrapper'>
      <h1>{tableName}</h1>
      <Filter onChange={setFilterText}/>
      <table className="reactTable">
        <thead>
          <tr>
            { rows[0] && Object.keys(rows[0]).map(keyName => {
              let arrow = keyName == sortSettings.sortBy ? sortSettings.isIncrease : undefined
              return <ColName keyName={keyName} key={keyName} onClick={changeSort} arrow={arrow} />
            })}
          </tr>
        </thead>  
        <tbody>
          { rows.filter(row => row.name.indexOf(filterText) != -1)
                .filter((row, index) => index >= (pageNum - 1) * ROWSLIMIT && index < pageNum * ROWSLIMIT)
                .map(row => <Row item={row} key={row.id} />)}
        </tbody>
      </table>
      <Pagination numRows={rows.length} rowsLimit={ROWSLIMIT} onClick={changePage} />
    </div>
  )
}

export default App
