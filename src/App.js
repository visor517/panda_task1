import TodoRow from './Todo/TodoRow'
import TodoColName from './Todo/TodoColName'

function App() {
  const data = [
    { id: 1, name: 'Karl', age: 23},
    { id: 2, name: 'Luci', age: 24},
    { id: 3, name: 'Bob', age: 16},
    { id: 4, name: 'Player', age: 56},
    { id: 5, name: 'User', age: 17}
  ]

  return (
    <div className='wrapper'>
      <h1>Таблица</h1>
      <table className="react_table">
        <thead>
          <tr>
            { Object.keys(data[0]).map((keyName, index) => {return <TodoColName name={keyName} key={index} />} )}
          </tr>
        </thead>
        <tbody>
          { data.map(item => {
            return <TodoRow item={item} key={item.id} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App;
