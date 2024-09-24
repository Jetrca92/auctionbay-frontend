import { FC } from 'react'
import styles from 'styles/scss/Auctions.module.scss'

const TitleComponent: FC = () => {
  return (
    <div className={styles.titleComponent}>
      <h1 className={styles.titleText}>Auctions</h1>
    </div>
  )
}

export default TitleComponent
