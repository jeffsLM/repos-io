
import { FC, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { RepositoryItem } from '../RepositoryItem';

import { github } from '../../services/github';


import styles from './styles.module.scss'
import { Title } from '../Title';
import { NoResults } from '../NoResults';
import { AiOutlineClose } from 'react-icons/ai';

type DataSquema = {
  title:string;
  descriptionRepository:string;
  srcImage:string;
  loginUser:string;
  linkPerfil:string; 
  branches_url:string;         
}


interface ShowRepositoryDetailModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  data: DataSquema;
}

Modal.setAppElement('#root');



export const ShowRepositoryDetailModal: FC<ShowRepositoryDetailModalProps> = ({ isOpen, onRequestClose,data }) => {

  const [modalIsOpen, setIsOpen] = useState(true);
  const [branches, setBranches] = useState([{  commit: { url: '', sha: '', protected: false },
    name: '',}]);
  const [selectedBranchURL, setSelectedBranchURL] = useState('');
  const [isLoadingBranch, setIsLoadingBranch] = useState(true)
  const [isLoadingCommit, setIsLoadingCommit] = useState(true)
  // const [errorBranch, setError] = useState(false)
  const [error, setError] = useState(false)

  const [commit, setCommits] = useState({
    commit: {
      author: { avatar_url: '' },
      message: '',
    },
    author: {
      avatar_url: '',
      login: '',
      html_url: ''
    }
  });


  useEffect(() => {
    setIsLoadingBranch(true)
    setError(false)
    setBranches([])
    getRepositoriesInfo(data.branches_url.replace("{/branch}", ""))
      .then((e) => {
        setBranches(e.data)
        setIsLoadingBranch(false)
        setError(false)
        console.log(e.data)
        handleGetCommits(e.data[0].commit.url)
      })
      .catch(e => {
        setIsLoadingBranch(false)
        setError(true)
      })
  }, [data])


  function handleGetCommits(url: string) {
    setIsLoadingCommit(true)
    setError(false)
    getRepositoriesInfo(url)
      .then((e) => {
        setIsLoadingCommit(false)
        setError(false)
        setCommits(e.data)
      })
      .catch(e => {
        setIsLoadingCommit(false)
        setError(true)
      })
  }


  async function getRepositoriesInfo(url: string) {
    return await github.get(url)
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className={styles.modal}
        contentLabel="Selected Repository Details"
      >
        <div className={styles.closeContent} onClick={onRequestClose}>
          <AiOutlineClose />
        </div>
        <header>
          {!isLoadingBranch && branches && <RepositoryItem
            title={data.title}
            descriptionRepository={data.descriptionRepository}
            srcImage={data.srcImage}
            loginUser={data.loginUser}
            linkPerfil={data.linkPerfil}
            branches_url={data.branches_url}
            variantButton="solid"
            variant="dropdown"
            textButton='ABRIR NO GITHUB'
            metaData={branches}
            onClick={() => { window.open(data.linkPerfil, "_blank") }}
            onChange={(e) => handleGetCommits(e.target.value)}
          />}
        </header>
        <div className={styles.container}>
          <div className={styles.inner}>
            <div className={styles.full_height}>
            </div>
            <Title>Último Commit</Title>

            {!isLoadingCommit && !error && commit ?

              <RepositoryItem
                title={commit.commit.message}
                descriptionRepository={commit.commit.message}
                srcImage={commit.author.avatar_url}
                loginUser={commit.author.login}
                linkPerfil={commit.author.html_url}
                branches_url=""
                variant="simple"
                textButton="MAIS DETALHES"
                onClick={() => { console.log('asdasdasdas') }}
              /> : <NoResults />
            }

          </div>
        </div>
      </Modal>
    </div>
  );
}
