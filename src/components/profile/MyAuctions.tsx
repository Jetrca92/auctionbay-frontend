import { FC, useState } from 'react'
import styles from 'styles/scss/MyAuctions.module.scss'
import timeIcon from 'styles/images/time.png'
import trash from 'styles/images/trash.png'
import edit from 'styles/images/edit.png'
import { AuctionType, calculateHoursLeft } from 'models/auction'
import { userStorage } from 'utils/localStorage'
import { useMutation, useQuery } from 'react-query'
import * as API from 'api/Api'
import { StatusCode } from 'constants/errorConstants'
import { useOverlay } from 'components/overlays/OverlayContext'
import { routes } from 'constants/routesConstants'
import { Link } from 'react-router-dom'
import noImage from 'styles/images/empty-image.png'

const MyAuctions: FC = () => {
  const token = userStorage.getToken()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const { toggleOverlay } = useOverlay()

  const { data, isLoading, refetch } = useQuery(
    ['fetchUserAuctions'],
    () => {
      if (token) {
        return API.fetchUserAuctions(token)
      }
      return Promise.resolve([])
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onError: (error: any) => {
        if (error.response?.status === StatusCode.UNAUTHORIZED) {
          setApiError('You are not authenticated. Please log in.')
          setShowError(true)
        } else {
          setApiError('An error occurred while fetching auctions.')
          setShowError(true)
        }
      },
    },
  )

  const { mutate } = useMutation(
    ({ id, token }: { id: string; token: string }) =>
      API.deleteAuction(id, token),
    {
      onSuccess: (response) => {
        if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
          setApiError(response.data.message)
          setShowError(true)
        } else if (
          response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
        ) {
          setApiError(response.data.message)
          setShowError(true)
        } else {
          refetch()
        }
      },
      onError: () => {
        setApiError('Something went wrong while deleting a product.')
        setShowError(true)
      },
    },
  )

  const handleDelete = (id: string) => {
    if (!token) {
      setApiError('You are not authenticated.')
      setShowError(true)
      return
    }
    mutate({ id, token })
  }

  const handleEditClick = (auction: AuctionType) => {
    toggleOverlay(auction)
  }

  if (data?.data.length === 0)
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyState}>
          <div className={styles.captionTitle}>
            <h3>Oh no, no auctions added!</h3>
          </div>
          <div className={styles.caption}>
            To add new auction click “+” button in navigation bar and new
            auctions wil be added here!
          </div>
        </div>
      </div>
    )

  if (showError) {
    return (
      <div className={styles.emptyBody}>
        <div className={styles.emptyStateContainer}>
          <div className={styles.error}>{apiError}</div>
        </div>
      </div>
    )
  }

  if (!data || !Array.isArray(data.data)) {
    return (
      <div className={styles.emptyBody}>
        <div className={styles.emptyStateContainer}>
          <div className={styles.caption}>
            No auctions found or an error occurred.
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={styles.emptyBody}>
        <div className={styles.emptyStateContainer}>
          <div className={styles.caption}>Loading auctions ...</div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.myAuctions}>
      {data?.data.map((auction: AuctionType, index: number) => (
        <Link
          className="auctionCardLink"
          key={index}
          to={`${routes.AUCTION_PREFIX}/${auction.id}`}
          state={{ auction }}
        >
          <div className={styles.card}>
            <div className={styles.content}>
              <div className={styles.tagHeader}>
                {auction.is_active ? (
                  <div className={styles.tagInProgress}>
                    <div className={styles.tagText}>In progress</div>
                  </div>
                ) : (
                  <div className={styles.tagDone}>
                    <div className={styles.tagText}>Done</div>
                  </div>
                )}
                {calculateHoursLeft(auction) > 0 && (
                  <div className={styles.timeTag}>
                    <div>{calculateHoursLeft(auction)}h</div>
                    <div className={styles.timeIcon}>
                      <img src={timeIcon} alt="time-icon" />
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.titleContainer}>
                <div className={styles.titleText}>{auction.title}</div>
              </div>
              <div className={styles.price}>{auction.starting_price} €</div>
            </div>

            <div
              className={`${auction.is_active ? styles.imageContainer : styles.imageContainerFull}`}
            >
              {auction.image ? (
                <img
                  src={`http://localhost:8080${auction.image}`}
                  alt={auction.title}
                  className={`${auction.is_active ? styles.image : styles.imageFull}`}
                />
              ) : (
                <img
                  src={noImage}
                  className={`${auction.is_active ? styles.image : styles.imageFull}`}
                  alt="noImage"
                />
              )}

              {auction.is_active && (
                <div className={styles.editFrame}>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(auction.id)}
                  >
                    <img src={trash} alt="trash-con" />
                  </button>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEditClick(auction)}
                  >
                    <img src={edit} alt="edit" />
                    <div className={styles.btnLabel}>Edit</div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default MyAuctions
