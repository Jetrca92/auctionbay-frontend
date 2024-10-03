import { FC, useState } from 'react'
import { observer } from 'mobx-react'
import styles from 'styles/scss/Overlays.module.scss'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import * as API from 'api/Api'
import { StatusCode } from 'constants/errorConstants'
import { Controller } from 'react-hook-form'
import {
  NewAuctionFields,
  useNewAuctionForm,
} from 'hooks/react-hook-form/useNewAuction'
import { userStorage } from 'utils/localStorage'

interface NewAuctionProps {
  toggleOverlay: () => void
}

const NewAuctionForm: FC<NewAuctionProps> = ({ toggleOverlay }) => {
  const navigate = useNavigate()
  const { handleSubmit, errors, control } = useNewAuctionForm()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const onSubmit = handleSubmit(async (data: NewAuctionFields) => {
    const token = userStorage.getToken()
    if (!token) {
      setApiError('no token')
      setShowError(true)
      return
    }
    const response = await API.uploadAuction(data, token)

    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.UNAUTHORIZED) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      navigate(`${routes.AUCTIONS}`)
    }
  })

  return (
    <>
      <form className={styles.newAuctionCardInner} onSubmit={onSubmit}>
        <div className={styles.formGroupTitle}>
          <label className={styles.label} htmlFor="title">
            Title
          </label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input
                className={styles.formInputTitle}
                type="text"
                id="title"
                placeholder="Write item name here"
                {...field}
              />
            )}
          />
          {errors.title && (
            <div className={styles.error}>{errors.title.message}</div>
          )}
        </div>

        <div className={styles.formGroupDescription}>
          <label className={styles.label} htmlFor="description">
            Description
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                className={styles.formInputDescription}
                id="description"
                placeholder="Write description here..."
                {...field}
              />
            )}
          />
          {errors.description && (
            <div className={styles.error}>{errors.description.message}</div>
          )}
        </div>

        <div className={styles.formGroupSbs}>
          <Controller
            name="starting_price"
            control={control}
            render={({ field }) => (
              <div className={styles.formGroupStartingPrice}>
                <label className={styles.label} htmlFor="starting_price">
                  Starting price
                </label>
                <input
                  className={styles.formInputStartingPrice}
                  type="text"
                  id="starting_price"
                  placeholder="Price"
                  {...field}
                />
              </div>
            )}
          />
          {errors.starting_price && (
            <div className={styles.error}>{errors.starting_price.message}</div>
          )}

          <Controller
            name="end_date"
            control={control}
            render={({ field }) => (
              <div className={styles.formGroupEndDate}>
                <label className={styles.label} htmlFor="end_date">
                  End date
                </label>
                <input
                  className={styles.formInputDate}
                  type="date"
                  id="end_date"
                  {...field}
                />
              </div>
            )}
          />
          {errors.end_date && (
            <div className={styles.error}>{errors.end_date.message}</div>
          )}
        </div>

        <div className={styles.newAuctionCardBottomBar}>
          <button className={styles.cancelButton} onClick={toggleOverlay}>
            Cancel
          </button>
          <button className={styles.startAuctionButton} type="submit">
            Start auction
          </button>
        </div>
      </form>
      {showError && <div className={styles.error}>{apiError}</div>}
    </>
  )
}

export default observer(NewAuctionForm)
