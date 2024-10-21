import { FC } from 'react'
import { observer } from 'mobx-react'
import styles from 'styles/scss/Overlays.module.scss'
import { useNavigate } from 'react-router-dom'
import * as API from 'api/Api'
import { Controller } from 'react-hook-form'
import { errorStore } from 'stores/error.store'
import {
  ChangePasswordFormFields,
  useChangePasswordForm,
} from 'hooks/react-hook-form/useChangePasswordForm'
import { userStorage } from 'utils/localStorage'

const ChangePasswordForm: FC = () => {
  errorStore.clearError()
  const token = userStorage.getToken()
  const navigate = useNavigate()
  const { handleSubmit, errors, control } = useChangePasswordForm()

  const onSubmit = handleSubmit(async (data: ChangePasswordFormFields) => {
    if (!token) return
    console.log('Form submitted', data)
    const upData = {
      password: data.password,
      confirm_password: data.confirm_password,
    }
    const response = await API.updatePassword(upData, token)
    if (response.data?.statusCode) {
      errorStore.setError(response.data.message)
    }
    navigate('/')
    return
  })

  return (
    <>
      <form className={styles.changePasswordForm} onSubmit={onSubmit}>
        <div className={styles.changePasswordFormInputs}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="current_password">
              Current password
            </label>
            <Controller
              name="current_password"
              control={control}
              render={({ field }) => (
                <input
                  className={styles.formInput}
                  type="password"
                  id="current_password"
                  {...field}
                />
              )}
            />
            {errors.current_password && (
              <div className={styles.error}>
                {errors.current_password.message}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">
              New password
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  className={styles.formInput}
                  type="password"
                  id="password"
                  {...field}
                />
              )}
            />
            {errors.password && (
              <div className={styles.error}>{errors.password.message}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="confirm_password">
              Repeat new password
            </label>
            <Controller
              name="confirm_password"
              control={control}
              render={({ field }) => (
                <input
                  className={styles.formInput}
                  type="password"
                  id="confirm_password"
                  {...field}
                />
              )}
            />
            {errors.confirm_password && (
              <div className={styles.error}>
                {errors.confirm_password.message}
              </div>
            )}
          </div>
        </div>

        <div className={styles.changePasswordFormBottomBar}>
          <button className={styles.cancelButton} onClick={() => navigate('/')}>
            Cancel
          </button>
          <button className={styles.startAuctionButton} type="submit">
            Save changes
          </button>
        </div>
      </form>
      {errorStore.showError && (
        <div className={styles.error}>{errorStore.apiError}</div>
      )}
    </>
  )
}

export default observer(ChangePasswordForm)
