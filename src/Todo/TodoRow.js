export default function TodoRow({ item }) {
    return (
        <tr>
            <td>{ item.id }</td>
            <td>{ item.name }</td>
            <td>{ item.age }</td>
        </tr>
    )
}