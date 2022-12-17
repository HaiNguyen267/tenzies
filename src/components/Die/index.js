import './style.css'

export default function Die({index, value, green, handleClick}) {
    const greenBackground = green ? 'green' : ''
    return (
        <div 
            className={`Die ${greenBackground}`}
            onClick={e => handleClick(e, index)}
        >
            <p>{value}</p>
        </div>
    )
}