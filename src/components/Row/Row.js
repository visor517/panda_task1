export default function Row({ item }) {
    return (
        <tr>
            {Object.values(item).map((value,val_i) => <td key={val_i}>{value}</td>)}
        </tr>
    )
}