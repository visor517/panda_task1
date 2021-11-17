import React, {useState, useEffect} from 'react'
// import axios from 'axios'
import ColName from './components/ColName/ColName'
import Pagination from './components/Pagination/Pagination'
import Filter from './components/Filter/Filter'
import Limiter from './components/Limiter/Limiter'
import Row from './components/Row/Row'

function App() {
  
  const [tableName, setTableName] = useState('Таблица')
  const [rows, setRows] = useState([])
  
  // отфильтрованные, отсортированные
  const [preparedRows, setPreparedRows] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [rowsLimit, setRowsLimit] = useState(50)
  const [filterText, setFilterText] = useState('')
  const [sortSettings, setSortSettings] = useState({
    sortBy: undefined,
    isIncrease: true 
  })

  function changeSort(keyName) {
    if (sortSettings.sortBy === keyName) {
      setSortSettings(oldSort => ({ ...oldSort, 'isIncrease': !oldSort.isIncrease}))
    }
    else setSortSettings({sortBy: keyName, isIncrease: true})
  }

  useEffect(() => {
    const JSON_DATA = require('./data.json')
    
    setTableName(JSON_DATA.tableName)
    setRows(JSON_DATA.content)
  },[])

  // useEffect(() => {
  //   axios('api/data')
  //   .then(
  //     res => {
  //       setRows(res.data.content)
  //       setTableName(res.data.tableName)
  //     },
  //     err => console.log('Ошибка получения данных')
  //   )
  // }, [])

  // обработка данных при изменении фильтра или сортировки
  useEffect(() => {
    setPreparedRows(
      rows.filter(row =>     // ищем вхождение фильтра в одно из полей
        Object.values(row).filter(elem => elem.toString().toLowerCase().indexOf(filterText) !== -1).length > 0
      )
      .sort((a, b) => {
        if (sortSettings.isIncrease) {
          return a[sortSettings.sortBy] < b[sortSettings.sortBy] ? -1 : 1
        }
        else {
          return a[sortSettings.sortBy] > b[sortSettings.sortBy] ? -1 : 1
        }
      })
    )
  }, [rows, filterText, sortSettings])

  // переход на первую страницу при изменении лимита вывода строк на страницу
  useEffect(() => setPageNum(1), [rowsLimit, preparedRows])

  return (
    <div className='container bg-light shadow bg-body rounded'>
      <div className='row'>
        <div className='col p-3'>
          <h1>{tableName}</h1>
          <div className="d-flex justify-content-between">
            <Filter onChange={setFilterText}/>
            <Limiter limit={rowsLimit} setLimit={setRowsLimit} />
          </div>
          {rows.length > 0 ?
            <table className="table">
              <thead>
                <tr>
                  { Object.keys(rows[0]).map(keyName => {
                    let arrow = keyName === sortSettings.sortBy ? sortSettings.isIncrease : undefined
                    return <ColName keyName={keyName} key={keyName} onClick={changeSort} arrow={arrow} />
                  })}
                </tr>
              </thead>  
              <tbody>
                { preparedRows.length > 0 ? 
                      preparedRows.filter((row, index) => index >= (pageNum - 1) * rowsLimit && index < pageNum * rowsLimit)
                      .map(row => <Row item={row} key={row.id} />) :
                  <tr><td colSpan={rows[0].length}>Нет данных</td></tr>
                }
              </tbody>
            </table> :
            <p>Загружается...</p>
          }
          <Pagination numRows={preparedRows.length} rowsLimit={rowsLimit} activePage={pageNum} setPageNum={setPageNum} />
        </div>
      </div>
    </div>
  )
}

export default App
