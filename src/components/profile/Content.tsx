import { routes } from 'constants/routesConstants'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from 'styles/scss/ProfilePage.module.scss'

const Content: FC = () => {
  return (
    <div className={styles.content}>
      <div className={styles.tabBar}>
        <div className={styles.tabContainer}>
          <Link className={styles.tabDark} to={routes.PROFILE}>
            My auctions
          </Link>
          <Link className={styles.tabGrey} to={routes.BIDDING}>
            Bidding
          </Link>
          <Link className={styles.tabGrey} to={routes.WON}>
            Won
          </Link>
        </div>
      </div>
      <div className={styles.tabContent}></div>
    </div>
  )
}

export default Content
