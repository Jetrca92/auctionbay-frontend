import { FC } from 'react'
import styles from 'styles/scss/MyAuctions.module.scss'
import timeIcon from 'styles/images/time.png'
import microphone from 'styles/images/microphone.png'
import trash from 'styles/images/trash.png'
import edit from 'styles/images/edit.png'
import chair from 'styles/images/chair.png'

type Auction = {
  title: string
  image: string
  starting_price: number
  duration?: number
  is_active: boolean
}

const auctions: Auction[] = [
  {
    title: 'Old chair',
    image: chair,
    starting_price: 65,
    duration: 24,
    is_active: true,
  },
  {
    title: 'Awesome microphone pro',
    image: microphone,
    starting_price: 65,
    duration: 24,
    is_active: false,
  },
]

const MyAuctions: FC = () => {
  if (auctions.length === 0)
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

  return (
    <div className={styles.myAuctions}>
      {auctions.map((auction, index) => (
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
              {auction.duration && (
                <div className={styles.timeTag}>
                  <div>{auction.duration}h</div>
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
