import { FC } from 'react'
import styles from 'styles/scss/MyAuctions.module.scss'
import timeIcon from 'styles/images/time.png'
import trash from 'styles/images/trash.png'
import edit from 'styles/images/edit.png'
import { AuctionType, calculateHoursLeft } from 'models/auction'
import { userStorage } from 'utils/localStorage'
import { useQuery } from 'react-query'
import * as API from 'api/Api'

const MyAuctions: FC = () => {
  const token = userStorage.getToken()

  const { data, isLoading } = useQuery(
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
    },
  )
  console.log(data)

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
        <div className={styles.cardMyAuctions} key={index}>
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
              {calculateHoursLeft(auction) && (
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
            <img
              src={auction.image}
              alt={auction.title}
              className={`${auction.is_active ? styles.image : styles.imageFull}`}
            />
            {auction.is_active && (
              <div className={styles.editFrame}>
                <button className={styles.deleteBtn}>
                  <img src={trash} alt="trash-con" />
                </button>
                <button className={styles.editBtn}>
                  <img src={edit} alt="edit" />
                  <div className={styles.btnLabel}>Edit</div>
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyAuctions
