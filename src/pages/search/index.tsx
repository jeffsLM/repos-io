import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { github } from '../../services/github';
import { Header } from '../../components/Header';
import { Title } from '../../components/Title';
import { RepositoryItem } from '../../components/RepositoryItem';
import { RepositoryContainer } from '../../components/RepositoryContainer';
import { ShowRepositoryDetailModal } from '../../components/ShowRepositoryDetailModal';
import { Loading } from '../../components/Loading';
import { NoResults } from '../../components/NoResults';

import styles from './styles.module.scss';

const Search: NextPage = () => {
    const { ref, inView } = useInView({ threshold: 0 });
    const router = useRouter();
    const { q } = router.query;

    const [searchTerm, setSearchTerm] = useState(q ? q : '')
    const [repositories, setRepositories] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [repoSelected, setRepoSelected] = useState({
        title: '',
        descriptionRepository: '',
        srcImage: '',
        loginUser: '',
        linkPerfil: '',
        branches_url: ''
    })
    const [isModalOpen, setIsModalOpen] = useState(false);



    function handleOpenModal() {
        setIsModalOpen(true)
    }
    function handleCloseModal() {
        setIsModalOpen(false)
        setRepoSelected({
            title: '',
            descriptionRepository: '',
            srcImage: '',
            loginUser: '',
            linkPerfil: '',
            branches_url: ''
        })
    }

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
                                return <RepositoryItem
                                    title={item.name}
                                    descriptionRepository={item.description}
                                    srcImage={item.owner.avatar_url}
                                    loginUser={item.owner.login}
                                    linkPerfil={item.owner.html_url}
                                    branches_url={item.branches_url}
                                    key={key}
                                    textButton="MAIS DETALHES"
                                    onClick={() => {
                                        setRepoSelected({
                                            title: item.name,
                                            descriptionRepository: item.description,
                                            srcImage: item.owner.avatar_url,
                                            loginUser: item.owner.login,
                                            linkPerfil: item.owner.html_url,
                                            branches_url: item.branches_url,
                                        }), handleOpenModal()
                                    }}
                                />
                            })
                        }
                        {!isLoading && (error || repositories.length == 0) ? <NoResults /> : null}
                    </RepositoryContainer>
                </section>
            </div>
            <ShowRepositoryDetailModal isOpen={isModalOpen} onRequestClose={handleCloseModal} data={repoSelected} />
        </main>
    )
}

export default Search


