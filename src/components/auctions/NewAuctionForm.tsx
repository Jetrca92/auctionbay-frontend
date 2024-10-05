import { FC, useState } from 'react'
import { observer } from 'mobx-react'
import styles from 'styles/scss/Overlays.module.scss'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import * as API from 'api/Api'
import { Controller } from 'react-hook-form'
import {
  NewAuctionFields,
  useNewAuctionForm,
} from 'hooks/react-hook-form/useNewAuction'
import { userStorage } from 'utils/localStorage'
import { useOverlay } from 'components/overlays/OverlayContext'
import { AuctionType } from 'models/auction'

interface NewAuctionProps {
  toggleOverlay: () => void
  defaultValues?: AuctionType
}

const NewAuctionForm: FC<NewAuctionProps> = ({
  toggleOverlay,
  defaultValues,
}) => {
  console.log(defaultValues)
  const navigate = useNavigate()

  const { handleSubmit, errors, control } = useNewAuctionForm({ defaultValues })
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const { resetDefaultValues } = useOverlay()

  const getTomorrowDate = () => {
    const today = new Date()
    today.setDate(today.getDate() + 1)
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()
    return `${yyyy}-${mm}-${dd}`
  }

  const tomorrowDate = getTomorrowDate()

  const onSubmit = handleSubmit(
    async (data: NewAuctionFields | AuctionType) => {
      const token = userStorage.getToken()
      if (!token) {
        setApiError('no token')
        setShowError(true)
        return
      }
      if (!defaultValues) await handleAdd(data, token)
      else await handleUpdate(data, defaultValues?.id, token)
    },
  )

  const handleAdd = async (data: NewAuctionFields, token: string) => {
    const response = await API.uploadAuction(data, token)
    if (response.data?.statusCode) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      navigate(`${routes.AUCTIONS}`)
      resetDefaultValues()
      toggleOverlay()
    }
  }

  const handleUpdate = async (
    data: NewAuctionFields,
    id: string,
    token: string,
  ) => {
    const response = await API.updateAuction(
      {
        title: data.title,
        description: data.description,
        end_date: data.end_date,
        image: data.image,
        starting_price: data.starting_price,
      },
      id,
      token,
    )
    if (response.data?.statusCode) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      console.log(data)
      navigate(`${routes.AUCTIONS}`)
      resetDefaultValues()
      toggleOverlay()
    }
  }

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
                  min={tomorrowDate}
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
          <button
            className={styles.cancelButton}
            onClick={() => toggleOverlay()}
          >
            Cancel
          </button>
          <button className={styles.startAuctionButton} type="submit">
            {defaultValues ? 'Update auction' : 'Start auction'}
          </button>
        </div>
      </form>
      {showError && <div className={styles.error}>{apiError}</div>}
    </>
  )
}

export default observer(NewAuctionForm)
