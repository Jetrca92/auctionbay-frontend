import styles from 'styles/scss/Register.module.scss'
import RegisterForm from 'components/user/RegisterForm'
import { FC } from 'react'
import registerImg from 'styles/images/register_img.png'
import logo from 'styles/images/logo.svg'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routesConstants'

const Register: FC = () => {
  return (
    <div className={styles.registerPage}>
      <img src={registerImg} className={styles.registerImage} alt="auctions" />
      <div className={styles.registerDiv}>
        <div className={styles.rightSide}>
          <div className={styles.registerContainer}>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
