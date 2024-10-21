import { routes } from 'constants/routesConstants'
import { FC, ReactNode, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from 'styles/scss/ProfilePageLayout.module.scss'

interface Props {
  children: ReactNode | ReactNode[]
}

const Content: FC<Props> = ({ children }) => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('')

  useEffect(() => {
    if (location.pathname === routes.PROFILE) {
      setActiveTab('profile')
    } else if (location.pathname === routes.BIDDING) {
      setActiveTab('bidding')
    } else if (location.pathname === routes.WON) {
      setActiveTab('won')
    }
  }, [location.pathname])

  return (
    <div className={styles.content}>
      <div className={styles.tabBar}>
        <div className={styles.tabContainer}>
          <Link
            className={
              activeTab === 'profile' ? styles.tabDark : styles.tabGrey
            }
            to={routes.PROFILE}
            onClick={() => setActiveTab('profile')}
          >
            My auctions
          </Link>
          <Link
            className={
              activeTab === 'bidding' ? styles.tabDark : styles.tabGrey
            }
            to={routes.BIDDING}
            onClick={() => setActiveTab('bidding')}
          >
            Bidding
          </Link>
          <Link
            className={activeTab === 'won' ? styles.tabDark : styles.tabGrey}
            to={routes.WON}
            onClick={() => setActiveTab('won')}
          >
            Won
          </Link>
        </div>
      </div>
      {children}
    </div>
  )
}

export default Content
