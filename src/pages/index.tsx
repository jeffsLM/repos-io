/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'

import { Input } from '../components/Input';
import { Logo } from '../components/Logo';

import styles from './home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.home}>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <Logo variant="full" />
          <Input
            name="search"
            onChange={(e) => console.log(e.target.value)}
            placeholder="Pesquise por usuários do github"
          />
          <div
            className={styles.contentAvatar}>
            <img
              src="/images/avatarSearch.svg"
              className={styles.avatarSearch}
              alt="Girl Searching" />
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home