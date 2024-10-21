import styles from 'styles/scss/Authentication.module.scss'
import RegisterForm from 'components/user/RegisterForm'
import { FC } from 'react'

import logo from 'styles/images/logo.svg'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import AuthPageLayout from 'components/user/AuthPageLayout'

const Register: FC = () => {
  return (
    <AuthPageLayout>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <RegisterForm />
      <div>
        Already have an account?{' '}
        <Link className="nav-link" to={routes.LOGIN}>
          <b>Log in</b>
        </Link>
      </div>
    </AuthPageLayout>
  )
}

export default Register
