import styles from 'styles/scss/Authentication.module.scss'
import { FC } from 'react'
import logo from 'styles/images/logo.svg'
import LoginForm from 'components/user/LoginForm'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import AuthPageLayout from 'components/user/AuthPageLayout'

const Login: FC = () => {
  return (
    <AuthPageLayout>
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
    </AuthPageLayout>
  )
}

export default Login
