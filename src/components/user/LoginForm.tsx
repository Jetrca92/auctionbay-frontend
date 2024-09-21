import { FC } from 'react'
import { observer } from 'mobx-react'
import styles from 'styles/scss/Authentication.module.scss'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routesConstants'

const LoginForm: FC = () => {
  return (
    <>
      <div className={styles.loginFormContainer}>
        <div className={styles.loginFormTitle}>
          <h1>Welcome back!</h1>
          Please enter your details
        </div>

        <form
          className={styles.registerFormBody}
          action="/register"
          method="POST"
        >
          <div className={styles.formInputs}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <input
                className={styles.formInput}
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="password">
                Password:
              </label>
              <input
                className={styles.formInput}
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className={styles.forgotPasswordText}>
              <Link
                to={routes.FORGOT_PASSWORD}
                className="nav-link"
                style={{ color: '#74817F' }}
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button className={styles.registerButton} type="submit">
            Sign up
          </button>
        </form>
      </div>
    </>
  )
}

export default observer(LoginForm)
