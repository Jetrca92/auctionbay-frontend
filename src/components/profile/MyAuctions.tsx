import { FC } from 'react'
import styles from 'styles/scss/MyAuctions.module.scss'
import timeIcon from 'styles/images/time.png'
import microphone from 'styles/images/microphone.png'
import trash from 'styles/images/trash.png'
import edit from 'styles/images/edit.png'

const MyAuctions: FC = () => {
  return (
    <div className={styles.myAuctions}>
      <div className={styles.cardInProgress}>
        <div className={styles.content}>
          <div className={styles.tagHeader}>
            <div className={styles.tagInProgress}>
              <div className={styles.tagText}>In progress</div>
            </div>
            <div className={styles.timeTag}>
              <div>30h</div>
              <div className={styles.timeIcon}>
                <img src={timeIcon} alt="time-icon" />
              </div>
            </div>
          </div>
          <div className={styles.titleContainer}>
            <div className={styles.titleText}>Rode vintage microphone</div>
          </div>
          <div className={styles.price}>123 €</div>
        </div>

        <div className={styles.imageContainer}>
          <img src={microphone} alt="microphone" />
          <div className={styles.editFrame}>
            <button className={styles.deleteBtn}>
              <img src={trash} alt="trash-con" />
            </button>
            <button className={styles.editBtn}>
              <img src={edit} alt="edit" />
              <div className={styles.btnLabel}>Edit</div>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.cardInProgress}>
        <div className={styles.content}>
          <div className={styles.tagHeader}>
            <div className={styles.tagInProgress}>
              <div className={styles.tagText}>In progress</div>
            </div>
            <div className={styles.timeTag}>
              <div>30h</div>
              <div className={styles.timeIcon}>
                <img src={timeIcon} alt="time-icon" />
              </div>
            </div>
          </div>
          <div className={styles.titleContainer}>
            <div className={styles.titleText}>Rode vintage microphone</div>
          </div>
          <div className={styles.price}>123 €</div>
        </div>

        <div className={styles.imageContainer}>
          <img src={microphone} alt="microphone" />
          <div className={styles.editFrame}>
            <button className={styles.deleteBtn}>
              <img src={trash} alt="trash-con" />
            </button>
            <button className={styles.editBtn}>
              <img src={edit} alt="edit" />
              <div className={styles.btnLabel}>Edit</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAuctions
