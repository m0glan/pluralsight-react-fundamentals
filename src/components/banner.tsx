import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import logo from '../assets/globo-logo.png'
import styles from './banner.module.css'

interface BannerProps {
  children: ReactNode
}

function Banner({ children }: BannerProps) {
  const navigate = useNavigate()

  return (
    <header className="row">
      <div className="col-5 mb-4">
        <img
          src={logo}
          alt="logo"
          className={styles.logo}
          onClick={() => navigate('/')}
        />
      </div>
      <div className={`col-7 mt-5 ${styles.subtitle}`}>{children}</div>
    </header>
  )
}

export default Banner
