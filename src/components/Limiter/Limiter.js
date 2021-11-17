export default function Limiter({ limit, setLimit }) {

    function handler (number) {
        if (number >= 10 && number <=100) {
            setLimit(number)
        }
    }
   
    return (
        <div>
            10 - 100 :
            <input type="number" min="10" max="100" className="ms-2" defaultValue={limit} onChange={e => handler(e.target.value)} />
        </div>
    )
}