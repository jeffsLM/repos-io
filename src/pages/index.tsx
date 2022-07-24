import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent } from 'react';

import { Header } from '../components/Header';

import styles from './home.module.scss';

const Home: NextPage = () => {
  const router = useRouter()

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    router.push({
      pathname: '/search',
      query: { q: event.target[0].value },
    })
  }

  return (
    <div className={styles.home}>
      <main className={styles.contentContainer}>
        <form onSubmit={handleSearch}>
          <Header
            variant="full"
            type="submit"
            onChange={(e) => console.log(e.target.value)}
          />
        </form>
      </main>
    </div>
  )
}

export default Home
