import styles from './ColName.module.css'

export default function ColName({ keyName, onClick, arrow }) {

    let classes = [styles.pointer]
    if (arrow === true) classes.push(styles.ascending)
    if (arrow === false) classes.push(styles.descending)
   
    return (
        <th scope="col" className={classes.join(' ')} onClick={() => onClick(keyName)}>{ keyName }</th>
    )
}