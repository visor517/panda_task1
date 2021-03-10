export default function TodoFilter({ onChange }) {

    return (
        <div className="reactTable_settings">
            <span>Фильтр: </span><input id="reactTable_filter" onChange={() => onChange(document.getElementById("reactTable_filter").value.toLowerCase())}></input>
        </div>
    )
}