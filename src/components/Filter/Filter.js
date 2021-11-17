export default function Filter({ onChange }) {

    return (
        <div>
            <span>Фильтр: </span><input onChange={e => onChange(e.target.value.toLowerCase())}></input>
        </div>
    )
}