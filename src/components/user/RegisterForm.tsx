import { FC, useState } from 'react'
import { observer } from 'mobx-react'
import styles from 'styles/scss/Authentication.module.scss'
import { useNavigate } from 'react-router-dom'
import {
  RegisterUserFields,
  useRegisterForm,
} from 'hooks/react-hook-form/useRegister'
import * as API from 'api/Api'
import { StatusCode } from 'constants/errorConstants'
import authStore from 'stores/auth.store'
import { Controller } from 'react-hook-form'
const RegisterForm: FC = () => {
  const navigate = useNavigate()
  const { handleSubmit, errors, control } = useRegisterForm()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const onSubmit = handleSubmit(async (data: RegisterUserFields) => {
    const response = await API.signup(data)
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      // Login user
      const loginResponse = await API.login({
        email: data.email,
        password: data.password,
      })
      if (loginResponse.data?.statusCode === StatusCode.BAD_REQUEST) {
        setApiError(response.data.message)
        setShowError(true)
      } else if (
        loginResponse.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
      ) {
        setApiError(loginResponse.data.message)
        setShowError(true)
      } else {
        authStore.login(loginResponse.data)
        navigate('/')
      }
    }
  })

  return (
    <>
      <div className={styles.registerFormContainer}>
        <div className={styles.registerFormTitle}>
          <h1>Hello!</h1>
          Please enter your details
        </div>

        <form className={styles.registerFormBody} onSubmit={onSubmit}>
          <div className={styles.formInputs}>
            <div className={styles.formGroupTwo}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="name">
                  Name
                </label>
                <Controller
                  control={control}
                  name="first_name"
                  render={({ field }) => (
                    <input
                      className={styles.formInput}
                      type="text"
                      id="first_name"
                      placeholder="Enter your name"
                      {...field}
                    />
                  )}
                />
                {errors.first_name && <div>{errors.first_name.message}</div>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="surname">Surname</label>
                <Controller
                  control={control}
                  name="last_name"
                  render={({ field }) => (
                    <input
                      className={styles.formInput}
                      type="text"
                      id="last_name"
                      placeholder="Enter your surname"
                      {...field}
                    />
                  )}
                />
                {errors.last_name && <div>{errors.last_name.message}</div>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <Controller
                control={control}
                name="email"
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
              {errors.email && <div>{errors.email.message}</div>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="password">
                Password:
              </label>
              <Controller
                control={control}
                name="password"
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
              {errors.password && <div>{errors.password.message}</div>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="confirm_password">
                Repeat Password:
              </label>
              <Controller
                control={control}
                name="confirm_password"
                render={({ field }) => (
                  <input
                    className={styles.formInput}
                    type="password"
                    id="confirm_password"
                    placeholder="Repeat your password"
                    {...field}
                  />
                )}
              />
              {errors.confirm_password && (
                <div>{errors.confirm_password.message}</div>
              )}
            </div>
          </div>
          <button className={styles.registerButton} type="submit">
            Sign up
          </button>
        </form>
        {showError && <div>{apiError}</div>}
      </div>
    </>
  )
}

export default observer(RegisterForm)
