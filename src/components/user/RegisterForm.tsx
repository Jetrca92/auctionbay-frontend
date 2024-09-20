import { FC } from 'react'
import { observer } from 'mobx-react'
import styles from 'styles/scss/Authentication.module.scss'

const RegisterForm: FC = () => {
  return (
    <>
      <div className={styles.registerFormContainer}>
        <div className={styles.registerFormTitle}>
          <h1>Hello!</h1>
          Please enter your details
        </div>

        <form
          className={styles.registerFormBody}
          action="/register"
          method="POST"
        >
          <div className={styles.formInputs}>
            <div className={styles.formGroupTwo}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="name">
                  Name
                </label>
                <input
                  className={styles.formInput}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="surname">Surname</label>
                <input
                  className={styles.formInput}
                  type="text"
                  id="surname"
                  name="surname"
                  placeholder="Enter your surname"
                  required
                />
              </div>
            </div>

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

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="repeat-password">
                Repeat Password:
              </label>
              <input
                className={styles.formInput}
                type="password"
                id="repeat-password"
                name="repeat_password"
                placeholder="Repeat your password"
                required
              />
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

export default observer(RegisterForm)
