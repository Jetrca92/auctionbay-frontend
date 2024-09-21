import { FC } from 'react'
import styles from 'styles/scss/Navbar.module.scss'
import logoImg from 'styles/images/logo.svg'
import personIcon from 'styles/images/person.png'
import houseIcon from 'styles/images/house.png'
import bellIcon from 'styles/images/bell.png'
import addIcon from 'styles/images/add.png'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routesConstants'

const isAuthenticated = true

const Navbar: FC = () => {
  return (
    <>
      <div className={styles.navbar}>
        {isAuthenticated ? (
          <>
            <div className={styles.leftNavigation}>
              <div className={styles.logoDiv}>
                <img src={logoImg} alt="logo" />
              </div>
              <div className={styles.navigationTab}>
                <div className={styles.leftTab}>
                  <img src={houseIcon} alt="home" />
                  <div className={styles.leftTabLabel}>Auctions</div>
                </div>
                <div className={styles.rightTab}>
                  <img src={personIcon} alt="home" />
                  <div className={styles.rightTabLabel}>Profile</div>
                </div>
              </div>
            </div>
            <div className={styles.rightNavigation}>
              <div className={styles.ctaButton1}>
                <img src={bellIcon} alt="bell" />
              </div>
              <div className={styles.ctaButton2}>
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
