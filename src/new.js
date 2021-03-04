var items = [
    {name: "Миша", age: 23},
    {name: "Вася", age: 44},
    {name: "Саша", age: 2},
    {name: "Рома", age: 99},
    {name: "Ашот", age: 19}
  ];

items.sort(( a, b ) => (a.name > b.name) ? -1 : 1)

console.log( items )