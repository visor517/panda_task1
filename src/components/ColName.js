export default function ColName({ keyName, onClick, arrow }) {
    
    const classes = []

    if (arrow === true) classes.push('ascending')
    else if (arrow === false) classes.push('descending')

    return (
        <td className={classes.join(" ")} onClick={() => onClick(keyName)}>{ keyName }</td>
    )
}