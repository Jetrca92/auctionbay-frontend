import { FC } from 'react'
import { observer } from 'mobx-react'
import styles from 'styles/scss/Authentication.module.scss'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import chevron from 'styles/images/chevron.svg'

const ForgotPasswordForm: FC = () => {
  return (
    <>
      <div className={styles.passwordFormContainer}>
        <div className={styles.passwordFormTitle}>
          <h1>Forgot password?</h1>
          <div>No worries, we will send you reset instructions</div>
        </div>

        <form
          className={styles.passwordFormBody}
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

            <button className={styles.registerButton} type="submit">
              Reset password
            </button>
          </div>
        </form>
        <Link className="nav-link" to={routes.LOGIN}>
          <div className={styles.backTextDiv}>
            <img src={chevron} className={styles.chevronImg} alt="chevron" />
            <div>Back to login</div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default observer(ForgotPasswordForm)
