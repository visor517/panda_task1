export default function TodoColName({ keyName, onClick, sorting }) {
    
    const classes = []

    if (sorting[0] == keyName) {
        if (sorting[1]) classes.push('ascending')
        else classes.push('descending')
    }

    return (
        <td className={classes.join(" ")} onClick={() => onClick(keyName)}>{ keyName }</td>
    )
}