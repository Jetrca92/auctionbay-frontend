import { ChangeEvent, FC, useEffect, useState } from 'react'
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
import { errorStore } from 'stores/error.store'

interface NewAuctionProps {
  toggleOverlay: () => void
  defaultValues?: AuctionType
}

const NewAuctionForm: FC<NewAuctionProps> = ({
  toggleOverlay,
  defaultValues,
}) => {
  errorStore.clearError()
  const navigate = useNavigate()
  const { handleSubmit, errors, control } = useNewAuctionForm({ defaultValues })
  const { resetDefaultValues } = useOverlay()

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileError, setFileError] = useState(false)

  const getTomorrowDate = () => {
    const today = new Date()
    today.setDate(today.getDate() + 1)
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()
    return `${yyyy}-${mm}-${dd}`
  }
  const tomorrowDate = getTomorrowDate()

  const isValidFile = (file: File | null) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (!file) return false
    if (!allowedTypes.includes(file.type)) {
      errorStore.setError('Invalid file type. Must be jpeg, png or gif')
      return false
    }
    return true
  }

  const onSubmit = handleSubmit(
    async (data: NewAuctionFields | AuctionType) => {
      const token = userStorage.getToken()
      if (!token) {
        errorStore.setError('No token found')
        return
      }
      if (!defaultValues) await handleAdd(data, token)
      else await handleUpdate(data, defaultValues?.id, token)
    },
  )

  const handleAdd = async (data: NewAuctionFields, token: string) => {
    try {
      if (!file) {
        errorStore.setError('Please upload an image.')
        return
      }
      const response = await API.uploadAuction(data, token)
      console.log('Auction upload response:', response.id)
      if (response.data?.statusCode) {
        errorStore.setError(response.data.message)
        return
      }

      // Upload image
      const formData = new FormData()
      formData.append('image', file as File, file?.name)
      console.log(file)

      const imageResponse = await API.uploadImage(formData, response?.id)
      console.log('Image upload response:', imageResponse)
      if (imageResponse.data?.statusCode) {
        errorStore.setError(imageResponse.data.message)
        return
      }

      navigate(`${routes.AUCTIONS}`)
      resetDefaultValues()
      toggleOverlay()
    } catch (error) {
      errorStore.setError('An error occurred while adding the auction.')
    }
  }

  const handleFileError = () => {
    if (!file) setFileError(true)
    else setFileError(false)
  }

  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const myfile = target.files[0]
      if (!isValidFile(myfile)) return
      setFile(myfile)
    }
  }

  useEffect(() => {
    if (!file) {
      setPreview(null)
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
  }, [file])

  const handleUpdate = async (
    data: NewAuctionFields,
    id: string,
    token: string,
  ) => {
    try {
      const response = await API.updateAuction(data, id, token)
      if (response.data?.statusCode) {
        errorStore.setError(response.data.message)
        return
      }
      navigate(`${routes.AUCTIONS}`)
      resetDefaultValues()
      toggleOverlay()
    } catch (error) {
      errorStore.setError('An error occurred while updating the auction.')
    }
  }

  return (
    <>
      <form className={styles.newAuctionCardInner} onSubmit={onSubmit}>
        <div className={styles.newAuctionCardPicture}>
          {preview ? (
            <img src={preview} alt="Preview" className={styles.imagePreview} />
          ) : (
            <>
              <label htmlFor="image" className={styles.addImageButton}>
                Add image
              </label>
              <input
                onChange={handleFileChange}
                id="image"
                name="image"
                type="file"
              />
            </>
          )}
        </div>
        {fileError && (
          <div className={styles.error}>Please select a valid image file.</div>
        )}

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
          <button
            className={styles.startAuctionButton}
            type="submit"
            onMouseUp={handleFileError}
          >
            {defaultValues ? 'Update auction' : 'Start auction'}
          </button>
        </div>
      </form>
      {errorStore.showError && (
        <div className={styles.error}>{errorStore.apiError}</div>
      )}
    </>
  )
}

export default observer(NewAuctionForm)
