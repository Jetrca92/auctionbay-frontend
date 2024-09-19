import { FC } from 'react'
import styles from 'styles/scss/Navbar.module.scss'
import logoImg from 'styles/images/logo.svg'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
const Navbar: FC = () => {
  return (
    <>
      <div className={styles.navbar}>
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
      </div>
    </>
  )
}

export default Navbar
