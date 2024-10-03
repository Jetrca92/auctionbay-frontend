import { FC, useState } from 'react'
import { observer } from 'mobx-react'
import styles from 'styles/scss/Authentication.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import { LoginUserFields, useLoginForm } from 'hooks/react-hook-form/useLogin'
import * as API from 'api/Api'
import authStore from 'stores/auth.store'
import { Controller } from 'react-hook-form'

const LoginForm: FC = () => {
  const navigate = useNavigate()
  const { handleSubmit, errors, control } = useLoginForm()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const onSubmit = handleSubmit(async (data: LoginUserFields) => {
    const response = await API.login(data)
    if (response.data?.statusCode) {
      setApiError(response.data.message)
      setShowError(true)
      return
    }
    try {
      const user = await API.fetchUser(response.data)
      authStore.login(user, response.data)
      navigate('/')
    } catch (error) {
      setApiError('Failed to fetch user information')
      setShowError(true)
    }
  })

  return (
    <>
      <div className={styles.loginFormContainer}>
        <div className={styles.loginFormTitle}>
          <h1>Welcome back!</h1>
          Please enter your details
        </div>

        <form className={styles.registerFormBody} onSubmit={onSubmit}>
          <div className={styles.formInputs}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    className={styles.formInput}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <div className={styles.error}>{errors.email.message}</div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="password">
                Password:
              </label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    className={styles.formInput}
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                )}
              />
              {errors.password && (
                <div className={styles.error}>{errors.password.message}</div>
              )}
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
            Login
          </button>
        </form>
        {showError && <div className={styles.error}>{apiError}</div>}
      </div>
    </>
  )
}

export default observer(LoginForm)
