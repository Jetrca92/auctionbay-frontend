import { routes } from 'constants/routesConstants'
import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from 'styles/scss/ProfilePageLayout.module.scss'

interface Props {
  children: ReactNode | ReactNode[]
}

const Content: FC<Props> = ({ children }) => {
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
      {children}
    </div>
  )
}

export default Content
