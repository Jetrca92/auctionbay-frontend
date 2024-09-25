import { FC } from 'react'
import styles from 'styles/scss/Auction.module.scss'
import chair from 'styles/images/chairBig.png'
import Tag from 'components/ui/Tag'
import TimeTag from 'components/ui/TimeTag'
import { AuctionType } from 'models/auction'
import avatar from 'styles/images/Avatar.png'

interface AuctionCardProps {
  auction: AuctionType // Auction prop type
}

const bids = NaN
const AuctionContent: FC<AuctionCardProps> = ({ auction }) => {
  return (
    <div className={styles.auctionContent}>
      <div className={styles.innerContainer}>
        <img src={chair} className={styles.image} alt="chair" />
        <div className={styles.rightSide}>
          <div className={styles.detailsCard}>
            <div className={styles.innerDetailsCard}>
              <div className={styles.metaBar}>
                <Tag>Outbid</Tag>
                <TimeTag>{auction.auction_duration_hrs}</TimeTag>
              </div>
              <h1 className={styles.title}>{auction.title}</h1>
              <div className={styles.description}>{auction.description}</div>
              <div className={styles.bidBar}>
                <div className={styles.bidBarTab}>
                  <button className={styles.bidTabButton}>Bid</button>
                  <button className={styles.autoBidTabButton}>Auto bid</button>
                </div>
              </div>
              <div className={styles.actionBar}>
                <div className={styles.actionBarText}>Bid:</div>
                <input className={styles.bidNumberInput}></input>
                <button className={styles.bidButton}>Place bid</button>
              </div>
            </div>
          </div>
          <div className={styles.biddingHistory}>
            {bids ? (
              <>
                <div>
                  <h4 className={styles.biddingHistoryTitle}>
                    Bidding history (2)
                  </h4>
                </div>
                <div className={styles.biddingHistoryTable}>
                  <div className={styles.tableItem}>
                    <div className={styles.tableItemName}>
                      <img
                        src={avatar}
                        alt="avatar"
                        className={styles.avatar}
                      />
                      Bigi Smols
                    </div>
                    <div className={styles.tableItemDate}>14:31 22.6.2023</div>
                    <button className={styles.tableItemPrice}>32 €</button>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.emptyContainer}>
                <div className={styles.emptyState}>
                  <div className={styles.captionTitle}>
                    <h5 className={styles.captionTitleText}>No bids yet!</h5>
                  </div>
                  <div className={styles.caption}>
                    Place your bid to have a chance to get this item.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuctionContent
