import { FC } from 'react'
import styles from 'styles/scss/Overlays.module.scss'

interface NewAuctionProps {
  toggleOverlay: () => void
}

const NewAuction: FC<NewAuctionProps> = ({ toggleOverlay }) => {
  return (
    <div className={styles.newAuctionCard}>
      <div className={styles.newAuctionCardHeader}>
        <h4>Add auction</h4>
      </div>
      <div className={styles.newAuctionCardPicture}>
        <button className={styles.addImageButton}>Add image</button>
      </div>
      <div className={styles.newAuctionCardInner}></div>
      <div className={styles.newAuctionCardBottomBar}></div>
    </div>
  )
}

export default NewAuction
