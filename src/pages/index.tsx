import type { NextPage } from 'next'

import { Header } from '../components/Header';

import styles from './home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.home}>
      <main className={styles.contentContainer}>
        <Header variant="full" onChange={(e) => console.log(e.target.value)}/>
      </main>
    </div>
  )
}

export default Home