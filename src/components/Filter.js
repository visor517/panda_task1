export default function Filter({ onChange }) {

    return (
        <div className="reactTable_settings">
            <span>Фильтр: </span><input id="reactTable_filter" onChange={e => onChange(e.target.value.toLowerCase())}></input>
        </div>
    )
}