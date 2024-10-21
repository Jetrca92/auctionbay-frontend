import styles from 'styles/scss/Ui.module.scss'
import timeIcon from 'styles/images/time.png'
import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode | ReactNode[]
}

const TimeTag: FC<Props> = ({ children }) => {
  let backgroundColor = ''
  const timeLeft = typeof children === 'string' ? parseInt(children) : NaN
  if (timeLeft <= 24) backgroundColor = '#FFAA98'
  else backgroundColor = ''

  return (
    <div className={styles.tag} style={{ backgroundColor }}>
      <div className={styles.timeTagContent}>
        <div className={styles.tagText}>{children}h</div>
        <div className={styles.timeIconContainer}>
          <img src={timeIcon} alt="time-icon" className={styles.timeIcon} />
        </div>
      </div>
    </div>
  )
}

export default TimeTag
