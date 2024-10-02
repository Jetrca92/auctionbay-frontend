import { FC, useEffect, useState } from 'react'
import styles from 'styles/scss/Navbar.module.scss'
import logoImg from 'styles/images/logo.svg'
import personIcon from 'styles/images/person.png'
import personIconBlack from 'styles/images/personBlack.png'
import houseIcon from 'styles/images/house.png'
import houseIconWhite from 'styles/images/house-white.png'
import bellIcon from 'styles/images/bell.png'
import addIcon from 'styles/images/add.png'
import { Link, useLocation } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import authStore from 'stores/auth.store'

interface NavbarProps {
  toggleOverlay: () => void
}
const Navbar: FC<NavbarProps> = ({ toggleOverlay }) => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('')

  useEffect(() => {
    if (location.pathname.startsWith(routes.PROFILE)) {
      setActiveTab('profile')
    } else if (location.pathname === routes.AUCTIONS) {
      setActiveTab('auctions')
    }
  }, [location.pathname])

  return (
    <>
      <div className={styles.navbar}>
        {authStore.user ? (
          <>
            <div className={styles.leftNavigation}>
              <div className={styles.logoDiv}>
                <img src={logoImg} alt="logo" />
              </div>
              <div className={styles.navigationTab}>
                <Link
                  className={
                    activeTab === 'auctions'
                      ? styles.activeTab
                      : styles.inactiveTab
                  }
                  to={routes.AUCTIONS}
                >
                  <img
                    src={activeTab === 'auctions' ? houseIconWhite : houseIcon}
                    alt="home"
                  />
                  <div
                    className={
                      activeTab === 'auctions'
                        ? styles.activeTabLabel
                        : styles.inactiveTabLabel
                    }
                  >
                    Auctions
                  </div>
                </Link>
                <Link
                  className={
                    activeTab === 'profile'
                      ? styles.activeTab
                      : styles.inactiveTab
                  }
                  to={routes.PROFILE}
                >
                  <img
                    src={activeTab === 'profile' ? personIcon : personIconBlack}
                    alt="profile"
                    className={
                      activeTab === 'profile'
                        ? styles.activeIcon
                        : styles.inactiveIcon
                    }
                  />
                  <div
                    className={
                      activeTab === 'profile'
                        ? styles.activeTabLabel
                        : styles.inactiveTabLabel
                    }
                  >
                    Profile
                  </div>
                </Link>
              </div>
            </div>
            <div className={styles.rightNavigation}>
              <div className={styles.ctaButton1}>
                <img src={bellIcon} alt="bell" />
              </div>
              <div className={styles.ctaButton2} onClick={toggleOverlay}>
                <img src={addIcon} alt="add" />
              </div>
              <div className={styles.ctaButton1}>
                <img src={personIcon} alt="person" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.logoDiv}>
              <img src={logoImg} alt="logo" />
            </div>
            <div className={styles.signupDiv}>
              <Link className="nav-link" to={routes.LOGIN}>
                <b>Log in</b>
              </Link>{' '}
              or
              <Link className={styles.signupButton} to={routes.SIGNUP}>
                Sign up
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Navbar
