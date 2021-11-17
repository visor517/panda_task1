export default function Pagination({ numRows, rowsLimit, activePage, setPageNum}) {

    let pages = [], i = 0
    do {
        i++
        pages.push(i)
    } while (i*rowsLimit < numRows)

    function paginationHandler(e, page) {
        setPageNum(page)
        e.target.blur() // убирает фокус после нажатия тк кнопка поменяет назначение
    }

    return (
        <nav aria-label="Page navigation" className="d-flex justify-content-center">
            <ul class="pagination">
                { pages.filter(page => {    // оставляет первую, последнию и по 4 соседних
                        if (pages.length > 11) {
                            if (page !== 1 && page !== pages.length && (page < activePage - 4 || page > activePage + 4)) {
                                return false
                            }
                        }
                        return true
                    })
                    .map((page, index)  => {
                        let liClass = "page-item"
                        if (page === activePage) liClass += " active"

                        return (
                            <li class={liClass} key={index}>
                                <button class="page-link" onClick={e => paginationHandler(e, page)}>{ page }</button>
                            </li>
                        )
                }
                ) }
            </ul>
        </nav>
    )
}