import { FC, useState } from 'react'
import { observer } from 'mobx-react'
import styles from 'styles/scss/Auction.module.scss'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import * as API from 'api/Api'
import { Controller } from 'react-hook-form'
import { userStorage } from 'utils/localStorage'
import { AuctionType } from 'models/auction'
import { isBidderOwner } from 'models/bid'
import {
  NewBidFields,
  useCreateNewBid,
} from 'hooks/react-hook-form/useCreateNewBid'

interface NewBidProps {
  auction: AuctionType
}

const NewBidForm: FC<NewBidProps> = ({ auction }) => {
  const navigate = useNavigate()

  const { handleSubmit, errors, control } = useCreateNewBid({ auction })
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const onSubmit = handleSubmit(async (data: NewBidFields) => {
    const token = userStorage.getToken()
    if (!token) {
      setApiError('no token')
      setShowError(true)
      return
    }
    await handleAdd(data, auction.id, token)
  })

  const handleAdd = async (data: NewBidFields, id: string, token: string) => {
    const response = await API.uploadBid(data, id, token)

    if (response.data?.statusCode) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      const response = await API.fetchAuction(auction.id)
      const newAuction = response?.data
      console.log(response)
      console.log(newAuction)
      navigate(`${routes.AUCTION_PREFIX}/${auction.id}`, {
        state: { newAuction },
      })
    }
  }

  return (
    <>
      <form className={styles.actionBar} onSubmit={onSubmit}>
        <label className={styles.actionBarText} htmlFor="amount">
          Bid:
        </label>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <input
              className={styles.bidNumberInput}
              type="number"
              id="amount"
              {...field}
            />
          )}
        />
        {errors.amount && <div className="error">{errors.amount?.message}</div>}
        {isBidderOwner(auction) ? (
          <div>
            <button className={styles.bidButton} disabled>
              Place bid
            </button>
          </div>
        ) : (
          <button className={styles.bidButton} type="submit">
            Place bid
          </button>
        )}
      </form>
      {showError && <div className="error">{apiError}</div>}
    </>
  )
}

export default observer(NewBidForm)
