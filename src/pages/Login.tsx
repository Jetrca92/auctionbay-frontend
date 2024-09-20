import styles from 'styles/scss/Authentication.module.scss'
import { FC } from 'react'
import AuthImgLeft from 'components/user/AuthImgLeft'
import logo from 'styles/images/logo.svg'
import LoginForm from 'components/user/LoginForm'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routesConstants'

const Login: FC = () => {
  return (
    <div className={styles.authPage}>
      <AuthImgLeft />
      <div className={styles.innerDiv}>
        <div className={styles.rightSide}>
          <div className={styles.authContainer}>
            <div className={styles.logo}>
              <img src={logo} alt="logo" />
            </div>
            <LoginForm />
            <div>
              Don&apos;t have an account?{' '}
              <Link className="nav-link" to={routes.SIGNUP}>
                <b>Sign Up</b>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
