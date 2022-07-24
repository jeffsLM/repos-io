import type { NextPage, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { github } from '../../services/github'
import { Header } from '../../components/Header';

import styles from './styles.module.scss';
import { Title } from '../../components/Title';
import { RepositoryItem } from '../../components/RepositoryItem';
import { RepositoryContainer } from '../../components/RepositoryContainer';
import { ShowRepositoryDetailModal } from '../../components/ShowRepositoryDetailModal';
import { Loading } from '../../components/Loading';
import { NoResults } from '../../components/NoResults';

const Search: NextPage = () => {
    const { ref, inView } = useInView({ threshold: 0 });
    const router = useRouter();
    const { q } = router.query;

    const [searchTerm, setSearchTerm] = useState(q ? q : '')
    const [repositories, setRepositories] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)


    useEffect(() => {
        handleAllRepositoriesInfoBySearchTerm(router.query.q as string);
    }, [])

    useEffect(() => {
        if (searchTerm != router.query.q && router.query.q) {
            handleAllRepositoriesInfoBySearchTerm(router.query.q as string);
        }
    }, [router])

    async function handleAllRepositoriesInfoBySearchTerm(searchTerm: string) {
        if (searchTerm) {
            setIsLoading(true);
            setError(false);
            setRepositories([])

            router.push({
                pathname: '/search',
                query: { q: searchTerm }
            },
                undefined, { shallow: true }
            )

            getRepositoriesInfo(searchTerm)
                .then(({ data }) => {
                    setIsLoading(false), setError(false)
                    setRepositories(data)
                })
                .catch(e => {
                    setIsLoading(false),
                    setError(true)
                })

            setSearchTerm(searchTerm)
        }
    }

    async function getRepositoriesInfo(q: string) {
        return await github.get(`users/${q}/repos`)
    }


    return (
        <main>
            <header className={styles.hero} ref={ref} >
                <div className={styles.contentContainer} data-variant={inView ? 'partial' : 'inline'}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleAllRepositoriesInfoBySearchTerm(e.target[0].value)
                        }
                        }>
                        <Header
                            variant={inView ? 'partial' : 'inline'}
                            type="submit"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>
                </div>
            </header>
            <div className={styles.ContentMain}>
                <section className={styles.mainSection} data-variant={inView ? 'partial' : 'inline'}>
                    <Title>Resultados da sua busca</Title>
                    <RepositoryContainer>
                        {isLoading ? <Loading /> :
                            repositories.map((item, key) => {
                                console.log(isLoading)
                                return <RepositoryItem
                                    repositoryName={item.name}
                                    descriptionRepository={item.description}
                                    srcImage={item.owner.avatar_url}
                                    loginUser={item.owner.login}
                                    linkPerfil={item.owner.html_url}
                                    key={key}
                                    onClick={() => { console.log('asdasdasdas') }}
                                />
                            })
                        }
                        {!isLoading && error ? <NoResults /> : null}
                    </RepositoryContainer>
                </section>
            </div>
            <ShowRepositoryDetailModal isOpen={true} onRequestClose={() => { }} />
        </main>
    )
}

export default Search


