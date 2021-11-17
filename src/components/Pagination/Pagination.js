export default function Pagination({ numRows, rowsLimit, activePage, setPageNum}) {

    let pages = [], i = 0
    do {
        i++
        pages.push(i)
    } while (i*rowsLimit < numRows)

    return (
        <nav aria-label="Page navigation" className="d-flex justify-content-center">
            <ul class="pagination">
                { pages.map((page, index)  => {
                    let liClass = "page-item"
                    if (page === activePage) liClass += " active"

                    return (
                        <li class={liClass} key={index}>
                            <button class="page-link" onClick={() => setPageNum(page)}>{ page }</button>
                        </li>
                    )
                }
                ) }
            </ul>
        </nav>
    )
}