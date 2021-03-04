export default function TodoPagination({ numRows, onClick}) {

    let pages = [], i = 0
    do {
        i++
        pages.push(i)
    } while (i*4 < numRows)

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