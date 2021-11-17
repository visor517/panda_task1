export default function Pagination({ numRows, rowsLimit, onClick}) {

    let pages = [], i = 0
    do {
        i++
        pages.push(i)
    } while (i*rowsLimit < numRows)

    return (
        <ul className="reactTable_pagination">
            { pages.map((page, index)  => {
                return (
                    <li key={index} onClick={() => onClick(page)}>{ page }</li>
                )
            }
            ) }
        </ul>
    )
}